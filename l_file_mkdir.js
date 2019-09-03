// 创建目录
// 语法
// 以下为创建目录的语法格式：
// fs.mkdir(path[, mode], callback)
// 参数
// 参数使用说明如下：
// path - 文件路径。
// mode - 设置目录权限，默认为 0777。
// callback - 回调函数，没有参数。
// 实例

var fs = require('fs');

console.log("创建目录 ./uploads");
fs.mkdir('./uploads', function(err) {
   if (err) {
       return console.error(err);
   }	

    console.log("目录创建成功。");
})