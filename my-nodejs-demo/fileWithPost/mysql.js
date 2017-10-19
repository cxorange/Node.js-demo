var mysql = require('mysql');
// var connection = mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'',
// 	database:'first'
// });
var connection = mysql.createConnection({
	host:'120.76.98.74',
	user:'root',
	password:'Engross0812',
	database:'youneng'
});
connection.connect();
// var date = new Date("2017-02-02 01:00:00").getTime();
var date = Date('2016-11-27T16:00:00.000Z');
// var date1 = Date.prototype(date);
// console.log(date1);

var o = {
    "M+" : Date.getMonth()+1,                 //月份
    "d+" : Date.getDate(),                    //日
    "h+" : Date.getHours(),                   //小时
    "m+" : Date.getMinutes(),                 //分
    "s+" : Date.getSeconds(),                 //秒
    "q+" : Math.floor((Date.getMonth()+3)/3), //季度
    "S"  : Date.getMilliseconds()             //毫秒
};

if(/(y+)/.test(date))
    date=date.replace(RegExp.$1, (this.getFullYear().toString()).substr(4 - RegExp.$1.length));
for(var k in o)
    if(new RegExp("("+ k +")").test(date))
        date = date.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//查询
var selectSQL='select * from tem_station_year `create_dtm` like' + " " + date1;
// var selectSQL = 'select * from tem_station_year';
//添加
var insertSQL= 'insert into `study`(`id`,`name`,`class`)values("5","mary","1年4班")';
//修改
var updateSQL='update `study` set `name`="caton" where name="mary"'
//删除
var deleteSQL='delete from `study` where `name` like "caton"';
connection.query(selectSQL,function(err,rows){
	if (err) {
		throw err;
	};
	console.log("查询结果为:",rows);
});

connection.end();



// Date.prototype.format = function(fmt){
// var o = {
//     "M+" : this.getMonth()+1,                 //月份
//     "d+" : this.getDate(),                    //日
//     "h+" : this.getHours(),                   //小时
//     "m+" : this.getMinutes(),                 //分
//     "s+" : this.getSeconds(),                 //秒
//     "q+" : Math.floor((this.getMonth()+3)/3), //季度
//     "S"  : this.getMilliseconds()             //毫秒
// };

// if(/(y+)/.test(fmt))
//     fmt=fmt.replace(RegExp.$1, (this.getFullYear().toString()).substr(4 - RegExp.$1.length));
// for(var k in o)
//     if(new RegExp("("+ k +")").test(fmt))
//         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
// return fmt;

// };
