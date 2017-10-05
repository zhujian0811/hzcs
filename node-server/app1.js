/*
 * @Author: zhujian 
 * @Date: 2017-08-12 13:58:13 
 * @Last Modified by: zhujian
 * @Last Modified time: 2017-10-05 13:44:16
 */
import express from 'express';
import db from './mongodb/db.js';
import config from 'config-lite';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
var http = require('http');
var https = require('https')
import fs from 'fs';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
global._ = require('underscore')
global.moment = require('moment')
const app = express();
var privateKey = fs.readFileSync('private.pem', 'utf8');
var certificate = fs.readFileSync('file.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function () {
  console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function () {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});




app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

const MongoStore = connectMongo(session);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(session({
// 	  	name: config.session.name,
// 		secret: config.session.secret,
// 		resave: true,
// 		saveUninitialized: false,
// 		cookie: config.session.cookie,
// 		store: new MongoStore({
// 	  	url: config.url
// 	})
// }))

// app.use(expressWinston.logger({
//     transports: [
//         new (winston.transports.Console)({
//           json: true,
//           colorize: true
//         }),
//         new winston.transports.File({
//           filename: 'logs/success.log'
//         })
//     ]
// }));

router(app);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

app.use(history());
app.use(express.static('../web/dist'));
// app.listen(config.port);