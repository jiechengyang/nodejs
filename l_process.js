// 输出到终端
process.stdout.write('Hello World! ' + "\n");
// 通过参数读取
process.argv.forEach(function(val, index, array){
	console.log(index + ': ' + val);
	console.log(array);
});
console.log('执行路径:' + process.execPath);
console.log('平台信息:' + process.platform);
console.log('返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数:' + process.execArgv);
console.log('返回一个对象，成员为当前 shell 的环境变量:' + process.env);
console.log('进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码:' + process.exitCode);
console.log('一个属性，包含了 node 的版本和依赖:' + process.version);
console.log('一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同:' + process.config);
console.log('当前进程的进程号:' + process.pid);
console.log('进程名，默认值为"node"，可以自定义该值:' + process.title);
console.log('当前 CPU 的架构:' + process.arch);
console.log('运行程序所在的平台系统:' + process.platform);
console.log('' + process.mainModule);

console.log('当前目录:' + process.cwd());
console.log('当前内存使用情况:' + process.memoryUsage());
console.log('返回当前进程的高分辨时间:' + process.hrtime())
process.exit();