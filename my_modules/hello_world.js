// exports.world = function() {
// 	const buf = Buffer.from('Hello World', 'ascii');
// 	console.log('Hello World');
// 	console.info(buf.toString('hex'));
// }

function helloControllerClass()
{
	{
		this.name = '';
	}
	var self = this;
	this.setName = function(thyName) {
		this.name = thyName;
	}

	this.getName = function() {
		return self.name;
	}

	this.sayHello = function() {
		console.log('Hello: ' + this.getName());
	}
}

module.exports = helloControllerClass;