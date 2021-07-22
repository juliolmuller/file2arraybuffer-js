/* eslint-env node */
module.exports = {
  env: {
    'browser': true,
    'es6': true,
    'jest': true,
  },
  extends: [
    'lacussoft',
    'lacussoft/typescript',
  ],
  ignorePatterns: [
    'build/',
    'dist/',
    '!.babelrc.js',
  ],
  rules: {},
}
