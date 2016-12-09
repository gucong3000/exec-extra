var describe = require('mocha').describe;
var after = require('mocha').after;
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

});

describe('bsdiff', function() {

	it('bsdiff README.md package.json test/test.patch', function() {
		return exec('bsdiff', ['README.md', 'package.json', 'test/test.patch']);
	});

	it('bspatch README.md test/generated.file.json test/test.patch', function() {
		return exec('bspatch', ['README.md', 'test/generated.file.json', 'test/test.patch']);
	});

	it('Files should have been equal', function() {
		return Promise.all([
			fs.readFile( 'package.json', {encoding:'utf8'} ),
			fs.readFile( 'test/generated.file.json', {encoding:'utf8'} ),
		]).then(function(result) {
			assert.equal(result[0], result[1]);
		});
	});

	after(function() {
		fs.unlink('test/generated.file.json');
		fs.unlink('test/test.patch');
	});
});
