var mongoose = require("mongoose");
// var db = mongoose.createConnection('localhost','test');
var uri = 'mongodb://admin:passw0rd@ds023078.mlab.com:23078/cognitive-iot-db'
var db = mongoose.createConnection(uri) 
db.on('error',console.error.bind(console,'连接错误'));
db.once('open',function(){

console.log('一次打开记录');

});
module.exports.db = db;
