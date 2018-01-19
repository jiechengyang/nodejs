var http = require('http');
var url = require('url');
function start(route)
{
	function onRequest(request, response)
	{
		var stateCode = 200;
		var head = {"content-type": "text-html", "charset": "UTF-8"};
		var body = 'nce upon a time a little girl tried to make a living by selling matches in the street.';
		var pathname = url.parse(request.url).pathname;
		console.log('Request for' + pathname + 'received');
		route(pathname);
		response.writeHead(stateCode, head);
		response.write(body);
		response.end();
	}

	http.createServer(onRequest).listen(7824);
	console.log('Server has started.');
}

exports.start = start;