// 异步和同步
// Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
// 异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
// 建议大家是用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
var fs = require('fs');
// 异步读取
fs.readFile('input.txt', function(err, data) {
	if (err) {
		console.error(err);
	}
});

// 同步读取
var data = fs.readFileSync('api.php');
console.log('同步读取:' + data.toString());
console.log('程序执行完毕。');

// 打开文件
// 语法
// 以下为在异步模式下打开文件的语法格式：
// fs.open(path, flags[, mode], callback)
// 参数
// 参数使用说明如下：
// path - 文件的路径。
// flags - 文件打开的行为。具体值详见下文。
// mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
// callback - 回调函数，带有两个参数如：callback(err, fd)。

console.log('准备打开文件！');
fs.open('input.txt', 'r+', function(err, fd) {
	if (err) {
		return console.error(err);
	}

	console.log('文件打开成功!');
});

