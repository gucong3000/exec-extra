"use strict";
const cp = require("child_process");
const os = require("os");

function getHome (options) {
	const homedir = options.envPairs.find((value) => {
		return /^HOME=/.test(value);
	});
	return homedir && homedir.slice(5);
}

function fixSpawnArgs (options) {
	options.file = options.file.replace(/^~(?=[/\\]|$)/, () => getHome(options) || os.homedir());
}

function fixFn (object, fnName, argHook) {
	const oldFn = object[fnName];
	object[fnName] = function () {
		const args = arguments;
		argHook.apply(this, args);
		return oldFn.apply(this, args);
	};
}

fixFn(cp.ChildProcess.prototype, "spawn", fixSpawnArgs);
// eslint-disable-next-line node/no-deprecated-api
fixFn(process.binding("spawn_sync"), "spawn", fixSpawnArgs);
