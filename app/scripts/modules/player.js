/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
 *
 * Module name: Overlays
 * Description: Overlays elements like the welcome screen and the store
 *              are served by this module
*/
(function(modules) {
  'use strict';

  // Private scope

  var _game;

  // Public scope

  function Player() {}

  Player.prototype.init = function(game, playerName) {
    _game = game;
    _game.player.name = playerName;
    _game.player.avatar = new Image();
    _game.player.avatar.src = '/images/players/001.png';

    _game.player.avatar.onload = function() {
      var event = new Event('player_ready');

      _log('Player ready');
      document.dispatchEvent(event);
    };
  };

  modules.Player = new Player();
  window.$modules = modules;
})(window.$modules || {});
