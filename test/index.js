'use strict';
var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('expect.js');

var fs = require('mz/fs');
var util = require('util');
var exec = require('../');
var Promise = require('any-promise');

describe('git path', function () {
	it('ls', function () {
		return exec('ls').then(function (stdout) {
			stdout = stdout.toString().split(/\r?\n/).filter(Boolean).sort();
			expect(stdout).to.contain('package.json');
			expect(stdout).to.contain('README.md');
		});
	});
	it('cat README.md', function () {
		return Promise.all([
			exec.cat(['README.md']),
			fs.readFile('README.md', {encoding: 'utf8'}),
		]).then(function (result) {
			expect(result[0].toString()).to.equal(result[1]);
		});
	});
	it('zdiff --help', function () {
		return exec('zdiff', ['--help']).then(function (stdout) {
			expect(stdout.toString()).to.contain('OPTIONs are the same as for');
		});
	});
	it('~/not-exist', function (done) {
		exec('~/not-exist', ['--help']).catch(function (stdout) {
			done();
		});
	});
	it('~/not-exist without $HOME', function (done) {
		exec('~/not-exist', ['--help'], {
			env: {},
		}).catch(function (stdout) {
			done();
		});
	});
	it('util.inspect', function () {
		expect(util.inspect(exec)).to.contain('{ [Function: createPromise]');
	});
});

describe('npm run', function () {
	it('eslint --help', function () {
		return exec('eslint', ['--help']).then(function (stdout) {
			expect(stdout.toString()).to.contain('Basic configuration:');
		});
	});
});
