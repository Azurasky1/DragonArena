/**
 * DragonArena
 *
 * @license
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://raw.githubusercontent.com/Azurasky1/DragonArena/develop/LICENSE
 *
 * Module name: Utils
 * Description:
 */
(function(global, _log) {
  'use strict';

  var socket = io('http://localhost:8009/');
  var serverStatusOnline = document
    .querySelector('.server__info__status.server__info__status--online');
  var serverStatusOffline = document
    .querySelector('.server__info__status.server__info__status--offline');

  socket.on('connected', function(data) {
    _log('connection established: ' + data.guid);
    serverStatusOffline.classList.remove('enabled');
    serverStatusOnline.classList.add('enabled');
  });

  socket.on('disconnect', function() {
    _log('server disconnected');
    serverStatusOnline.classList.remove('enabled');
    serverStatusOffline.classList.add('enabled');
  });

  window.$socket = socket;
})(typeof window === 'undefined' ? global : window,
   typeof _log === 'undefined' ? console.log.bind(console) : _log);
