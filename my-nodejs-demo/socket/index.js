
var path = require("path");
var fs = require("fs");
var filePath = "/Users/iosappdev/Desktop/NodeJs/my-nodejs-demo/audiofile";
var exec = require('child_process').exec,child;

child = exec('rm -rf /Users/iosappdev/Desktop/NodeJs/my-nodejs-demo/audiofile/audio.wav',function(err,out) { 

  console.log(out); err && console.log(err); 

});
//net用于socket
net = require("net");
 
// Start a TCP Server
net.createServer(function (socket) {
// Identify this client
socket.name = socket.remoteAddress + ":" + socket.remotePort 
// Send a nice welcome message and announce
//返回的信息
// socket.write(socket.name);
 var message = new Object();
 message.socketName = socket.name;
 var json = JSON.stringify(message);
// Handle incoming messages from clients.
socket.on('data', function (data) {
console.log(socket);

// fs.open('/Users/iosappdev/Desktop/NodeJs/my-nodejs-demo/audiofile/audio.wav','a',function opened(err,fd){
// var writeBuffer = new Buffer(data);
// var bufferPosition = 0;
// var bufferLength = writeBuffer.length;
// console.log(bufferLength);
// var filePosition = null;
// fs.write(fd,
// 	     writeBuffer,
// 	     bufferPosition,
// 	     bufferLength,
// 	     filePosition,
// 	     function wrote(err,written){
//             if (err) {
//             	console.log(err);
//             };
//                console.log('wrote' + written + 'bytes');
//                fs.close(fd,function(){

//                     console.log("file close");
//                });
// 	     });
// });
 // var obj = JSON.parse(data);

//传的字节需要解析的
 // var b = new Buffer(data);
 // var c =  b.toString('utf-8',0,data.length);
 // var arr = c.split(",",3);


//服务从客户端接受的信息
 // console.log(data);
 socket.write(json);
// console.log(obj);
 
});
 
// Remove the client from the list when it leaves
socket.on('end', function () {
    console.log('disconnect');
});
socket.on('error',function(err){
    console.log("Error:"+err);
}); 
}).listen(5000);

