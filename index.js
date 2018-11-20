"use strict";

if (process.platform === "win32") {
	require("git-bash-shell")();
} else {
	require("./lib/patch");
}

require("./lib/node-bin-path");

module.exports = require("./lib/spawn-async");
