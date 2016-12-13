var isWindows = require('is-windows');

if(isWindows()) {
	require('./lib/patch');
	require('./lib/env-path');
}
require('./lib/node-bin-path');
module.exports = require('child_process');
