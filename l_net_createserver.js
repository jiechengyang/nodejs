// Node.js Net 模块提供了一些用于底层的网络通信的小工具，包含了创建服务器/客户端的方法，我们可以通过以下方式引入该模块：
// net 模块提供了创建基于流的 TCP 或 IPC 服务器(net.createServer())和客户端(net.createConnection()) 的异步网络 API。
const net = require('net');
const PORT = 8124;
// 创建一个新的TCP/IPC服务
const server = net.createServer((client) => {
		console.log('client connected');
		client.on('end', () => {
			console.log('client disconnected');
		});
		client.write('hello\r\n');
		client.pipe(client);
});

server.on('error', (err) => {
	console.log(err);
	if (err.code  == 'EADDRINUSE') {
		console.log('(地址在使用,重试…)Address in use, retrying...');
		setTimeout(() => {
		  server.close();
		  server.listen(PORT, HOST);
		}, 1000);
	}
	throw err;
});
// server.listen({
//   host: 'localhost',
//   port: 80,
//   exclusive: true
// });
server.listen(PORT, () => {
	console.log('server bound');
	console.log(server.address());
});