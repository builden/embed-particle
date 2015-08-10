var expect = require('chai').expect;
var del = require('del');
var fs = require('fs');
var ep = require('../lib/embed-particle.js');

var tmpPath = 'test/tmp-result-res';
describe('embed-particle', function() {
  before(function() {
    del.sync(tmpPath);
    fs.mkdirSync(tmpPath);
  });

  it('embed and extract', function(done) {
    ep.embed('test/res/firework.plist', tmpPath, function(err) {
      expect(err).not.exist;
      ep.extract('test/tmp-result-res/firework.plist', function(err) {
        expect(err).not.exist;
        done();
      });
    });
  });

  it('extra have not textureImageData', function(done) {
    ep.extract('test/res/firework.plist', function(err) {
      expect(err).to.equal('not find');
      done();
    });
  });

  it('embed and textureImageData exist', function(done) {
    ep.embed('test/res/reward.plist', tmpPath, function(err) {
      expect(err).to.not.be.ok;
      done();
    });
  });
});