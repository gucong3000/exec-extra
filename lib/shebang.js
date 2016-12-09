var fs = require('mz/fs');
var isWindows = require('is-windows');
var lfCode = '\n'.charCodeAt(0);

function getShebang(file) {
	return fs.readFile(file).then(function(contents) {
		if(contents.slice(0,2).toString() !== '#!') {
			return;
		}
		var cmd = contents.slice(2, contents.indexOf(lfCode)).toString().trim();
		cmd = cmd.replace(/^\/\S+\//, '').split(/\s+/);
		if(cmd.length) {
			return cmd;
		}
	}).catch(function () {
		// return;
	});
}

function shebang(file) {
	if(isWindows && !/\.(?:EXE|CMD|BAT|COM)$/i.test(file)) {
		return getShebang(file);
	} else {
		return Promise.resolve();
	}
}
module.exports = shebang;
