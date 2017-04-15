var http = require("http");
var url = require("url");

function start(route, handle){
  function onRequest(request, response) {
	response.setHeader("Access-Control-Allow-Origin", "*")
	response.setHeader("Access-Control-Allow-Headers", "x-requested-with")
	response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    var pathname = url.parse(request.url).pathname;

    route(handle, pathname, response);

    console.log("Request for " + pathname + " receieve.");
  }

  var server = http.createServer(onRequest).listen(8888);
}

exports.start = start;
