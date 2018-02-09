'use strict';
var path = require('path');
var delimiter = path.delimiter;
var paths = process.env.PATH.split(delimiter);

[path.join('node_modules', '.bin'), 'bin'].forEach(function (path) {
	if (paths.indexOf(path) < 0) {
		paths.unshift(path);
	}
});

paths.push(path.join(__dirname, '../bin'));

process.env.PATH = paths.filter(Boolean).join(delimiter);
