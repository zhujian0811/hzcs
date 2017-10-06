var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var rootDir = path.resolve(__dirname, '../../');
var pagesDir = path.resolve(rootDir, './src/pages/');
var buildDir = path.resolve(rootDir, './dist/');
var plugins = [];

var server = null;
//npm run build:dev 3.6.1
// if (process.argv.length > 2) {
//   version = process.argv[1];
// }

if (process.env.NODE_ENV === 'production') {
  server = 'http://139.224.11.103:8080/';
}

var basePlugins = [
  new webpack.DefinePlugin({
    'SERVER': JSON.stringify(server)
  }),
  new ExtractTextPlugin({
    filename: '[name].[contentHash].css',
    disable: false,
    allChunks: true
  }),
  new CommonsChunkPlugin({
    names: ['common'],
    chunks: ['index']
  }),

  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: function () {
        return [
          require('autoprefixer')({
            broswers: ['last 5 versions']
          })
        ];
      }
    }
  }),

  new CommonsChunkPlugin({
    names: ['vendor'],
    chunks: ['index']
  }),
  /* 全局shimming */
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    "window.jQuery": "jquery",
    _: 'underscore',
    React: 'react',
    ReactDOM: 'react-dom',
    moment: 'moment',
  }),
];


var htmlPattern = pagesDir + '/*.html';
var fileArr = glob.sync(htmlPattern);

fileArr.forEach((file) => {
  var fileName = path.basename(file, path.extname(file));
  var chunks = ['common'];
  if (fileName === 'index') {
    chunks.push('vendor');
  }
  chunks.push(fileName);
  var conf = {
    template: './src/pages/' + fileName + '.html',
    filename: './' + fileName + '.html',
    chunks: chunks,
    inject: false,
    hash: true,
    inject: 'body'
  };
  basePlugins.push(new HtmlWebpackPlugin(conf))
});



var devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
];


var prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true
  }),
  new OptimizeCSSPlugin()
]


if (process.env.NODE_ENV === 'production') {
  plugins = basePlugins.concat(prodPlugins);
} else {
  plugins = basePlugins.concat(devPlugins);
}

module.exports = plugins;
