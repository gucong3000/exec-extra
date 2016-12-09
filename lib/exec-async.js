var child_process = require('mz/child_process');
var whichAsync = require('./which-async');
function execAsync(cmd, args) {
	return whichAsync(cmd).then(function(file) {
		args = [].slice.call(args, 0);
		args.unshift(file);
		return child_process.execFile.apply(child_process, args);
	});
}

module.exports = execAsync;
