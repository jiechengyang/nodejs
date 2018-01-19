var util = require('util');
function myUtil()
{
	this.inherits = function(constructor, superConstructor) {
		util.inherits(constructor, superConstructor);
	};

	this.log = function(str) {
		util.log(str);
	};

	this.debuglog = function(section) {
		util.debuglog(section);
	};

	this.isError = function(obj) {
		return util.isError(obj);
	};

	this.inspect = function(obj) {
		return util.inspect(obj);
	};

	this.isArray = function(obj) {
		return util.isArray(obj);
	};

	this.isRegExp = function(obj) {
		return util.isRegExp(obj);
	};

	this.isDate = function(obj) {
		return util.isDate(obj);
	};
}

exports.myUtil = myUtil;