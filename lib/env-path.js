var gitPath = require('./git-path');
var path = require('path');
var newPath = ['bin', 'usr/bin', 'usr/share/vim/vim74'].map(function(subDir) {
	return path.join(gitPath, subDir);
});
var delimiter = ';';
var paths = process.env.PATH.split(delimiter);
newPath = newPath.filter(function(dir) {
	return paths.indexOf(dir) < 0;
});
process.env.PATH = newPath.concat(paths).filter(Boolean).join(delimiter);
