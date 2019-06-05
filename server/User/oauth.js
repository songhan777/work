const request = require('request-promise')
const express = require('express')
const { mongoose } = require('../Database/config')
const { sessionModel, userPropertyModel, userActionModel} = require('../Database/index')
const fs = require('fs')
const util = require('util')
const writFile = util.promisify(fs.writeFile);
const api = express.Router();
const {createStreamId, copyTableToSession, loginNoTimeOut} = require('../utils')

api.get('/cb', function(req, res) {
    const code = req.query.code;
    const opt = {
        uri: 'https://passport.escience.cn/oauth2/token',
        method: 'POST',
        form: {
            client_id: '96478',
            client_secret: 'iF2T3WZzu3o5QrAlCjVMkGIdyvCvuhzr',
            grant_type: 'authorization_code',
            redirect_uri:'http://flow.dv.ailab.win/user/oauth/cb',
            code:code,
        },
         headers: {
            'content-type': 'application/x-www-form-urlencoded' 
        },
        json: true  
    }

    let token = null
    let name = null
    let cstnetId = null
    const userId = mongoose.Types.ObjectId()
    request(opt).then((repos)=>{
        const info = JSON.parse(repos.userInfo)
        token = info.umtId
        name = info.truename
        cstnetId = info.cstnetId
        
        return sessionModel.find({token})
    }).then((data) => {
        if (data.length < 1) {
            const proEntity = new userPropertyModel({
                _id: userId,
                group_id: mongoose.Types.ObjectId(),
                name: name,
                username: createStreamId(),//随便生成个 随机数
                email: cstnetId,
                type: null,
                scope: 777,
            })
            const actEntity = new userActionModel({
                _id: userId,
                online: false,
                last_loging: new Date(),
                registered: new Date(),
                duration: 0,
                duration_total:0,
            })
            const sessionEntity = new sessionModel({
                token: token,
                user_id: userId,
                last_action: new Date(),
                login: new Date()
            })
            let pro = proEntity.save()
            let act = actEntity.save()
            let ses = sessionEntity.save()
            return Promise.all([pro, act, ses])
        }
        return []
    }).then((data) =>{
        if (data.length === 0) {//
            return sessionModel.findOneAndUpdate({token},{$set:{last_action: new Date()}}, {new: true})
        }
        console.log(data[2])
        copyTableToSession(req, data[2])
        res.send({code: 0, msg: '登录成功'})
        return Promise.reject({send:0})
    }).then((data) =>{
        if(data.token) {
            copyTableToSession(req, data)
            res.send({code: 0, msg: '登录成功'})
        } else {
            res.send({code: 1, msg: '登录失败，更新sessiong 失败'})
        }
    }).catch((err) => {
        if(err.send == 0) {
            return 
        } else {
            res.send({code:1, msg: err})
        }
        
    })

})
api.get('/', function (req, res) {
    //这块不能通过session  来判断，应该通过查询数据库判断是否时间还在，
    //暂时通过 时间来判断，当永辉退出登录 ，将时间重置到 1970年
    if (req.session.token) {
        const interval = new Date() - new Date(req.session.last_action)
        const noTimeout = loginNoTimeOut(interval) //返回true 就是还在登录状态
        if (noTimeout) {
            res.send({code: 0, msg: '已经登录'})
        } else {
            res.send({code: 1, msg: '登录失败'})
        }
    }else {
        res.send({code: 1, msg: '登录失败'})
    }
})

module.exports = api