var isWindows = require('is-windows');

if(isWindows()) {
	require('git-bash-shell');
}

require('./lib/node-bin-path');

module.exports = require('./lib/exec-async');
