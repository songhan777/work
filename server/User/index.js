const express = require('express');
const api = express.Router();
const { userPropertyModel, userActionModel, sessionModel } = require('../Database')
const {mongoose} = require('../Database/config')
const { createTokenId, copyTableToSession } = require('../utils')
const oAuth = require('./oauth')
api.use('/oauth', oAuth);

api.post('/', function (req, res) {  // 没做最初判断是否重复，如果有人恶意发接口信息，会导致数据库存入无用的信息，而且还会污染用户数据
    if (req.body !== "111111" ) {
        res.send({code: 0, msg: '注册成功'})
    } else {
        res.send({code:1, msg: "err"})
    }
});
api.post('/logout', function (req, res) {
    console.log(req.body);
    if (typeof req.body.dataSetId === "string") {
        res.send({code: 0});
    } else {
        res.send({code: 1,err:"登录失败"});
    }
})
//校验 注册用户名是否重复
api.post('/verify', function(req, res) {
    if (req.body.username === "1") {
        res.send({code: 0, msg: '用户可用' })
    } else {
        res.send({code: 1, err:"失败"})
    }
  /*
    const username = req.body.username
    userPropertyModel.find({username}).then((data) =>{


        if (data.length <1) {
            res.send({code: 0, msg: '没有对应的username'})
            return
        }
        res.send({code: 1, msg: '查询到重复的username'})
    }).catch((err) =>{
        res.send({code: 1, msg: err})
    })*/
})
api.get('/new', function (req, res) {
    console.log(121212121)
    res.send('ok')
})

api.get('/:id/status', function (req, res) {

})
api.get('/:id/session', function (req, res) {

})
api.get('/:id/data', function (req, res) {

})
api.get('/:id/workflow', function (req, res) {

})
api.get('/:id/library', function (req, res) {

})
api.get('/:id/task', function (req, res) {

})
api.get('/:id', function (req, res, next) {
    console.log(':id来了来了  ')
    console.log(req.params.id)
    
})
api.put('/:id', function (req, res, next) {

    
})
api.delete('/:id', function (req, res) {

})


module.exports = api