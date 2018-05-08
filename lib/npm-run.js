#!/usr/bin/env node
"use strict";
require("../");
const childProcess = require("child_process");
childProcess.spawn("npm", ["run"].concat(process.argv.slice(2)), {
	stdio: "inherit",
});
