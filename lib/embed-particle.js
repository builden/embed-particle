var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var log = require('debug')('embed-particle');
var plist = require('plist-json');

exports.embed = function embed(plistFile, destPath, cb) {
  log('embed file: ' + plistFile);
  var json = plist.parse(plistFile, function (err) {
    if (err) {
      log(new Error(err));
    }
    var imgPath = path.join(dir, json.textureFileName);
    var buf = zlib.gzipSync(fs.readFileSync(imgPath));
    json.textureImageData = buf.toString('base64');

    var destFile = 
    fs.writeFile(destPath + path.basename(plistFile), plist.build(json), cb);
  });
};

exports.extract = function extract(plistFile, cb) {
  log('extract file: ' + plistFile);
};