var model_db     = require('./model_mongoose');
var model_schema = require('./model_schema');
var db = model_db.db;
var personSchema = model_schema.userSchema;
var personModel  = db.model('userDatas',personSchema);
var user = {"userName":"123"};
personModel.findOne(user,function(err,result){
if (err) {
	console.log(err);
	return;
} else{
	console.log(result);
};

});
