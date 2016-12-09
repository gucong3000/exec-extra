exec-extra
===========

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
