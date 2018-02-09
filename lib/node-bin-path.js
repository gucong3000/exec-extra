'use strict';
var path = require('path');
var binPath = path.join('node_modules', '.bin');
var delimiter = path.delimiter;

var paths = process.env.PATH.split(delimiter).filter(Boolean);

if (paths.indexOf(binPath) < 0) {
	paths.unshift(binPath);
	process.env.PATH = paths.join(delimiter);
}
