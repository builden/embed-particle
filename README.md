# embed-particle
embed image in particle plist file

## How to use
```js
var ep = require('embed-particle');
ep.embed(plistPath, destPath, function(err) {});

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