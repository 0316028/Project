var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/chart.js"] = requestHandlers.script_js;
handle["/chart.css"] = requestHandlers.style_css;
handle["/Day"] = requestHandlers.GetDayData;
handle["/Week"] = requestHandlers.GetWeekData;

server.start(router.route, handle);
