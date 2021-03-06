// Node.js 全局对象
// JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
// 在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
// 在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。


// __filename
// __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
console.log('当前正在执行的脚本:' + __filename);
// __dirname
// __dirname 表示当前执行脚本所在的目录。
console.log('当前执行脚本所在的目录:' + __dirname);

// setTimeout(cb, ms)
// setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
// 返回一个代表定时器的句柄值。
setTimeout(() => {
  console.log("ES6写法：全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数");
}, 2000);

setTimeout(function(){
	console.log("匿名函数写法：全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数");
},1000);

function printHello()
{
   console.log( "传统写法：Hello, World!");
}

setTimeout(printHello, 1500);


// clearTimeout(t)
// clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。 参数 t 是通过 setTimeout() 函数创建的定时器。

var t = setTimeout(printHello, 500);
// 清除定时器
clearTimeout(t);

// setInterval(cb, ms)
// setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
// 返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
// setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。

var timeout = 5;
var timer;

function countDown()
{
	if (timeout == 1) {
		clearInterval(timer);
	}
	console.log(timeout--);
}

timer = setInterval(countDown, 1000);

// process
// process 是一个全局变量，即 global 对象的属性。
// 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。

process.on('exit', function(code) {
	setTimeout(() => {
	  console.log('该代码不会执行');
	}, 0);
	console.log('退出码为：', code);
});

console.log('程序执行结束');


