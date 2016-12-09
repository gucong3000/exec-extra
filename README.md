exec-extra
===========

[![NPM version](https://img.shields.io/npm/v/exec-extra.svg?style=flat-square)](https://www.npmjs.com/package/exec-extra)
[![Travis](https://img.shields.io/travis/gucong3000/exec-extra.svg?&label=Linux)](https://travis-ci.org/gucong3000/exec-extra)
[![AppVeyor](https://img.shields.io/appveyor/ci/gucong3000/exec-extra.svg?&label=Windows)](https://ci.appveyor.com/project/gucong3000/exec-extra)
[![Coverage Status](https://img.shields.io/coveralls/gucong3000/exec-extra.svg)](https://coveralls.io/r/gucong3000/exec-extra)

A better child_process

## Why
- Promise interface.
- Improved Windows support.
- Executes locally installed binaries by name.

## Install

```bash
npm install --save exec-extra
```

## API

### execa(file, [arguments], [options])

Execute a file.

Same options as [`child_process.execFile`](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback).
