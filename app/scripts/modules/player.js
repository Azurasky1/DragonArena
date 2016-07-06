/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
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

  function Player() {}

  Player.prototype.draw = function() {
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
  };

  Player.prototype.nextFrame = function() {
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
    _game = game;
    _game.player.avatar = new Image();
    _game.player.avatar.src = avatar;

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
    _log(_game.player.frame.direction);

    _game.player.avatar.onload = function() {
      _log('Player ready');
      document.dispatchEvent(event);
    };
  };

  modules.Player = new Player();
  window.$modules = modules;
})(window.$modules || {});
