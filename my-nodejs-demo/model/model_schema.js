var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    
   lastUpdate:String,
   score:String,
   content:[{name:String}]

});
var userSchema = new mongoose.Schema({
   userName:String,
   passWord:String,
   token:String

});
var userDataSchema = new mongoose.Schema({
   nickName:String,
   email:String,
   passWord:String,
   fullName:String,
   sex:String,
   birthDate:String,
   carClass:String,
   vaildPeriodStart:String,
   vaildPeriodEnd:String,
   model:String,
   vin:String,
   engine:String,
   serviceTime:String,
   registerDate:String,
   issueDate:String,
   token:String,
   uuid:String
});
module.exports.schema     = schema;
module.exports.userSchema = userSchema;
module.exports.userDataSchema = userDataSchema;