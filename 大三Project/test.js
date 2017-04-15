var http = require('http'),
    fs = require('fs'),
    url = require('url'),
	utl = require('util')

var mysql = require('mysql');
//建立連線
var connection = mysql.createConnection({
    host: 'localhost',
	//host: '127.0.0.1',
	//port: '/var/lib/mysql/mysql.sock',
    user: 'client8',
    password: 'client8',
    database: 'DOGDATA'
});
//開始連接
//console.log("OK");
connection.connect();


//接著就可以開始進行查詢
var server = http.createServer(function(req,res){
	
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
	var path = url.parse(req.url).pathname;
	//res.write("Oh");
	//res.end();
	//console.log("Oh");
}).listen(8001);
var counter = "1";
function requestFunction(req,res){
	console.log('In');
	var InputReq = req.url;
	InputReq = decodeURI(InputReq);
	console.log(InputReq);
	InputReq = InputReq.replace(/%20/g,' ');
	console.log('In');
	console.log(InputReq);
	InputReq = InputReq.slice(1);
	var SliceString = [];
	while(InputReq.indexOf('/') != -1){
		SliceString.push(InputReq.slice(0,InputReq.indexOf('/')));
		InputReq = InputReq.slice(InputReq.indexOf('/')+1);
	}
	
	//console.log(SliceString.length);
	/*for(var i=0;i<SliceString.length;++i){
		console.log(SliceString[i]);
	}*/
	var WhereCondition;
	var InputNumber = SliceString[0];
	var InputMacAddress = SliceString[1];
	var YearFrom,YearTo,MonthFrom,MonthTo,DayFrom,DayTo,HourFrom,HourTo,MinuteFrom,MinuteTo,SecondFrom,SecondTo;
	
	YearFrom = SliceString[2];
	MonthFrom = SliceString[3];
	DayFrom = SliceString[4];
	HourFrom = SliceString[5];
	MinuteFrom = SliceString[6];
	SecondFrom = SliceString[7];
	YearTo = SliceString[8];
	MonthTo = SliceString[9];
	DayTo = SliceString[10];
	HourTo = SliceString[11];
	MinuteTo = SliceString[12];
	SecondTo = SliceString[13];
	
	WhereCondition = InputMacAddress + ' AND Year >= ' + YearFrom + ' AND Year <=' + YearTo + ' AND Month >= ' + MonthFrom + ' AND Month <=' + MonthTo + ' AND Day >= ' + DayFrom + ' AND Day <=' + DayTo + ' AND Hours >= ' + HourFrom + ' AND Hours <=' + HourTo + ' AND Minute >= ' + MinuteFrom + ' AND Minute <=' + MinuteTo + ' AND Second >= ' + SecondFrom + ' AND Second <=' + SecondTo;
	console.log(WhereCondition);
	connection.query(utl.format('select distinct * from PTable where %s order by Year desc,Month desc,Day desc,Hours desc,Minute desc,Second desc limit %s',WhereCondition,InputNumber),function(error, rows, fields){
	//檢查是否有錯誤
	//console.log(InputNumber);
	
	if(error){
		throw error;
	}
	for(var i = 0;i<rows.length;++i){
		var string = JSON.stringify(rows[i]);
		//console.log(rows[i]);
		res.write(string, function(err) { res.end(); });
	}
	});
    console.log('End');
	
	
}

server.on('request',requestFunction);   
console.log("server initialized");