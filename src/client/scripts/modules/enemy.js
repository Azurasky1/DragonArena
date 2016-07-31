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
  var module = {};

  // Public scope

  function Enemy() {
    this.degradationTime = 120;
  }

  Enemy.prototype.draw = function () {
    _game.cv.drawImage(
      _game.enemy.avatar,
      _game.enemy.frame.width * _game.enemy.frame.current,
      _game.enemy.frame.direction * _game.enemy.frame.height,
      _game.enemy.frame.width, _game.enemy.frame.height,
       // centered on canvass
      _game.enemy.pos.x, _game.enemy.pos.y,
      // image size to draw
      _game.enemy.frame.width * _game.scaleFactor,
      _game.enemy.frame.height * _game.scaleFactor
    );

    this.drawHealth();

  }

  Enemy.prototype.nextFrame = function() {

    var dir = this.frame.direction;

    switch (dir) {
      case 0:
        this.pos.y += 3;
        break;
      case 1:
        this.pos.x -= 3;
        break;
      case 2:
        this.pos.x += 3;
        break;
      case 3:
        this.pos.y -= 3;
        break;
      default:
    }

    if (this.frame.current < this.frame.total - 1) {
      this.enemy.frame.current += 1;
    } else {
      this.enemy.frame.current = 0;
    }
  };

  Enemy.prototype.drawHealth = function() {
    // no need for a formula so needlessly complex
    // _game.enemy.health -= (1 / _game.fps) / (this.degradationTime / 100);

    // position of health bar
    this.health = {
      x: (this.pos.x + this.frame.width / 2 - 25) *
            _game.scaleFactor,
      y: this.pos.y - 12 * _game.scaleFactor
    };

    _game.cv.fillStyle = '#666';
    _game.cv.fillRect(_health.x - 1,
                      _health.y - 1,
                      50 * _game.scaleFactor + 2,
                      6 * _game.scaleFactor + 2);

    _game.cv.fillStyle = _game.player.color;
    _game.cv.fillRect(_health.x,
                      _health.y,
                      50 * _game.player.health / 100 * _game.scaleFactor,
                      6 * _game.scaleFactor);
  };

  Enemy.prototype.init = function(game, image, enemyInfo) {
    _game = game;
    console.log(_game);

    _game.enemy.avatar = new Image();
    _game.enemy.avatar.src = image;
    console.log(_game.enemy.avatar.src);

  _game.enemy.pos = {
      x: Math.floor((Math.random() * 600) + 100) * _game.scaleFactor,
      y: Math.floor((Math.random() * 400) + 100) * _game.scaleFactor
    };

    _game.enemy.animation = {
      x: 0,
      y: 0
    };

  _game.enemy.frame = {
      current: 0,
      direction: Math.floor((Math.random() * 3)),
      total: enemyInfo.frames,
      width: (enemyInfo.width / enemyInfo.frames),
      height: (enemyInfo.height / enemyInfo.frames)
    };

    _game.enemy.health = {
      total: 100,
      current: 100,
      percent: 100
    };

    _game.enemy.speed = .05;
    _game.enemy.avatar = null;
    _game.bodies.push(_game.enemy);

  }

  modules.Enemy = new Enemy();
  window.$modules = modules;
})(window.$modules || {});
