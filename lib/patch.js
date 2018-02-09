'use strict';
var path = require('path').posix;
var os = require('os');

function getHome (options) {
	var homedir = options.envPairs.find(function (value) {
		return /^HOME=/i.test(value);
	});
	return homedir && homedir.slice(5);
}

function fixSpawnArgs (options) {
	if (/^~\//.test(options.file)) {
		// 处理linux风格的home路径
		options.file = path.join(getHome(options) || os.homedir(), options.file.slice(2));
	}
}

function fixFn (object, fnName, argHook) {
	var oldFn = object[fnName];
	object[fnName] = function () {
		var args = arguments;
		try {
			argHook.apply(this, args);
		} catch (ex) {
			//
		}
		return oldFn.apply(this, args);
	};
}

fixFn(require('child_process').ChildProcess.prototype, 'spawn', fixSpawnArgs);
fixFn(process.binding('spawn_sync'), 'spawn', fixSpawnArgs);
