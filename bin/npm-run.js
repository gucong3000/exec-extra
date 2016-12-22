#!/usr/bin/env node
require('../');
var child_process = require('child_process');

child_process.spawn(process.argv[2], process.argv.slice(3), {
	stdio: 'inherit',
});
