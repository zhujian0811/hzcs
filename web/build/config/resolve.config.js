var path = require('path');
var glob = require('glob');
var rootDir = path.resolve(__dirname, '../../');
var componentsDir = path.resolve(rootDir, './src/components/');
var componentsPattern = componentsDir + '/*.js';
var fileArr = glob.sync(componentsPattern);
var alias = {};

//给component创建alias
fileArr.forEach((file) => {
  var fileName = path.basename(file, path.extname(file));
  alias[fileName] = file;
});

module.exports = {
  alias: {
    //components
    components: path.resolve(rootDir, './src/components'),
    core: path.resolve(rootDir, './src/core'),
    libs: path.resolve(rootDir, './src/libs')
  },
  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['.js', '.jsx', 'json'],
}