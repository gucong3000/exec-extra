var child_process = require('child_process');
var thenify = require('thenify');
var execFile = thenify(child_process.execFile);
var fproxy;

function getter(target, name) {
	return function() {
		var args = Array.from(arguments);
		args.unshift(String(name));
		return target.apply(this, args);
	};
}
if(global.Proxy) {
	fproxy = new Proxy(execFile, {
		get: function(target, name) {
			if(typeof name !== 'string' || name === 'inspect' || (name in target) || (name in Function.prototype)) {
				return target[name];
			}
			return getter(target, name);
		},
		apply: function(target, thisBinding, args) {
			return target.apply(thisBinding, args);
		},
	});
} else {
	fproxy = execFile;
	var cmds = 'arch astextplain awk backup base32 base64 basename bash bashbug bunzip2 bzcat bzcmp bzdiff bzegrep bzfgrep bzgrep bzip2 bzip2recover bzless bzmore captoinfo cat chcon chgrp chmod chown chroot cksum clear cmp column comm cp csplit curl cut cygcheck cygpath d2u dash date dd df diff diff3 dir dircolors dirname docx2txt dos2unix du echo egrep env ex expand expr factor false fgrep file find fmt fold funzip g gawk gdbmtool getconf getfacl getopt git gkill gpg gpgsplit gpgv grep groups gunzip gzip head hostid hostname iconv id igawk infocmp infotocap install join kill ldd ldh less lessecho lesskey link ln locale locate logname ls mac2unix md5sum minidumper mintty mkdir mkfifo mkgroup mknod mkpasswd mktemp mount mv nice nl node nohup notepad npm nproc numfmt od openssl passwd paste patch pathchk perl pinky pldd pluginviewer pr printenv printf ps ptx pwd readlink realpath rebase rebaseall regtool reset restore rm rmdir runcon rview rvim sasldblistusers2 saslpasswd2 scp sdiff sed seq setfacl setmetamode sftp sh sha1sum sha224sum sha256sum sha384sum sha512sum shred shuf sleep sort split ssh sshd ssp start stat stdbuf strace stty sudo sum sync tabs tac tail tar tee test tic timeout toe touch tput tr true truncate trust tset tsort tty tzset u2d umount uname uncompress unexpand uniq unix2dos unix2mac unlink unzip unzipsfx updatedb users vdir vi view vim vimdiff vimtutor wc which who whoami winpty wordpad xargs xmlwf xxd yes zcat zcmp zdiff zegrep zfgrep zforce zgrep zipgrep zipinfo zless zmore znew';
	cmds.split(/\s+/g).forEach(function(cmd) {
		fproxy[cmd] = getter(fproxy, cmd);
	});
}
module.exports = fproxy;
