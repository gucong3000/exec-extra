exec-extra
===========

[![NPM version](https://img.shields.io/npm/v/exec-extra.svg?style=flat-square)](https://www.npmjs.com/package/exec-extra)
[![Travis](https://img.shields.io/travis/gucong3000/exec-extra.svg?&label=Linux)](https://travis-ci.org/gucong3000/exec-extra)
[![AppVeyor](https://img.shields.io/appveyor/ci/gucong3000/exec-extra.svg?&label=Windows)](https://ci.appveyor.com/project/gucong3000/exec-extra)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/exec-extra.svg)](https://codecov.io/gh/gucong3000/exec-extra)

A better child_process

## Why
- Promise interface.
- Executes locally installed binaries by name.
- Support [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) shell script cross platform
- Support [POSIX](https://en.wikipedia.org/wiki/POSIX) file path.
- Improved Windows support.
	- Support [Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))
	- Support [PATHEXT](https://github.com/joyent/node/issues/2318)
	- Support [Shell script](https://en.wikipedia.org/wiki/Shell_script)

## Install

```bash
npm install --save exec-extra
```

## Usage

```javascript
const exec = require('exec-extra');
exec('cat', ['README.md']).then((stdout) => {
	console.info('Success!')
	console.info('stdout:', stdout.toString())
})
.catch((error) => {
	console.error('Failed!')
	console.error('exit status:', error.exitStatus)
	console.error('stderr:', error.stderr.toString())
})
```

Or use `child_process`

```javascript
require('exec-extra');
const spawn = require('child_process').spawn;
const ls = spawn('eslint', ['test/*.js']);

ls.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
	console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
});
```

Or use CLI

```bash
npm i -g exec-extra
npm-run mocha
```

## Methods

- `exec.arch()`
- `exec.astextplain()`
- `exec.awk()`
- `exec.backup()`
- `exec.base32()`
- `exec.base64()`
- `exec.basename()`
- `exec.bash()`
- `exec.bashbug()`
- `exec.bunzip2()`
- `exec.bzcat()`
- `exec.bzcmp()`
- `exec.bzdiff()`
- `exec.bzegrep()`
- `exec.bzfgrep()`
- `exec.bzgrep()`
- `exec.bzip2()`
- `exec.bzip2recover()`
- `exec.bzless()`
- `exec.bzmore()`
- `exec.captoinfo()`
- `exec.cat()`
- `exec.chcon()`
- `exec.chgrp()`
- `exec.chmod()`
- `exec.chown()`
- `exec.chroot()`
- `exec.cksum()`
- `exec.clear()`
- `exec.cmp()`
- `exec.column()`
- `exec.comm()`
- `exec.cp()`
- `exec.csplit()`
- `exec.curl()`
- `exec.cut()`
- `exec.cygcheck()`
- `exec.cygpath()`
- `exec.d2u()`
- `exec.dash()`
- `exec.date()`
- `exec.dd()`
- `exec.df()`
- `exec.diff()`
- `exec.diff3()`
- `exec.dir()`
- `exec.dircolors()`
- `exec.dirname()`
- `exec.docx2txt()`
- `exec.dos2unix()`
- `exec.du()`
- `exec.echo()`
- `exec.egrep()`
- `exec.env()`
- `exec.ex()`
- `exec.expand()`
- `exec.expr()`
- `exec.factor()`
- `exec.false()`
- `exec.fgrep()`
- `exec.file()`
- `exec.find()`
- `exec.fmt()`
- `exec.fold()`
- `exec.funzip()`
- `exec.g()`
- `exec.gawk()`
- `exec.gdbmtool()`
- `exec.getconf()`
- `exec.getfacl()`
- `exec.getopt()`
- `exec.git()`
- `exec.gkill()`
- `exec.gpg()`
- `exec.gpgsplit()`
- `exec.gpgv()`
- `exec.grep()`
- `exec.groups()`
- `exec.gunzip()`
- `exec.gzip()`
- `exec.head()`
- `exec.hostid()`
- `exec.hostname()`
- `exec.iconv()`
- `exec.id()`
- `exec.igawk()`
- `exec.infocmp()`
- `exec.infotocap()`
- `exec.install()`
- `exec.join()`
- `exec.kill()`
- `exec.ldd()`
- `exec.ldh()`
- `exec.less()`
- `exec.lessecho()`
- `exec.lesskey()`
- `exec.link()`
- `exec.ln()`
- `exec.locale()`
- `exec.locate()`
- `exec.logname()`
- `exec.ls()`
- `exec.mac2unix()`
- `exec.md5sum()`
- `exec.minidumper()`
- `exec.mintty()`
- `exec.mkdir()`
- `exec.mkfifo()`
- `exec.mkgroup()`
- `exec.mknod()`
- `exec.mkpasswd()`
- `exec.mktemp()`
- `exec.mount()`
- `exec.mv()`
- `exec.nice()`
- `exec.nl()`
- `exec.nohup()`
- `exec.notepad()`
- `exec.nproc()`
- `exec.numfmt()`
- `exec.od()`
- `exec.openssl()`
- `exec.passwd()`
- `exec.paste()`
- `exec.patch()`
- `exec.pathchk()`
- `exec.perl()`
- `exec.pinky()`
- `exec.pldd()`
- `exec.pluginviewer()`
- `exec.pr()`
- `exec.printenv()`
- `exec.printf()`
- `exec.ps()`
- `exec.ptx()`
- `exec.pwd()`
- `exec.readlink()`
- `exec.realpath()`
- `exec.rebase()`
- `exec.rebaseall()`
- `exec.regtool()`
- `exec.reset()`
- `exec.restore()`
- `exec.rm()`
- `exec.rmdir()`
- `exec.runcon()`
- `exec.rview()`
- `exec.rvim()`
- `exec.sasldblistusers2()`
- `exec.saslpasswd2()`
- `exec.scp()`
- `exec.sdiff()`
- `exec.sed()`
- `exec.seq()`
- `exec.setfacl()`
- `exec.setmetamode()`
- `exec.sftp()`
- `exec.sh()`
- `exec.sha1sum()`
- `exec.sha224sum()`
- `exec.sha256sum()`
- `exec.sha384sum()`
- `exec.sha512sum()`
- `exec.shred()`
- `exec.shuf()`
- `exec.sleep()`
- `exec.sort()`
- `exec.split()`
- `exec.ssh()`
- `exec.sshd()`
- `exec.ssp()`
- `exec.start()`
- `exec.stat()`
- `exec.stdbuf()`
- `exec.strace()`
- `exec.stty()`
- `exec.sudo()`
- `exec.sum()`
- `exec.sync()`
- `exec.tabs()`
- `exec.tac()`
- `exec.tail()`
- `exec.tar()`
- `exec.tee()`
- `exec.test()`
- `exec.tic()`
- `exec.timeout()`
- `exec.toe()`
- `exec.touch()`
- `exec.tput()`
- `exec.tr()`
- `exec.true()`
- `exec.truncate()`
- `exec.trust()`
- `exec.tset()`
- `exec.tsort()`
- `exec.tty()`
- `exec.tzset()`
- `exec.u2d()`
- `exec.umount()`
- `exec.uname()`
- `exec.uncompress()`
- `exec.unexpand()`
- `exec.uniq()`
- `exec.unix2dos()`
- `exec.unix2mac()`
- `exec.unlink()`
- `exec.unzip()`
- `exec.unzipsfx()`
- `exec.updatedb()`
- `exec.users()`
- `exec.vdir()`
- `exec.vi()`
- `exec.view()`
- `exec.vim()`
- `exec.vimdiff()`
- `exec.vimtutor()`
- `exec.wc()`
- `exec.which()`
- `exec.who()`
- `exec.whoami()`
- `exec.winpty()`
- `exec.wordpad()`
- `exec.xargs()`
- `exec.xmlwf()`
- `exec.xxd()`
- `exec.yes()`
- `exec.zcat()`
- `exec.zcmp()`
- `exec.zdiff()`
- `exec.zegrep()`
- `exec.zfgrep()`
- `exec.zforce()`
- `exec.zgrep()`
- `exec.zipgrep()`
- `exec.zipinfo()`
- `exec.zless()`
- `exec.zmore()`
- `exec.znew()`
