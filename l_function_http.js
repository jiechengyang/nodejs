var http = require('http');

// http.createServer(function(request, response) {
// 	response.writeHead(200, {"Content-Type": "text/html", "charset": "UTF-8"});
// 	response.write('<div>hello world</div>');
// 	response.end();
// }).listen(7824);

function onRequest(request, response)
{
	console.log(request);
	response.writeHead(200, {"Content-Type": "text/html", "charset": "UTF-8"});
	response.write('<div><h1>hello world</h1></div>');
	response.end();	
}

http.createServer(onRequest).listen(7824);