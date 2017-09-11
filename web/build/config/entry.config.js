var path = require('path');
var glob = require('glob');
var rootDir = path.resolve(__dirname, '../../');
var pagesDir = path.resolve(rootDir, './src/pages/');
var configEntry = {}


var buildPattern = pagesDir + '/*.js';
var fileArr = glob.sync(buildPattern)

configEntry['vendor'] = ['react', 'react-router', 'react-dom', 'bootstrap', 'admin-lte', 'toastr', 'moment', 'g2', 'antd'];

fileArr.forEach((file) => {
  var fileName = path.basename(file, path.extname(file));
  if (process.env.NODE_ENV === 'development' && fileName === 'index') {
    configEntry[fileName] = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat([file])
  } else {
    configEntry[fileName] = [file];
  }
});

module.exports = configEntry;
