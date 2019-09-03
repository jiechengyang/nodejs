const net = require('net');
const port = 8124;
const client = net.connect({port: port}, () => {
	console.log('连接到服务器!');
});

client.on('data', (data) => {
	console.log(data.toString());
	client.end();
});

client.on('end', () => {
	console.log('断开与服务器连接');
});