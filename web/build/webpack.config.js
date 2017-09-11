var path = require('path');
const rootDir = path.resolve(__dirname, '../');

module.exports = {
  context: rootDir,
  devtool: "source-map",
  entry: require('./config/entry.config.js'),

  output: require('./config/output.config.js'),

  module: require('./config/module.config.js'),

  resolve: require('./config/resolve.config.js'),

  plugins: require('./config/plugins.config.js'),
};
