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
 * Module name: enemy
 * Description:
 */
(function(modules) {
  'use strict';

  // Private scope

  var _game;

  // Public scope

  function Enemy(game, totalHealth, currentHealth) {
    _game = game;

    this.health = {
      total: totalHealth,
      current: currentHealth,
      percent: (currentHealth / totalHealth) * 100
    };

    this.animation = {
      x: 0,
      y: 0
    };

    this.direction = {
      facing: '',
      north: 0,
      south: 0,
      east: 0,
      west: 0,
      northEast: 0,
      northWest: 0,
      southEast: 0,
      southWest: 0
    };

    this.pos = {
      x: _game.board.width / 2 - ((500 / 9) / 2),
      y: _game.board.height / 2 - ((519 / 8) / 2)
    };

    this.speed = .05;
    this.avatar = null;
  }

  modules.Enemy = new Enemy();
  window.$modules = modules;
})(window.$modules || {});
