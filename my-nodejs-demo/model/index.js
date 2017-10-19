// var db = mongoose.createConnection('localhost','test');
// db.on('error',console.error.bind(console,'连接错误'));
// db.once('open',function(){

// console.log('一次打开记录');

// });
var model_db  = require("./model_mongoose");
var modelSchema = require("./model_schema");
var model_push  = require("./model_push");    
var db = model_db.db;

//推动消息
exports.pushMessage = function(body){
 var userName = body['userName'];
 var message  = body['message'];
 model_push.push(userName,message,'MessagePush');
};
//登录返回用户数据
exports.login = function(req,res){
  if (res.status === 400) {
     res.status(400).json({
           status : -1,
           errCode : 11000,
           errorMsg : "请求错误",

      });
  }else{
   var usersData = req.body;
   var schema    = modelSchema.userDataSchema;
   var allModel  = db.model("userData",schema);
   var data      = usersData;
   var allEntity = new allModel(data);
   var nickName  = usersData['userName'];
   var token     = usersData['token'];  
   var user      = {"email":nickName};
   allModel.findOne(user,function(err,result){
      if (err) {
        res.status(200).json({
          status : -1,
          result : "用户名不正确!"
        });
      } else{
        if (usersData['passWord'] != result['passWord']) {
          res.status(200).json({
            status : 0,
            result : '密码不正确!'
          });
        }else{
          if (token != result['token']) {
            var _nickName = {'nickName':nickName};
            var updateToken = {$set:{'token':token}};
            /**
             _nickName确定是哪一个数据
             updateToken要修改的数据
            **/
            allModel.update(_nickName,updateToken,function(err,result){
              console.log(result);
            });
        };
          res.status(200).json({
           status : 1,
           result : result
          });

        };
        
      };  
   }); 
  };
};

//注册用户数据
exports.registered = function(messageData){
   var schema = modelSchema.userDataSchema;

   var allModel = db.model("userData",schema);
   var data = messageData;

   var allEntity = new allModel(data);
   
   allModel.findOne(data,function(err,doc){
     // var equal;
     // for (var i = 0; i < doc.length; i++) {
     //   var object = doc[i];
     //   if (object['nickName'] === data['nickName']) {
     //       equal = 0;
     //   } else{
     //       equal = 1;
     //   };
     // };
     // if (equal === 1) {
     //   allEntity.save();
     // }else{
     //   return;
     // }
     if (!doc) {
       allEntity.save();
     }else{
        return;
     };
   });
   
};

exports.date= function(messageData){
   var dataSchema = modelSchema.schema;
   var dataModel  = model_db.db.model("firstData",dataSchema);
   var dataEntity = new dataModel(messageData);
   dataEntity.save();
};


