// Node.js DNS 模块用于解析域名。引入 DNS 模块语法格式如下：
const dns = require('dns');
const HOST = 'www.github.com';
dns.lookup(HOST, (err, address, family) => {
	console.log('IP Address: ' + address);
	dns.reverse(address, (err,hostnames) => {
		if (err) {
			console.error(err.stack);
		}

		console.log('反向解析' + address + ':' + JSON.stringify(hostnames));
	});
});