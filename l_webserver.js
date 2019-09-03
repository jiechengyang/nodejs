// 什么是 Web 服务器？
// Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。
// 大多数 web 服务器都支持服务端的脚本语言（java、c#、php、python、ruby）等，并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器。
// 使用 Node 创建 Web 服务器
// Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块，代码如下:

const http = require('http');
const fs = require('fs');
const url = require('url');

// 创建服务器
http.createServer((request, response) => {
	// 解析请求，包括文件名
	var pathname = url.parse(request.url).pathname;
	// 输出请求的文件名
	console.log("Request for " + pathname + " received.");
	// 从文件系统中读取请求的文件内容
	fs.readFile(pathname.substr(1),  (err, data) => {
		if (err) {
			console.error(err);
			response.writeHead(404, {'Content-Type': 'text/html'});
		} else {
			response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
			response.write(data.toString());
		}

		// 发送响应数据
		response.end();

	});
}).listen(8090);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8090/');
