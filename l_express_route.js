// 我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。
// 在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。
// 接下来我们扩展 Hello World，添加一些功能来处理更多类型的 HTTP 请求。
// 创建 expresponses_demo2.js 文件，代码如下所示：

const express = require('express');
const bodyParser = require('body-parser');
let app = express();
// 创建 application/x-www-form-urlencoded 编码解析
let urlencodeParser = bodyParser.urlencoded({extended: true});
 // 主页输出 "Hello World"
app.get('/', (request, response) => {
		console.log('主页GET请求');
		// 传送HTTP响应
		response.send('Hello GET');
});

// POST 请求
app.post('/', urlencodeParser, (request, response) => {
	console.log(request.body);
	console.log('主页POST请求');
	response.send('Hello POST');
});

// delUser页面响应
app.get('/delUser', (requset, response) => {
   console.log("/del_user 响应 DELETE 请求");
   response.send('删除页面');	
});

// /listUser 页面 GET 请求
app.get('/listUser', (request, response) => {
   console.log("/listUser GET 请求");
   response.send('用户列表页面');
});

// 对页面 update, 等响应 GET 请求
app.get('/up*e', (responsequest, response) => {
	console.log("/ab*cd GET 请求");
	response.send('正则匹配');
});

const server = app.listen(8090, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log("应用实例，访问地址为 http://%s%s", host, port);
});