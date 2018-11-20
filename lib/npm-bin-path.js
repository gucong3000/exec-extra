"use strict";
const path = require("path");
const binPath = path.join(
	path.join(__dirname, "..").replace(/[/\\]node_modules[/\\].*$/, ""),
	"node_modules/.bin"
);

const delimiter = path.delimiter;

const paths = process.env.PATH.split(delimiter);

if (paths.indexOf(binPath) < 0) {
	paths.unshift(binPath);
	process.env.PATH = paths.join(delimiter);
}
