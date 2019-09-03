// 获取文件信息
// 语法
// 以下为通过异步模式获取文件信息的语法格式：
// fs.stat(path, callback)
// 参数
// 参数使用说明如下：
// path - 文件路径。
// callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
// fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
fs.stat('dist/js/all.js', function(err, stats) {
	// stats.isFile()
	// stats.isDirectory()
	// stats.isBlockDevice()
	// stats.isCharacterDevice()
	// stats.isSymbolicLink() (仅对 fs.lstat() 有效)
	// stats.isFIFO()
	// stats.isSocket()
	console.log(stats.isFile());
});