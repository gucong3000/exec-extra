var osHomedir = require('os-homedir');
var path = require('path');
var fs = require('fs');
var findFile = require('./find-file');
var gitPath = require('./git-path');
var lfCode = '\n'.charCodeAt(0);

function fixFn(object, fnName) {
	var oldFn = object[fnName];
	object[fnName] = function(options) {
		fixOpts(options);
		return oldFn.call(this, options);
	};
}

function fixOpts(options) {
	function resolve() {
		return path.resolve(options.cwd || process.cwd(), options.file);
	}

	function setFile(file) {
		if(file) {
			options.file = file;
		}
	}

	if(options.args.length === 5 && options.args[0] === options.file && /\/(?:ba)?sh$/.test(options.file) && options.args[1] === '/d' && options.args[2] === '/s' && options.args[3] === '/c') {
		options.args = [options.args[0], '-c', options.args[4].slice(1, options.args[4].length-1)];
		options.windowsVerbatimArguments = false;
	}

	if(/^~\//.test(options.file)) {
		// 处理linux风格的home路径
		setFile(findFile([path.join(osHomedir(), options.file.slice(2))]));
	} else if(/^[\\\/]/.test(options.file)) {
		// 处理linux风格的绝对路径
		setFile(findFile([path.join(gitPath, options.file.slice(1))]));
	} else if(/^[^\\\/\.]+$/.test(options.file)) {
		// 处理无路径, 无扩展名的命令名称
		var envPath;
		options.envPairs.some(function(value) {
			// 处理环境变量path
			if(/^PATH=/i.test(value)) {
				envPath = value.slice(5).split(';');
			}
			return envPath;
		});

		envPath = envPath.map(function(dir) {
			return path.join(dir, options.file);
		});
		envPath.unshift(resolve());
		setFile(findFile(envPath));
	} else {
		setFile(findFile([resolve()]));
	}

	if(!/\.(?:exe|cmd|bat|com)$/i.test(options.file)) {
		var contents;
		try {
			contents = fs.readFileSync(options.file);
		} catch(ex) {
			//
		}
		if(contents && contents.slice(0, 2).toString() === '#!') {
			var cmd = contents.slice(2, contents.indexOf(lfCode)).toString().trim();
			if(cmd) {
				options.file = path.join(gitPath, 'bin/sh.exe');
				options.args = ['/bin/sh', '-c', options.args.join(' ')];
				options.windowsVerbatimArguments = false;
			}
		}
	}
}
process.env.comspec = '/bin/sh';

fixFn(require('child_process').ChildProcess.prototype, 'spawn');
fixFn(process.binding('spawn_sync'), 'spawn');
