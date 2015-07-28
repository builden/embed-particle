var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var log = require('debug')('embed-particle');
var plist = require('plist-json');

exports.embed = function embed(plistFile, destPath, cb) {
  log('embed file: ' + plistFile);
  var dir = path.dirname(plistFile);
  plist.parse(plistFile, function (err, json) {
    if (err) {
      log(new Error(err));
      cb && cb(err);
      return;
    }
    var imgPath = path.join(dir, json.textureFileName);
    var buf = zlib.gzipSync(fs.readFileSync(imgPath));
    json.textureImageData = buf.toString('base64');

    var destFile = path.join(destPath, path.basename(plistFile));
    fs.writeFile(destFile, plist.build(json), cb);
  });
};

exports.extract = function extract(plistFile, cb) {
  log('extract file: ' + plistFile);
  var dir = path.dirname(plistFile);
  plist.parse(plistFile, function(err, json) {
    if (err) {
      log(new Error(err));
      cb && cb(err);
      return;
    }
    if (!json.textureImageData) {
      log('have not find textureImageData at ' + plistFile);
      cb && cb('not find');
      return;
    }

    var imgPath = path.join(dir, json.textureFileName);
    var buf = new Buffer(json.textureImageData, 'base64');
    buf = zlib.gunzipSync(buf);
    fs.writeFile(imgPath, buf, cb);
  });
};