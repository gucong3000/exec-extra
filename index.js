var execAsync = require('./lib/exec-async');

var handler = {
	get: function(target, name) {
		return function() {
			return target(name, [].slice.call(arguments, 0));
		};
	},
	apply: function(target, thisBinding, args) {
		return target(args[0], [].slice.call(args, 1));
	},
};

var fproxy;
if(global.Proxy) {
	fproxy = new Proxy(execAsync, handler);
} else {
	fproxy = function() {
		return execAsync(arguments[0], [].slice.call(arguments, 1));
	};
}

module.exports = fproxy;
