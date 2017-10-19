var mongoose = require('mongoose');
var model_mongoose = require('./model_mongoose');
var model_schema = require('./model_schema');

var apn = require('apn');

var options = { 
	    pfx : "/Users/iosappdev/Desktop/push/apns-certificate-production.p12",
	    production : true,
	    passphrase : "ibm4you1" 
};
apnConnection = new apn.Connection(options);

exports.push = function(username,message,messageFrom){
  // console.log(messageFrom);
  var token = '1a422be4f90a00b107c0a33d942ef6bbf1704ba53fd8725230e261cc79a603e2';
  // var token = '697816ed4753d0e7be5502427c7257864e5a2b6a2926bb789674de642928598d';
  device = new apn.Device(token);
  note   = new apn.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 60;
  note.alert  = 'push' + '/' + 'Caroline';
  console.log(note.alert);
  note.payload = {'messageFrom': 'Caroline'};
  note.device  = device;
 
  apnConnection.pushNotification(note, device);

};
// var db     = model_mongoose.db;
// var schema = model_schema.userSchema;
// var userModel = db.model('userData',schema);
// exports.push =  function(username,message)
// {
//   console.log('UserName:'+ username + 'Message:' + message);
//   userModel.find(function(err,doc)
// {
//   console.log(doc);
//    for (var i = 0; i < doc.length; i++) 
//   {
//         var object = doc[i];
//     if (username === object["userName"])
//     {
//         var token  = object["token"]; 
//         device = new apn.Device(token);
//         note   = new apn.Notification();
//         note.expiry = Math.floor(Date.now() / 1000) + 60;

//         note.alert  = message;
    
//         note.payload = {'messageFrom': 'Caroline'};
//         note.device  = device;
 
//         apnConnection.pushNotification(note, device);
//     } 
//   };
// });
// };

// var token = '1ae50fe5168fe7e4b55f93ff877b8071c73e370ce0cc82bccc7add4cbf4691e1'; //长度为64的设备Token，去除空格	

