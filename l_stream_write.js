var fs = require('fs');
var data = '杨捷成正在学习nodejs\n';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream =  fs.createWriteStream('output.txt');

writerStream.write(data, 'UTF-8');
// 标记文件结尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
	console.log('写入完成');
});

writerStream.on('error', function(err) {
	console.log(err.stack);
});

console.log("程序执行完毕");