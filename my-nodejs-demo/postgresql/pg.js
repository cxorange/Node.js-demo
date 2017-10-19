var pg = require('pg');
var lineReader = require('line-reader');  
var schedule = require("node-schedule");
// var time = getnowtime();
// console.log(time);
        // function getnowtime() {
        //     var nowtime = new Date();
        //     var year = nowtime.getFullYear();
        //     var month = padleft0(nowtime.getMonth() + 1);
        //     var day = padleft0(nowtime.getDate());
        //     var hour = padleft0(nowtime.getHours());
        //     var minute = padleft0(nowtime.getMinutes());
        //     var second = padleft0(nowtime.getSeconds());
        //     // var millisecond = nowtime.getMilliseconds(); millisecond = millisecond.toString().length == 1 ? "00" + millisecond : millisecond.toString().length == 2 ? "0" + millisecond : millisecond;
        //     return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        // }
        // //补齐两位数
        // function padleft0(obj) {
        //     return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
        // }
var conString = "postgresql://username@127.0.0.1:5432/postgresql";
var client  = new pg.Client(conString);
client.connect(function(err) {  
    if(err) {    
        return console.error('error fetching client from pool', err);
    }

    insert();
// for (var i = 0; i < 100; i++) {
//    var Rand = Math.random() * (-200) + 100; 
//     Rand = parseInt(Rand, 10);
//     console.log(Rand);
// };
    
});

var insert = function(err){
	 var insertSQL = "INSERT INTO test VALUES(";
     var count = 0;
    lineReader.eachLine('bf_distilled.csv', function(line) {
          count += 1;
        if (count > 1) {
          var countStr = ',' + count;
          line  += countStr;
          var arr = line.split(',');
          var str = '';
          for (var i = 0; i < arr.length; i++) {
            var  num = parseFloat(arr[i]).toFixed(2);
            if (i<arr.length-1) {
                str += num+',';
            }else{
                str = str +num;
            };
             
          }
          console.log(str);
          client.query(insertSQL + str + ')',function(err){
             if (err) {
                 return console.log(err);
             }else{
                 // console.log('insert sueccss');
             };
          });
        };

    });
        
}
var selectSQL = function(err){
	client.query("select * from production_sim",function(err,result){
    	if (err) {
    		return console.log(err);
    	};
    	console.log(result.rows);
    });
}