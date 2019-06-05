const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const readFile = promisify(fs.readFile); //异步promise化
const writeFile = promisify(fs.writeFile); //异步promise化
const userComponent = require('./User/index.js')//引用用户组件
const sessionComponent = require('./Session/index')//应用会话组件
const app = express();

//设置允许跨域
let port = null;
let allow_cross_domain = null;
if (process.env.NODE_ENV == 'production') {
    port = 3333;
    allow_cross_domain = 'http://localhost:80'
} else {
    port = 3000;
    allow_cross_domain = 'http://localhost:8080';
}
app.listen(port, function () {
    console.log(`${port}端口启动成功`)
});
//设置跨域请求头1u
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", allow_cross_domain)
    res.header("Access-Control-Allow-Credentials", true); //设置跨域携带cookie
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    next();
});
app.use(session({//设置session
    secret: "workflow",
    resave: true,
    name: 'workflow',
    saveUninitialized: true,
}));

app.use(express.static(path.resolve(__dirname, '../dist')));

// bodyParser 的设置，结构post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//const ingnoreBaseUrl = [/\/user/, /\/user\/verify/, /\/group\/etcompany/, /\/getValidation/, /\/checkoutValidation/, /\/registeredUser/, /\/session[\/]*\w*/, /\/user\/oauth[\/]*\w*/]
const ingnoreBaseUrl = [/\/retrievePassword/,/\/love/,/\/checkoutValidation/, /\/user/, /\/user\/verify/, /\/group\/etcompany/, /\/getValidation/, /\/checkoutValidation/, /\/registeredUser/, /\/session[\/]*\w*/, /\/user\/oauth[\/]*\w*/, /\/user[\/]*\w*/];


app.use('*', function (req, res, next) {
    let bol = null;
    for (let i = 0; i < ingnoreBaseUrl.length; i++) {
        if (ingnoreBaseUrl[i].test(req.baseUrl)) {// 这里是请求路径，将将路径放上去
            bol = true;
            break;
        }
    }
    if (bol) {
        next();
    } else {
        const interval = new Date() - new Date(req.session.lastAction)
        if (req.session.lastAction) {
            if (interval < 1000 * 20) {//3分钟
                req.session.lastAction = new Date()
                next()
            } else {
                //在这判断下是否是数据库中存储的接口，如果是，就返回res.send({code:1,msg:'登录超时'})
                let optins = getIndexOptins();
                res.sendFile('index.html', optins, function (err) {
                    if (err) res.status(500)
                })
            }

        } else {
            //在这判断下是否是数据库中存储的接口，如果是，就返回res.send({code:1,msg:' 没有登录过'})
            let optins = getIndexOptins();
            res.sendFile('index.html', optins, function (err) {
                if (err) res.status(500)
            })
        }
    }

})

app.use('/user', userComponent)
app.use('/session', sessionComponent)

