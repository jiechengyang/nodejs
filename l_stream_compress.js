// 链式流
// 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
// 接下来我们就是用管道和链式来压缩和解压文件。

var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('php-iot-test.zip')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('php-iot-test.txt'));

console.log('文件解压完成');