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
 * Module name: collisionDetection
 * Description:
 */
(function(modules) {
  'use strict';

var _game;
var module = {};

  module.collisionDetection = function(body1, body2) {
    return ((body1 === body2) ||
    (body1.pos.x + body1.frame.width < body2.pos.x) ||
    (body1.pos.x > body2.pos.x + body2.width) ||
    (body1.pos.y > body2.pos.y + body2.height) ||
    (body1.pos.y + body1.frame.height < body2.pos.y));
  };

  module.isNotColliding = function(b1) {
    return this.bodies.filter(function(b2) {
      collisionDetection(b1, b2);
    }.length === 0);
    console.log('body 1:' + b1 + "body 2" + b2);
  };


/*
  module.isColliding = function() {
    for (var i = 0; i < bodies.length; i++) {
      if (bodies[i] instanceof Projectile) {
        if (collisionDetection(player, bodies[i]) === false)  {
          player.health.percent -= 1;
          console.log('collision!');
          drawHitBox('red');
          console.log(player.health.percent);
          console.log(playerHealth.width);
        }
      }
    }
  };
*/


  modules.collisionDetection = module;
  window.$modules = modules;
})(window.$modules || {});
