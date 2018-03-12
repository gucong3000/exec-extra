#!/usr/bin/env node
'use strict';
require('../');
var childProcess = require('child_process');
childProcess.spawn('npm', ['run'].concat(process.argv.slice(2)), {
	stdio: 'inherit',
});
