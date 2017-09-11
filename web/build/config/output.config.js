var path = require('path');
var glob = require('glob');
var rootDir = path.resolve(__dirname, '../../');
var buildPath = path.resolve(rootDir, './dist');

module.exports = {
  path: buildPath,
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  filename: '[name].[hash].js',
  chunkFilename: '[id].chunk.js'
};
