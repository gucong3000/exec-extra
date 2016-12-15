var child_process = require('child_process');
var thenify = require('thenify');
var execFile = thenify(child_process.execFile);

var fproxy;
if(global.Proxy) {
	fproxy = new Proxy(execFile, {
		get: function(target, name) {
			var strName;
			if((name in target) || (name in Function.prototype)) {
				return target[name];
			} else {
				strName = String(name);
				if(/\W/.test(strName)) {
					return;
				}
			}
			return function() {
				var args = Array.from(arguments);
				args.unshift(String(name));
				return target.apply(this, args);
			};
		},
		apply: function(target, thisBinding, args) {
			return target.apply(thisBinding, args);
		},
	});
} else {
	fproxy = execFile;
}
module.exports = fproxy;
