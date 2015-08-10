# embed-particle
embed image in particle plist file

## How to use
```js
var ep = require('embed-particle');
var opts = {
  force: true // textureImageData存在，也强制使用textureFileName指向的图片[false]
}
ep.embed(plistPath, destPath, opts, function(err) {});

ep.extract(plistPath, function(err) {});
```

## Installation
```sh
npm install --save embed-particle
```

## Tests
```sh
npm install
npm test
```