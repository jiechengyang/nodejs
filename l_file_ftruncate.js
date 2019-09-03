// 截取文件
// 语法
// 以下为异步模式下截取文件的语法格式：
// fs.ftruncate(fd, len, callback)
// 该方法使用了文件描述符来读取文件。
// 参数
// 参数使用说明如下：
// fd - 通过 fs.open() 方法返回的文件描述符。
// len - 文件内容截取的长度。
// callback - 回调函数，没有参数。
// 实例

var fs = require('fs');
var iconv = require('iconv-lite')
var buf = new Buffer(1024);
iconv.skipDecodeWarning = true;
// iconv.decode(string, coding)
console.log('Ready to open the file!');
fs.open('input.txt', 'r+', function(err, fd) {
	if (err) {
		return console.error(err);
	}

	console.log('The file opens successfully');
	console.log('Capture 10 bytes of file content.');

	fs.ftruncate(fd, 10, function(err) {
		if (err) {
			return console.error(err);
		}

		console.log('File capture successful');
		console.log('Read the same file.');
		fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
			if (err) {
				return console.error(err);
			}

			// 仅输出读取的字节
			if (bytes > 0) {
				console.log(buf.slice(0, bytes).toString());
			}

			// 关闭文件
			fs.close(fd, function(err){
				if (err) {
					return console.error(err);
				}

				console.log('File closed successfully!');
			});
		});
	})
});