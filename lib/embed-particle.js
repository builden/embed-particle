var fs = require('fs-extra');
var zlib = require('zlib');
var path = require('path');
var log = require('debug')('embed-particle');
var plist = require('plist-json');

exports.embed = function embed(plistFile, destPath, opts, cb) {
  if (typeof (opts) === 'function') {
    cb = opts;
    opts = {};
  }

  log('embed file: ' + plistFile);
  var dir = path.dirname(plistFile);
  plist.parse(plistFile, function (err, json) {
    if (err) {
      log(new Error(err));
      cb && cb(err);
      return;
    }

    var destFile = path.join(destPath, path.basename(plistFile));
    if (!opts.force && json.textureImageData) {
      log('is embed file');
      return fs.copy(plistFile, destFile, cb);
    }

    var imgPath = path.join(dir, json.textureFileName);
    var buf = zlib.gzipSync(fs.readFileSync(imgPath));
    json.textureImageData = buf.toString('base64');
    fs.mkdirsSync(destPath);
    fs.writeFile(destFile, plist.build(json), cb);
  });
};

exports.extract = function extract(plistFile, cb) {
  log('extract file: ' + plistFile);
  var dir = path.dirname(plistFile);
  plist.parse(plistFile, function (err, json) {
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