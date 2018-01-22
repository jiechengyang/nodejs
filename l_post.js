// 获取 POST 请求内容
// POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
// 比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。

const http = require('http');
const querystring = require('querystring');
const util = require('util');
// http.createServer((request, respose) => {
// 	// 定义了一个post变量，用于暂存请求体的信息
// 	let post = '';
// 	// 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
// 	request.on('data', (chunk) => {
// 		post += chunk;
// 	});

// 	// 在end事件触发后，通过querystring.parse 将 post 解析为真正的POST请求格式,然后向客户端返回
// 	request.on('end', () => {
// 		post += querystring.parse(post);
// 		request(util.inspcet(post));
// 	});
// }).listen(3002);

let postHTML = 
		'<html><head><meta charset="utf-8"><title>杨捷成自学nodejs + es6 规范</title></head>' +
  '<body>' +
  '<form method="post">' +
  '二维码对应的URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer((req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	});

	req.on('end', () => {
		console.log(body);
		body = querystring.parse(body);
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		if (body.url) {
			var responseHTML = 
				'<html><head><meta charset="utf-8"><title>生成二维码2</title><script>window.location.href="http://localhost/ceshi/response.html?url=' + body.url + '"</script></head></html>';

			res.write(responseHTML);
		} else {
			res.write(postHTML);
		}

		res.end();	
	});
}).listen(3002); 