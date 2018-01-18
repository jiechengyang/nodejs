var tool = require('./my_modules/tool');
var mUtil = new tool.myUtil();
// util.inherits
// util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
// JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有 提供对象继承的语言级别特性，而是通过原型复制来实现的。
function baseModel()
{
	this.tabname = 'base';
	this.base = '1991';
	this.sayHi = function() {
		console.log('Hi:' + this.tabname);
	};
}

baseModel.prototype.showBaseTabName = function() {
	console.log(this.base + ':' + this.tabname);
};

function subModel()
{
	this.tabname = 'sub';
}

mUtil.inherits(subModel, baseModel);

var baseObj = new baseModel();

baseObj.showBaseTabName();
baseObj.sayHi();
console.log(baseObj);
var subObj = new subModel();
subObj.showBaseTabName();
//subObj.sayHi();
console.log(subObj);
// 注意：Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
// 同时，在原型中定义的属性不会被console.log 作 为对象的属性输出。如果我们去掉 objSub.sayHello(); 这行的注释，将会看到：

var date = new Date();
mUtil.log('Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承');
console.log(mUtil.inspect(date));;
