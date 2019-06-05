const { mongoose, Schema} = require('./config');

//用户
const userPropertyModel = mongoose.model('user_property',  new Schema({
    _id: Schema.Types.ObjectId,
    group_id: Schema.Types.ObjectId,// 项目组ID
    name: String,
    username: String,
    password: String,
    tel: String,//电话号码
    email: String,// email
    company: String,//公司单位
    type: String,
    scope: Number ,//用户权限
}));
const userActionModel = mongoose.model('user_action', new Schema({
    _id: Schema.Types.ObjectId,
    online: Boolean,// 是否在线
    last_login: Date,// 最近登录日期
    registered: Date,//注册日期
    duration: Number, // 在线时长
    duration_total: Number,// 在线总时长
})) 

// 组
const groupPropertyModel = mongoose.model('group_property', new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    type: String,
    scope: Number,
    description: String,
}))
const groupActionModel = mongoose.model('group_action', new Schema({
    user_count: Number,// 总用户数
    online_count: Number,// 在线用户数
}))

//会话
const sessionModel = mongoose.model('session_property', new Schema({
    token: String,
    user_id: Schema.Types.ObjectId,
    last_action: Date,// 最近动作日期
    login: Date, //创建日期
}))
/* const sessionActionModel = mongoose.model('session_action', new Schema({
    last_action: Date,// 最近动作日期
    login: Date, //创建日期
}))
 */

module.exports = {
    userPropertyModel,
    userActionModel,
    groupPropertyModel,
    groupActionModel,
    sessionModel,
}