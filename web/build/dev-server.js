var webpack = require('webpack');
var merge = require('webpack-merge')
var express = require('express');
var app = express();

app.use('/', require('connect-history-api-fallback')());
app.use('/', express.static('dist'));

if (process.env.NODE_ENV !== 'production') {
  var webpackConfig = require('./webpack.config.js');
  var webpackCompiled = webpack(webpackConfig);
  var webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(webpackCompiled, {
    publicPath: '/',
    stats: {colors: true},
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
  }));

  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiled));
}

var server = app.listen(8002, function() {
  var port = server.address().port;
  console.log('Open http://localhost:%s', port);
});