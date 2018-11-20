"use strict";
const path = require("path").posix;
const os = require("os");

function getHome (options) {
	const homedir = options.envPairs.find((value) => {
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
	const oldFn = object[fnName];
	object[fnName] = function () {
		const args = arguments;
		try {
			argHook.apply(this, args);
		} catch (ex) {
			//
		}
		return oldFn.apply(this, args);
	};
}

fixFn(require("child_process").ChildProcess.prototype, "spawn", fixSpawnArgs);
// eslint-disable-next-line node/no-deprecated-api
fixFn(process.binding("spawn_sync"), "spawn", fixSpawnArgs);
