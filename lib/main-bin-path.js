var path = require('path');
var findDir = require('./find-dir');
var mainPath;
function getMainPath() {
	if(mainPath) {
		return mainPath;
	}

	var mainModule = process.mainModule;

	// run as a vscode plugin dependence
	if (!mainModule || process.versions.electron) {
		mainModule = module;
		do {
			mainModule = mainModule.parent;
		} while (mainModule.parent && /([\/\\])node_modules\1/.test(mainModule.filename));
	}

	mainPath = findDir(mainModule.paths).then(function(mainPath) {
		var paths = [];
		paths.push(path.join(mainPath, '.bin'));
		var binPath = path.join(mainPath, '../bin');
		paths.push(binPath);
		paths.push(path.join(binPath, process.platform));
		paths.push(path.join(binPath, process.platform, process.arch));
		return paths;
	});
	return mainPath;
}

module.exports = getMainPath;
