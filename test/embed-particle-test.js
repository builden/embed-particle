var expect = require('chai').expect;
var del = require('del');
var fs = require('fs');
var ep = require('../lib/embed-particle.js');
var plist = require('plist');

var tmpPath = 'test/tmp-result-res';
describe('embed-particle', function() {
  before(function() {
    del.sync(tmpPath);
    fs.mkdirSync(tmpPath);
  });

  it(function(done) {
    ep.embed('test/res/firework.plist', tmpPath, function(err) {
      expect(err).not.exist;
    });
  });
});