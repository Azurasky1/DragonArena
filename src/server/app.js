/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();
var port = process.env.PORT || 8009;
var environment = process.env.NODE_ENV;
var four0four = require('./utils/404')();

// var server = require('http').createServer(app),
// var io = require('socket.io').listen(server);
// var io = require('socket.io')(app);
// var pkginfo = require('pkginfo')(module);

app.disable('x-powered-by');
app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/api', require('./routes'));

console.log('About to start the app');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));

    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });

    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;

  default:
    console.log('** DEV **');
    app.use(express.static('./.tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/*', function(req, res, next) {
      four0four.send404(req, res);
    });

    // Any deep link calls should return index.html
    app.use('/', express.static('./.tmp/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log([
    'env = ' + app.get('env'),
    path.join('__dirname = ', __dirname),
    'process.cwd = ' + process.cwd()
  ].join('\n'));
});

// respond on a status endpoint to verify that the server is up and running
// app.get('/status', function(req, res) {
//   return res.status(200).json({
//     app: module.exports.name,
//     version: module.exports.version,
//     status: 200,
//     message: 'OK - ' + Math.random().toString(36).substr(3, 8)
//   });
// });

// io.on('connection', function(socket) {
//   socket.emit('news', {hello: 'world'});
//   socket.on('my other event', function(data) {
//     console.log(data);
//   });
// });

// app.listen(serverPort, function() {
//   console.log('Server correctly started.');
//   console.log('Server is listening on port ' + serverPort);
// });
