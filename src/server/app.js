/**
 * DragonArena
 *
 * @license
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://raw.githubusercontent.com/Azurasky1/DragonArena/develop/LICENSE
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');
var guid = require('./utils/guid');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8009;
var environment = process.env.NODE_ENV;
var four0four = require('./utils/404')();

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
    // app.use(express.static(__dirname + '/node_modules'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/*', function(req, res, next) {
      four0four.send404(req, res);
    });

    // Any deep link calls should return index.html
    app.use('/', express.static('./.tmp/client/index.html'));
    break;
}

io.on('connection', function(socket) {
  var _guid = guid();
  var _game = {guid: _guid};

  socket.on('app:ready', function() {
    console.log('a user connected: ' + _guid);
    socket.emit('connected', _game);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log([
    'env = ' + app.get('env'),
    path.join('__dirname = ', __dirname),
    'process.cwd = ' + process.cwd()
  ].join('\n'));
});
