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
 * Module name: Projectiles
 * Description:
 */
(function(modules) {
  'use strict';

  // Public scope

  function Projectile(cv, x, y, width, height, direction, speed) {
    this.cv = cv;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.speed = speed;
  }

  Projectile.prototype.draw = function() {
    this.x += this.speed;
    this.cv.fillStyle = '#000';
    this.cv.fillRect(this.x + this.width / 2,
                     this.y + this.height / 2,
                     8,
                     3);
  };

  // Public scope

  /*
   * Projectile factory
   */
  modules.Projectiles = (function() {
    return {
      projectiles: [],
      new: function(cv, x, y, width, height, direction, speed) {
        this.projectiles.push(
          new Projectile(cv, x, y, width, height, direction, speed));
      },

      getActive: function() {
        return this.projectiles.length;
      },

      draw: function() {
        for (var i = 0; i < this.projectiles.length; i++) {
          this.projectiles[i].draw();
        }
      }
    };
  })();

  window.$modules = modules;
})(window.$modules || {});
