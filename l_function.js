function say(word)
{
	console.info(word);
}

function execute(someFunction, value)
{
	someFunction(value);
}

execute(say, "Hello!Every One");

// 以上代码中，我们把 say 函数作为execute函数的第一个变量进行了传递。这里返回的不是 say 的返回值，而是 say 本身！
// 这样一来， say 就变成了execute 中的本地变量 someFunction ，execute可以通过调用 someFunction() （带括号的形式）来使用 say 函数。
// 当然，因为 say 有一个变量， execute 在调用 someFunction 时可以传递这样一个变量。

// 匿名函数
// 我们可以把一个函数作为变量传递。但是我们不一定要绕这个"先定义，再传递"的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数：

function executeShell(otherFunction, value)
{
	otherFunction(value);
}
executeShell(function(word) {
	console.log(word);
}, 'Hello! Jie')

// 我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。
// 用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做匿名函数 。