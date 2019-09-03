const express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const server = app.listen(8090, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});