// Node.js模块系统
// 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
// 模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

var helloWorld = require('./my_modules/hello_world');
// helloWorld.world();
// 在以上示例中，hello.js 通过 exports 对象把 world 作为模块的访问接口，在 main.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问 hello.js 中 exports 对象的成员函数了。
// 有时候我们只是想把一个对象封装到模块中，格式如下：
var helloWorldObj = new helloWorld();
helloWorldObj.setName('future girl');
helloWorldObj.sayHello();

// 模块接口的唯一变化是使用 module.exports = Hello 代替了exports.world = function(){}。 在外部引用该模块时，其接口对象就是要输出的 Hello 对象本身，而不是原先的 exports。
