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
 * Module name: Player
 * Description: Create and draw the players on the board
 */
(function(modules) {
  'use strict';

  // Private scope

  var _game;
  var event = new Event('player_ready');

  // Public scope

  function Player() {
    // The time in seconds for a player to naturally loose all his/her health
    this.degradationTime = 300;
  }

  Player.prototype.draw = function() {
    if (_game.player.health <= 0) {
      return;
    }

    _game.player.health -= (1 / _game.fps) / (this.degradationTime / 100);

    _game.cv.drawImage(
      _game.player.avatar,
      _game.player.frame.width * _game.player.frame.current,
      _game.player.frame.direction * _game.player.frame.height,
      _game.player.frame.width, _game.player.frame.height,
       // centered on canvass
      _game.player.pos.x, _game.player.pos.y,
      // image size to draw
      _game.player.frame.width * _game.scaleFactor,
      _game.player.frame.height * _game.scaleFactor
    );

    _game.cv.fillStyle = '#666';
    _game.cv.fillRect(_game.player.pos.x - (9 * _game.scaleFactor) - 1,
                      _game.player.pos.y - (13 * _game.scaleFactor) - 1,
                      (50 * _game.scaleFactor) + 2,
                      (6 * _game.scaleFactor) + 2);

    _game.cv.fillStyle = _game.player.color;

    _game.cv.fillRect((_game.player.pos.x) - (9 * _game.scaleFactor),
                      _game.player.pos.y - (13 * _game.scaleFactor),
                      _game.player.frame.width * (_game.player.health / 100) *
                        _game.scaleFactor * 1.6,
                      6 * _game.scaleFactor);

    if (_game.player.animate === 'walk') {
      this.nextFrame();
    }
  };

  Player.prototype.nextFrame = function() {
    if (_game.player.tick > 0) {
      _game.player.tick -= 1;
      return;
    }

    _game.player.tick = _game.player.ticks;

    if (_game.player.frame.current < _game.player.frame.total - 1) {
      _game.player.frame.current += 1;
    } else {
      _game.player.frame.current = 0;
    }
  };

  /**
   * Initialize the player
   *
   * @param  {Object} game        The game abject from the App
   * @param  {String} avatar      The source path to the player avatar
   * @param  {Object} playerInfo  The avatar info:
   *                                frames: number of frames per animation
   *                                width:  canvas width
   *                                height: canvas height
   */
  Player.prototype.init = function(game, avatar, playerInfo) {
    var colVariation = Math.floor(Math.random() * 9);
    var keys = Object.keys(modules.Utils.colors());

    _game = game;

    _game.player.health = 100;
    _game.player.avatar = new Image();
    _game.player.avatar.src = avatar;
    _game.player.ticks = 2;
    _game.player.tick = this.ticks;

    // Pick a random color to assign to the player
    _game.player.color = modules.Utils.colors()[
        keys[keys.length * Math.random() << 0]
      ][
        colVariation
      ];

    // place the player in a random place
    _game.player.pos = {
      x: Math.floor((Math.random() * 600) + 100) * _game.scaleFactor,
      y: Math.floor((Math.random() * 400) + 100) * _game.scaleFactor
    };

    _game.player.animation = {
      x: 0,
      y: 0
    };

    _game.player.frame = {
      current: 0,
      direction: Math.floor((Math.random() * 3)),
      total: playerInfo.frames,
      width: (playerInfo.width / playerInfo.frames),
      height: (playerInfo.height / playerInfo.frames)
    };

    _game.player.avatar.onload = function() {
      _log('Player ready');
      document.dispatchEvent(event);
    };
  };

  modules.Player = new Player();
  window.$modules = modules;
})(window.$modules || {});
