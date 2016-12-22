var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');

var fs = require('mz/fs');
var exec = require('../');
var Promise = require('any-promise');

describe('git path', function() {

	it('ls', function() {
		return exec('ls').then(function(result) {
			result = result[0].split(/\r?\n/).filter(Boolean).sort();
			assert.ok(result.indexOf('package.json') >= 0);
			assert.ok(result.indexOf('README.md') >= 0);
		});
	});
	it('cat README.md', function() {
		return Promise.all([
			exec('cat', ['README.md']),
			fs.readFile('README.md', {encoding:'utf8'}),
		]).then(function(result) {
			assert.equal(result[0][0], result[1]);
		});
	});
	it('zdiff --help', function() {
		return exec('zdiff', ['--help']).then(function(result) {
			assert.ok(result[0].indexOf('OPTIONs are the same as for') >= 0);
		});
	});
});

describe('npm run', function() {

	it('eslint --help', function() {
		return exec('eslint', ['--help']).then(function(result) {
			assert.ok(result[0].indexOf('Basic configuration:') >= 0);
		});
	});

});
