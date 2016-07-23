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

  // Private scope

  function Projectile(cv, x, y, width, height, direction) {
    this.cv = cv;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
  }

  Projectile.prototype.draw = function() {
    // this.cv.clearRect(this.x, this.y,
                //  50, 10);
    this.cv.fillStyle = '#000';
    this.cv.fillRect(this.x, this.y,
                     15, 5);
  };

  // Public scope

  /*
   * Projectile factory
   */
  modules.Projectiles = (function() {
    return {
      projectiles: [],
      new: function(cv, x, y, width, height, direction) {
        this.projectiles.push(
          new Projectile(cv, x, y, width, height, direction));
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