app.get('/list', function (req, res) {
    console.log('请求列表');
    req.session.znId = 111
    readFile(path.resolve(__dirname, './project.json'), 'utf-8').then((data) => {
        // console.log(data);
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
});

app.post('/work', function (req, res) {
    console.log('获取工作');

    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then((data) => {
        // console.log(data);
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
});
app.post('/recentlyWork', function (req, res) {
    console.log('过滤数据');
    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then((data) => {
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
});
app.get('/group', function (req, res) {
    console.log('获取队伍数据');
    console.log(req.session)
    readFile(path.resolve(__dirname, './team.json'), 'utf-8').then((data) => {
        //console.log(data);
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }


    })
});
app.post('/work/pushPersonal', function (req, res) {
    console.log('推送结果');
    console.log(res);
    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then((data) => {
        res.send({code: 1});
    }, () => {
        res.send({code: 0, err: ""});
    })
});
app.post('/work/searchTeam', function (req, res) {
    console.log('搜索队伍的数据');
    readFile(path.resolve(__dirname, './teamSearch.json'), 'utf-8').then((data) => {
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
});
app.post('/work/searchMember', function (req, res) {
    console.log('搜索合作者的数据');
    readFile(path.resolve(__dirname, './searchMember.json'), 'utf-8').then((data) => {
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }


    })
});
app.post('/group/getmember', function (req, res) {
    console.log('最近合作者。');
    readFile(path.resolve(__dirname, './searchMember.json'), 'utf-8').then((data) => {

        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }


    })
});

app.post('/group/addmember', function (req, res) {
    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then((data) => {
        res.send({code: 0});
    }, () => {
        res.send({code: 1, err: "今天天气不错"});
    })
});
app.post('/group/add', function (req, res) {
    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then((data) => {
        res.send({code: 0, msg: {taskId: 111}});
    }, () => {
        res.send({code: 1, err: "可是我心在下雪"});
    })
});
app.post('/group/delete', function (req, res) {//删除合作者
    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then((data) => {
        res.send({code: 0, msg: {}});
    }, () => {
        res.send({code: 1, err: "可是我心在下雪"});
    })
});
app.post('/registeredUser', function (req, res) {
    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then(() => {
        res.send({code: 1});
    }, () => {
        res.send({code: 0});
    })
});
app.post('/getValidation', function (req, res) {
    readFile(path.resolve(__dirname, './workList.json'), 'utf-8').then((data) => {

        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: "123456"}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }


    })
});
app.post('/retrievePassword', function (req, res) {


    if (typeof req.body.dataSetId !== "string") {
        res.send(
            {code: 0, msg: "成功"}
        );
    } else {
        res.send({code: 1, err: "失败"});
    }




});
app.post('/checkoutValidation', function (req, res) {//校验验证码

    if (typeof req.body.dataSetId !== "string") {
        res.send(
            {code: 0,msg:"成功"}
        );
    } else {
        res.send({code: 1, err: "失败"});
    }


});
//数据集的上传
app.post('/getDataSet', function (req, res) {
    readFile(path.resolve(__dirname, './getDataSet.json'), 'utf-8').then((data) => {

        if (typeof req.body.dataSetId == "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }

    })
});
app.post('/getDataSetDatabase', function (req, res) {
    readFile(path.resolve(__dirname, './getDataSet.json'), 'utf-8').then((data) => {
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
})
app.post('/uploadDataSet', function (req, res) {
    readFile(path.resolve(__dirname, './getDataSet.json'), 'utf-8').then(() => {
        res.send({code: 0});
    }, () => {
        res.send({code: 1, err: "数据展示效果"});
    })
});
app.post('/LocalUpload', function (req, res) {
    readFile(path.resolve(__dirname, './getDataSet.json'), 'utf-8').then(() => {
        res.send({code: 0});
    }, () => {
        res.send({code: 1, err: "失败了"});
    })
});
app.post('/VerifyOldPassword', function (req, res) {
    readFile('./getDataSet.json', 'utf-8').then(() => {
        res.send({code: 0});
    }, () => {
        res.send({code: 1, err: "失败"});
    })
});
app.post('/newPassword', function (req, res) {
    readFile('./getDataSet.json', 'utf-8').then(() => {
        res.send({code: 0});
    }, () => {
        res.send({code: 1, err: "失败"});
    })
});

app.post('/group/change/memberinfo', function (req, res) {
    if (typeof req.body.dataSetId !== "string") {
        res.send(
            {code: 0, msg: "成功"}
        );
    } else {
        res.send({code: 1, err: "失败"});
    }

});
app.post('/group/delmember', function (req, res) {
    readFile('./getDataSet.json', 'utf-8').then(() => {
        res.send({code: 0});
    }, () => {
        res.send({code: 1, err: "失败"});
    })
});
app.post('group/delete', function (req, res) {
    readFile('./getDataSet.json', 'utf-8').then(() => {
        res.send({code: 0});
    }, () => {
        res.send({code: 1, err: "失败"});
    })
});
app.post('/group/change', function (req, res) {

    if (typeof req.body.dataSetId !== "string") {
        res.send(
            {code: 0, msg: "成功"}
        );
    } else {
        res.send({code: 1, err: "失败"});
    }

});
app.post('/removeMemberList', function (req, res) {
    readFile('./getDataSet.json', 'utf-8').then(() => {
        res.send({code: 1});
    }, () => {
        res.send({code: 0});
    })
});
app.post('/getProjectData', function (req, res) {
    readFile(path.resolve(__dirname, './projectData.json'), 'utf-8').then((data) => {

        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
});

////////////////////////////////////////////////////////////// 增加总数据集的数据增加
app.post('/addDateSetList', function (req, res) {
    console.log(req.body.dataSetId);
    if (typeof req.body.dataSetId !== "string") {
        res.send({code: 0});
    } else {
        res.send({code: 1, err: "失败"});
    }
});
app.post('/getUserSynopsis', function (req, res) {
    readFile(path.resolve(__dirname, './seekUser.json'), 'utf-8').then((data) => {
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
});
app.post('/addMemberSearch', function (req, res) {
    readFile(path.resolve(__dirname, './addMemberSearch.json'), 'utf-8').then((data) => {

            if (typeof req.body.dataSetId !== "string") {
                res.send(
                    {code: 0, msg: JSON.parse(data)}
                );
            } else {
                res.send({code: 1, err: "失败"});
            }


        }
    )
});
app.post('/addworkflow', function (req, res) {
    console.log(req.body.dataSetId);
    if (typeof req.body.dataSetId !== "string") {
        res.send({code: 0});
    } else {
        res.send({code: 1});
    }
});
app.post('/saveWorkflowData', function (req, res) {
    console.log(req.body);
    if (typeof req.body.dataSetId === "string") {
        res.send({code: 0});
    } else {
        res.send({code: 1});
    }
});
/////////////////////////////////////////////////////////////////////// 新增加的

app.post('/addMainTask', function (req, res) {
    console.log(req.body);
    if (typeof req.body.dataSetId !== "string") {
        res.send({code: 0,msg:"成功"});
    } else {
        res.send({code: 1, err: "失败"});
    }
});

app.post('/getWorkFlow', function (req, res) {
    readFile(path.resolve(__dirname, './detailedWorkFlle.json'), 'utf-8').then((data) => {


        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }


    },)
})
;app.post('/group/compare', function (req, res) {
    console.log(req.body);
    if (typeof req.body.dataSetId !== "string") {
        res.send(
            {
                code: 0,
                msg: {
                    taskId: 11,
                    name: "name",
                    mailbox: "mailbox",
                    note: "note",
                    img: "/static/images/uxceo-128.jpg",
                }
            }
        );
    } else {
        res.send({code: 1, err: "用户输入方式有日怪"});
    }
});
app.post('/user/getcompany', function (req, res) {//在注册页面获取单位
    readFile(path.resolve(__dirname, './groupGetcompany.json'), 'utf-8').then((data) => {
        //console.log(data);
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
})
app.post('/user/themeset', function (req, res) {//在注册页面获取单位
    readFile(path.resolve(__dirname, './groupGetcompany.json'), 'utf-8').then((data) => {
        if (typeof req.body.dataSetId !== "string") {
            res.send(
                {code: 0, msg: JSON.parse(data)}
            );
        } else {
            res.send({code: 1, err: "失败"});
        }
    })
})


/////////////////////////////////////////////////////////////////////////
app.get('*', function (req, res) {
    let optins = getIndexOptins();
    res.sendFile('index.html', optins, function (err) {
        if (err) res.status(500)
    })

});

function getIndexOptins() {
    let pat = path.resolve(__dirname, '../dist/');
    const optins = {
        root: pat,
        dotfilesa: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    return optins
}