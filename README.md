exec-extra
===========

[![NPM version](https://img.shields.io/npm/v/exec-extra.svg?style=flat-square)](https://www.npmjs.com/package/exec-extra)
[![Travis](https://img.shields.io/travis/gucong3000/exec-extra.svg?&label=Linux)](https://travis-ci.org/gucong3000/exec-extra)
[![AppVeyor](https://img.shields.io/appveyor/ci/gucong3000/exec-extra.svg?&label=Windows)](https://ci.appveyor.com/project/gucong3000/exec-extra)
[![Coverage Status](https://img.shields.io/coveralls/gucong3000/exec-extra.svg)](https://coveralls.io/r/gucong3000/exec-extra)

A better child_process

## Why
- Promise interface.
- Executes locally installed binaries by name.
- Improved Windows support.
	- Support [PATHEXT](https://github.com/joyent/node/issues/2318)
	- Support [shebangs](http://pt.wikipedia.org/wiki/Shebang)
	- Support [bash](https://pt.wikipedia.org/wiki/Bash) shell

## Install

```bash
npm install --save exec-extra
```

## Usage

```javascript
const exec = require('exec-extra');
exec('cat', ['README.md']).then(([stdout, stderr]) => {
	console.log(stdout);
	console.error(stderr);
});
```
