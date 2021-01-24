/* eslint-env node */
const toArrayBuffer = require('./to-arraybuffer').default;

module.exports = toArrayBuffer;

// Allow use of default import with ES module syntax
module.exports.default = toArrayBuffer;
