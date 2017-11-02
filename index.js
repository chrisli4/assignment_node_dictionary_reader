const Keyval = require('./lib/keyval');
const path = require('path');
const appDir = path.dirname(require.main.filename);


Keyval.init(appDir);