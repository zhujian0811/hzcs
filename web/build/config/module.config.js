var path = require('path');
var glob = require('glob');
var rootDir = path.resolve(__dirname, '../../');
var srcDir = path.resolve(rootDir, './src');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  rules: [{
    test: /\.(js|jsx)$/,
    include: srcDir,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-0', 'react'],
        plugins: [
          ['react-hot-loader/babel'],
          ['import', {
            "libraryName": "antd",
            "style": "css"
          }]
        ]
      }
    }
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", 'postcss-loader']
    })
  },
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", 'postcss-loader', 'less-loader']
    })
  },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader', 'sass-loader']
    })
  },
  {
    test: /\.html$/,
    use: [{
      loader: 'html-loader',
      options: {
        minimize: false
      }
    }],
  },
  {
    test: require.resolve('underscore'),
    loader: 'exports-loader?window._!script-loader'
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'file-loader',
    query: {
      limit: 10000,
      name: 'img/[name].[hash].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: 'fonts/[name].[hash].[ext]'
    }
  }
  ]
}
