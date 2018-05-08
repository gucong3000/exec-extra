'use strict';
var spawn = require('spawn-promise');

function getter (target, name) {
	return function () {
		var args = Array.from(arguments);
		args.unshift(String(name));
		return target.apply(this, args);
	};
}

var fproxy = new Proxy(spawn, {
	get: function (target, name) {
		if (typeof name !== 'string' || name === 'inspect' || (name in target) || (name in Function.prototype)) {
			return target[name];
		}
		return getter(target, name);
	},
	apply: function (target, thisBinding, args) {
		return target.apply(thisBinding, args);
	},
});
module.exports = fproxy;
