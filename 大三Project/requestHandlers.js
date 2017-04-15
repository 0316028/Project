var fs = require("fs");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: '140.113.89.153',
    user: 'client8',
    password: 'client8',
    database: 'DOGDATA'
});

function start(response) {
  console.log("Request handler 'start' was called.");
  fs.readFile('index.html', 'utf-8', function(err, content) {
    if(err) {
      response.end("Error.");
      return;
    }
    else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(content, "utf8");
      response.end();
    }
  });
}

function script_js(response) {
  console.log("Request handler 'script_js' was called.");
  fs.readFile('script_2.js', 'utf-8', function(err, content) {
    if(err) {
      response.end("Error.");
      return;
    }
    else {
      response.writeHead(200, {"Content-Type": "text/javascript"});
      response.write(content, "utf8");
      response.end();
    }
  });
}

function style_css(response) {
  console.log("Request handler 'style_css' was called.");
  fs.readFile('style_3.css', 'utf-8', function(err, content) {
    if(err) {
      response.end("Error.");
      return;
    }
    else {
      response.writeHead(200, {"Content-Type": "text/css"});
      response.write(content, "utf8");
      response.end();
    }
  });
}

function GetDayData(response) {
  response.writeHead(200, {"Content-Type": "application/json"});
  var queryString = "select distinct * from ptable where to_days(now())-to_days(datatime)=1 order by MAC_Address, Month, Day, Hours, Minute";
  console.log(queryString);
  connection.query(queryString, function(error, rows, fields){
      if(error){
        throw error;
      }
      else {
        var packageCnt = 0;
        var totalPackage = 60;
        var tempPre = [];
        var greenData = [], yellowData = [], redData = [];
        var precisionsSet = {
          green: [],
          yellow: [],
          red: []
        };

        for(var i = 0; i < rows.length; i++) {
          if(rows[i].MAC_Address == '101a18000034') greenData.push(rows[i]);
          else if(rows[i].MAC_Address == '101a18000035') yellowData.push(rows[i]);
          else if(rows[i].MAC_Address == '101a18000036') redData.push(rows[i]);
        }

        var curHour = greenData[0].Hours;
        for(var i = 0; i < greenData.length; i++) {
          packageCnt++;
          if((i != greenData.length-1) && (greenData[i+1].Hours == curHour)) {
            totalPackage -= Math.floor(((greenData[i+1].Minute - greenData[i].Minute) / 6)) * 5;
          }
          else {
            curHour += 1;
            var pre = ((totalPackage - packageCnt) / totalPackage) * 100;
            tempPre.push(pre);
            packageCnt = 0;
            totalPackage = 60;
          }
        }
        precisionsSet.green = tempPre;
        tempPre = [];
        curHour = yellowData[0].Hours;

        for(var i = 0; i < yellowData.length; i++) {
          packageCnt++;
          if((i != yellowData.length-1) && (yellowData[i+1].Hours == curHour)) {
            totalPackage -= Math.floor(((yellowData[i+1].Minute - yellowData[i].Minute) / 6)) * 5;
          }
          else {
            curHour += 1;
            var pre = ((totalPackage - packageCnt) / totalPackage) * 100;
            tempPre.push(pre);
            packageCnt = 0;
            totalPackage = 60;
          }
        }
        precisionsSet.yellow = tempPre;
        tempPre = [];
        curHour = redData[0].Hours;

        for(var i = 0; i < redData.length; i++) {
          packageCnt++;
          if((i != redData.length-1) && (redData[i+1].Hours == curHour)) {
            totalPackage -= Math.floor(((redData[i+1].Minute - redData[i].Minute) / 6)) * 5;
          }
          else {
            curHour += 1;
            var pre = ((totalPackage - packageCnt) / totalPackage) * 100;
            tempPre.push(pre);
            packageCnt = 0;
            totalPackage = 60;
          }
        }
        precisionsSet.red = tempPre;
        var jsonText = JSON.stringify(precisionsSet);
        response.end(jsonText);
      }
  });
}

function GetWeekData(response) {
  response.writeHead(200, {"Content-Type": "application/json"});
  var queryString = "select distinct * from PTable where  datatime>=date_sub(curdate(),interval 7 day) order by MAC_Address, Month, Day, Hours, Minute";
  connection.query(queryString, function(error, rows, fields){
      if(error){
        throw error;
      }
      else {
        var packageCnt = 0;
        var totalPackage = 1440;
        var tempPre = [];
        var greenData = [], yellowData = [], redData = [];
        var precisionsSet = {
          green: [],
          yellow: [],
          red: []
        };

        for(var i = 0; i < rows.length; i++) {
          if(rows[i].MAC_Address == '101a18000034')greenData.push(rows[i]);
          else if(rows[i].MAC_Address == '101a18000035') yellowData.push(rows[i]);
          else if(rows[i].MAC_Address == '101a18000036')redData.push(rows[i]);
        }

        var curDay = greenData[0].Day;
        for(var i = 0; i < greenData.length; i++) {
          packageCnt++;
          if((i != greenData.length-1) && (greenData[i+1].Day == curDay)) {
            totalPackage -= Math.floor(((greenData[i+1].Minute - greenData[i].Minute) / 6)) * 5;
          }
          else {
            curDay += 1;
            var pre = ((totalPackage - packageCnt) / totalPackage) * 100;
            tempPre.push(pre);
            packageCnt = 0;
            totalPackage = 1440;
          }
        }
        precisionsSet.green = tempPre;
        tempPre = [];
        curDay = yellowData[0].Day;

        for(var i = 0; i < yellowData.length; i++) {
          packageCnt++;
          if((i != yellowData.length-1) && (yellowData[i+1].Day == curDay)) {
            totalPackage -= Math.floor(((yellowData[i+1].Minute - yellowData[i].Minute) / 6)) * 5;
          }
          else {
            curDay += 1;
            var pre = ((totalPackage - packageCnt) / totalPackage) * 100;
            tempPre.push(pre);
            packageCnt = 0;
            totalPackage = 1440;
          }
        }
        precisionsSet.yellow = tempPre;
        tempPre = [];
        curDay = redData[0].Day;

        for(var i = 0; i < redData.length; i++) {
          packageCnt++;
          if((i != redData.length-1) && (redData[i+1].Day == curDay)) {
            totalPackage -= Math.floor(((redData[i+1].Minute - redData[i].Minute) / 6)) * 5;
          }
          else {
            curDay += 1;
            var pre = ((totalPackage - packageCnt) / totalPackage) * 100;
            tempPre.push(pre);
            packageCnt = 0;
            totalPackage = 1440;
          }
        }
        precisionsSet.red = tempPre;
        var jsonText = JSON.stringify(precisionsSet);
        response.end(jsonText);
      }
  });
}

exports.start = start;
exports.script_js = script_js;
exports.style_css = style_css;
exports.GetDayData = GetDayData;
exports.GetWeekData = GetWeekData;
