/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
 *
 * Module name: Keyboard
 * Description: Manage all the user's keyboard interaction
*/
(function(modules) {
  'use strict';

  // Private scope

  var _game;
  var _key;

  // Public scope

  function Keyboard() {
    this.KEY_UP = 38;
    this.KEY_DOWN = 40;
    this.KEY_LEFT = 37;
    this.KEY_RIGHT = 39;
    this.KEY_SPACE = 32;
    this.KEY_ENTER = 13;
  }

  Keyboard.prototype.keyUp = function(e) {
  };

  Keyboard.prototype.keyDwn = function(e) {
    _key = e.keyCode || e.which;

    switch (_key) {
      case this.KEY_DOWN:
        _game.player.frame.direction = 0;
        break;
      case this.KEY_LEFT:
        _game.player.frame.direction = 1;
        break;
      case this.KEY_RIGHT:
        _game.player.frame.direction = 2;
        break;
      case this.KEY_UP:
        _game.player.frame.direction = 3;
        break;
      case this.KEY_ENTER:
        e.preventDefault();
        break;
      default:
    }
  };

  /**
   * Initialize the keyboard
   *
   * @param  {Object} game        The game abject from the App
   */
  Keyboard.prototype.init = function(game) {
    var self = this;
    _game = game;

    window.addEventListener('keydown', self.keyDwn.bind(self), false);

    window.addEventListener('keyup', self.keyUp.bind(self), false);
  };

  modules.Keyboard = new Keyboard();
  window.$modules = modules;
})(window.$modules || {});
