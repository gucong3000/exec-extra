"use strict";
const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("expect.js");

const fs = require("mz/fs");
const util = require("util");
const exec = require("../");
const Promise = require("any-promise");

describe("git path", () => {
	it("ls", () => {
		return exec("ls").then((stdout) => {
			stdout = stdout.toString().split(/\r?\n/).filter(Boolean).sort();
			expect(stdout).to.contain("package.json");
			expect(stdout).to.contain("README.md");
		});
	});
	it("cat README.md", () => {
		return Promise.all([
			exec.cat(["README.md"]),
			fs.readFile("README.md", {encoding: "utf8"}),
		]).then((result) => {
			expect(result[0].toString()).to.equal(result[1]);
		});
	});
	it("zdiff --help", () => {
		return exec("zdiff", ["--help"]).then((stdout) => {
			expect(stdout.toString()).to.contain("OPTIONs are the same as for");
		});
	});
	it("~/not-exist", (done) => {
		exec("~/not-exist", ["--help"]).catch((stdout) => {
			done();
		});
	});
	it("~/not-exist without $HOME", (done) => {
		exec("~/not-exist", ["--help"], {
			env: {},
		}).catch((stdout) => {
			done();
		});
	});
	it("util.inspect", () => {
		expect(util.inspect(exec)).to.contain("{ [Function: createPromise]");
	});
});

describe("npm run", () => {
	it("eslint --help", () => {
		return exec("eslint", ["--help"]).then((stdout) => {
			expect(stdout.toString()).to.contain("Basic configuration:");
		});
	});
});
