/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');
var path =  require('path');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var model = require('./model');
var picturePost = require('./fileWithPost/index');
// create a new express server
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname + 'model')));
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.post('/login',model.login);
app.post('/postImage',picturePost.postImage);
app.get('/sendImage',function(req,res){
  // var c = JSON.parse(req.body);
  console.log(req.body);
  res.send('Hello');
});
ap.get('/angular',function(req,res){
  res.send('Hello World');
});
app.post('/registered',function(req,res){
    if (res.status === 400) 
    {
      res.status(400).json(
      {
           status : -1,
           errCode : 11000,
           errorMsg : "请求错误",

      });
    }else{
      model.registered(req.body);
      res.status(200).json(
      {
           status : 1,
           result : "Success",
      })
    };


});
//推送所需要的接口
app.post('/pushMessage',function(req,res){
      if (res.status === 400) {
      res.status(400).json({
           status : -1,
           errCode : 11000,
           errorMsg : "请求错误",

      });
    }else{
      model.pushMessage(req.body);
      res.status(200).json({
           status : 1,
           result : "Success",
      })
    };

});

app.post('/other',function(req,res){
    if (res.status === 400) {
    	res.status(400).json({
           status : -1,
           errCode : 11000,
           errorMsg : "请求错误",

    	});
    }else{
    	model.date(req.body);
    	res.status(200).json({
           status : 1,
           result : "Success",
    	})
    };

});

app.get('/http://9.186.57.25:3001/text',function(req,res){
  console.log(res.params);
  res.send('message');
});
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
