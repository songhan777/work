// 数据库连接
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/wf',{ useNewUrlParser: true });
let db = mongoose.connection;
let Schema = mongoose.Schema;

module.exports = {
    mongoose, 
    db,
    Schema
}