/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const projectInfo = require('./package.json');

const generateConfig = (target) => ({
  target: ['web', 'es5'],
  entry: ['promise-polyfill/dist/polyfill.min.js', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${target}.js`,
    library: 'toArrayBuffer',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'window',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: target.indexOf('.min') > -1,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${projectInfo.name} v${projectInfo.version} | (c) 2020 by ${projectInfo.author}`,
      entryOnly: false,
    }),
  ],
});

module.exports = [
  generateConfig('to-arraybuffer'),
  generateConfig('to-arraybuffer.min'),
];
