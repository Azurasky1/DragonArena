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
    self.game = {};

    self.el = {
      overlays: document.querySelector('.overlays'),
      canvas: document.querySelector('.canvas')
    };

    self.el.overlays
        .addEventListener('start', self.startGame, false);
    document.addEventListener('player_ready', self.playerReady, false);
    document.addEventListener('board_ready', self.boardReady, false);

    _log('App ready!');
  }

  App.prototype.startGame = function() {
    _log('Preparing the player...');

    app.modules.Player.init(app.game, '/images/players/001.png');
  };

  App.prototype.playerReady = function() {
    _log('Preparing the board...');

    app.modules.Board.init(app.game, app.el.canvas);
  };

  App.prototype.boardReady = function() {
    _log('Board ready. Starting the game loop');
  };

  function ready() {
    // Create an instance of the app
    app = new App();

    // Make sure the game Object is empty before starting a new game
    app.game = {};

    // Initialize modules
    app.modules.Overlays.init(app.el.overlays, app.game);

    // Start the welcome screen once the app is loaded
    app.modules.Overlays.startWelcome();
  }

  window.addEventListener('load', ready, false);
})();
