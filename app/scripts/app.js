/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
*/
(function(global, document) {
  'use strict';

  var app;
  var game = {
    player: {}
  };

  // app core function
  function App() {
    this.elements = {};
    this.modules = global.$modules || {};
    this.game = game;
    this.elements.overlays = document.querySelector('.overlays');
    this.elements.welcome = document.querySelector('.overlays__welcome');
    this.elements.startGame = document
      .querySelector('.overlays__welcome .start__game');

    this.elements.startGameError = document
      .querySelector('.overlays__welcome .input__element__message--error');

    this.elements.store = document.querySelector('.overlays__store');

    this.elements.startGame.addEventListener('click', this.startGame);

    _log('App ready!');
  }

  App.prototype.startGame = function() {
    app.game.player.name = app.modules.Overlays.registerPlayer();

    if (!app.game.player.name) {
      app.elements.startGameError.classList.add('active');
    } else {
      app.modules.Overlays.startGame();
    }
  };

  function ready() {
    // Create an instance of the app
    app = new App();

    // Start the welcome screen once the app is loaded
    app.modules.Overlays.init(
      app.elements.overlays,
      app.elements.welcome
    );

    app.modules.Overlays.show();
  }

  window.addEventListener('load', ready, false);
})(typeof window === 'undefined' ? global : window, document);
