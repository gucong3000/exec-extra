var fs = require('mz/fs');

// 搜索数组中第一个真实存在的文件夹
function findDir(directoryList) {
	if(!directoryList.length) {
		return null;
	}

	var directory = directoryList.pop();

	// 替换路径中的环境变量
	directory = directory.replace(/%(.+?)%/g, function (s, env) {
		return process.env[env] || s;
	});

	// 查看文件夹存在与否
	return fs.stat(directory).catch(function() {
		return null;
	}).then(function(stats) {
		return stats && stats.isDirectory() ? directory :  findDir(directoryList);
	});
}

module.exports = findDir;
