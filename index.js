"use strict";
const isWindows = require("is-windows");

if (isWindows()) {
	require("git-bash-shell")();
} else {
	require("./lib/patch");
}

require("./lib/node-bin-path");

module.exports = require("./lib/spawn-async");
