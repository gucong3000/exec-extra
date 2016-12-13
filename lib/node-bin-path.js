var path = require('path');
var binPath = ['bin', path.join('node_modules', '.bin'), ''].join(path.delimiter);
if(process.env.PATH.indexOf(binPath) !== 0) {
	process.env.PATH = binPath + process.env.PATH;
}
