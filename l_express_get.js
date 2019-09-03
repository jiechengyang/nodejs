// GET 方法
// 以下实例演示了在表单中通过 GET 方法提交两个参数，我们可以使用 server.js 文件内的 process_get 路由器来处理输入
const express = require('express');
const PORT = 8081;
let app = express();

app.use(express.static('./static'));
app.get('/index.html', (req, res) => {
	res.sendFile(__dirname + '/' + 'index.html');
});
app.get('/processGet', (req, res) => {
	var response = {
		'first_name': req.query.first_name,
		'last_name': req.query.last_name,
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

const server = app.listen(PORT, () => {
	  var host = server.address().address;
	  var port = server.address().port;
	  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
