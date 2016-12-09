var path = require('path');
var child_process = require('mz/child_process');
var isWindows = require('is-windows');
var findDir = require('./find-dir');
var gitDirList = ['%ProgramFiles%\\Git', '%ProgramFiles(x86)%\\Git', '%USERPROFILE%\\AppData\\Local\\Programs\\Git', '%CMDER_ROOT%\\vendor\\git-for-windows'];

var gitPath;

// 获取git下的各个bin目录
function lookupGitPath() {
	if(!gitPath) {
		gitPath = getGitInstallPath().then(function(gitPath) {
			if(gitPath) {
				return ['cmd', 'usr/bin'].map(function(directory) {
					return path.join(gitPath, directory);
				});
			}
		});
	}
	return gitPath;
}

// 在注册表中查询git安装位置
function getGitInstallPath() {
	return child_process.exec('REG QUERY HKLM\\SOFTWARE\\GitForWindows /v InstallPath').then(function(result) {
		if(/\bInstallPath\s+\w+\s+(.+?)\r?\n/.test(result[0])) {
			return RegExp.$1;
		}
	}).catch(function () {
		return null;
	}).then(function(gitPath) {
		return gitPath || findDir(gitDirList);
	});
}

function getGitPath() {
	if(isWindows) {
		return lookupGitPath();
	} else {
		return Promise.resolve();
	}
}

module.exports = getGitPath;
