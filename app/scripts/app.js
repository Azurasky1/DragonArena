/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
*/
(function() {
  'use strict';

  var app;

  // app core function
  function App() {
    var self = this;

    self.modules = window.$modules || {};
    self.game = {
      player: {}
    };

    self.el = {
      overlays: document.querySelector('.overlays')
    };

    self.el.overlays
        .addEventListener('start', self.startGame, false);
    document.addEventListener('player_ready', self.playerReady, false);

    _log('App ready!');
  }

  App.prototype.startGame = function(e) {
    _log('starting game...');

    app.modules.Player.init(app.game, e.detail.playerName);
  };

  App.prototype.playerReady = function(e) {
    _log('Preparing the board...');
  };

  function ready() {
    // Create an instance of the app
    app = new App();

    // Initialize modules
    app.modules.Overlays.init(app.el.overlays, app.game);

    // Start the welcome screen once the app is loaded
    app.modules.Overlays.startWelcome();
  }

  window.addEventListener('load', ready, false);
})();
