var child_process = require('mz/child_process');
var whichAsync = require('./which-async');
var shebang = require('./shebang');

function execAsync(cmd, args) {
	return whichAsync(cmd).then(function(file) {
		return shebang(file).then(function(shebang) {
			if(shebang && shebang.length) {
				return execAsync(shebang.pop(), shebang.concat(args));
			} else {
				args.unshift(file);
				return child_process.execFile.apply(child_process, args);
			}
		});
	});
}

module.exports = execAsync;
