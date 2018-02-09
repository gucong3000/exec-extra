'use strict';
var path = require('path').posix;
var osHomedir = require('os-homedir');

function fixFn (object, fnName) {
	var oldFn = object[fnName];
	object[fnName] = function (options) {
		if (/^~\//.test(options.file)) {
			// 处理linux风格的home路径
			options.file = path.join(osHomedir(), options.file.slice(2));
		}
		return oldFn.call(this, options);
	};
}

fixFn(require('child_process').ChildProcess.prototype, 'spawn');
fixFn(process.binding('spawn_sync'), 'spawn');
