var gitPath = require('./git-path');
var mainPath = require('./main-bin-path');
var isWindows = require('is-windows');
var which = require('which');
var thenify = require('thenify');
var whichThenify = thenify(which);

var cache = {};

function whichAsync(cmd) {
	if( !cache[cmd] ) {
		cache[cmd] = mainPath().then(function(mainPath) {
			return gitPath().then(function(gitPath) {
				return whichThenify(cmd, {
					path: [process.env.PATH].concat(gitPath, mainPath).filter(Boolean).join(isWindows ? ';' : ':')
				});
			});
		});

	}
	return cache[cmd];
}

module.exports = whichAsync;
