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
 * MIT license: https://opensource.org/licenses/mit-license.php
*/
(function() {
  'use strict';

  var app;
  var fpsInterval;
  var now;
  var then;
  var elapsed;
  var fps = 30;

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
    document
      .addEventListener('board_ready', self.boardReady, false);
    document
      .addEventListener('player_ready', self.setGameLoop.bind(this), false);

    $socket.emit('app:ready');
    _log('App ready!');
  }

  App.prototype.setGameLoop = function() {
    _log('Board ready. Starting the game loop');

    app.modules.Keyboard.init(app.game);

    fpsInterval = 1000 / fps;
    then = Date.now();

    animate();
  };

  App.prototype.startGame = function() {
    _log('Preparing the board...');

    app.el.canvas.classList.remove('hide');
    app.modules.Board.init(app.game, app.el.canvas);
  };

  App.prototype.boardReady = function() {
    _log('Preparing the player...');

    var player = Math.floor(Math.random() * 8 + 1);
    var enemy = {};
    _log('using player avatar #' + player);
    _log('Preparing the dragon...')

    var playersInfo = [{
      width: 128,
      height: 208
    }, {
      width: 128,
      height: 192
    }, {
      width: 128,
      height: 192
    }, {
      width: 128,
      height: 192
    }, {
      width: 192,
      height: 192
    }, {
      width: 128,
      height: 192
    }, {
      width: 128,
      height: 192
    }, {
      width: 128,
      height: 192
    }];

    App.prototype.update = function () {
      var newBodies = bodies.filter(window.collisionDetection.isColliding);

      app.game.bodies = newBodies;

/*
      for (var i = 0; i < bodies.length; i++) {
        // call all individual update functions
        bodies[i].update;
      }
*/
    }

    app.modules.Player.init(app.game,
      '/images/players/player_00' + player + '.png', {
        frames: 4,
        width: playersInfo[player - 1].width,
        height: playersInfo[player - 1].height
      });


  app.modules.Enemy.init(app.game,
    '/images/dragons/dragon.png', {
      frames: 10,
      width: (750 / 10),
      height: (560 / 8)

    });

};

  function updateEverythingThenDraw() {
    app.modules.Board.drawGrid();
    app.modules.Player.draw();
    app.modules.Enemy.draw();
    app.modules.Projectiles.draw();
    app.update();
    app.modules.Keyboard.listenKeyboard();
  }

  function animate() {
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      updateEverythingThenDraw();
    }
  }

  function ready() {
    window.removeEventListener('load', ready, false);

    // Create an instance of the app
    app = new App();

    // Make sure the game Object is empty before starting a new game
    app.game = {
      fps: fps
    };

    app.game.player = {};
    app.game.enemy = {};
    app.game.bodies = [];

    // Initialize modules
    app.modules.Overlays.init(app.el.overlays, app.game);

    // Start the welcome screen once the app is loaded
    app.modules.Overlays.startWelcome();
  }

  window.addEventListener('load', ready, false);
})();
