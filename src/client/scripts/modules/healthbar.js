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
 * Module name: Healthbar
 * Description:
 */
(function(modules) {
  'use strict';

  function Healthbar(width, height, hex, anyPlayerOrEnemy) {
    this.width = width;
    this.height = height;
    this.color = hex;
    this.pos = {
      x: anyPlayerOrEnemy.pos.x,
      y: anyPlayerOrEnemy.pos.y - 20
    };
  }

  modules.Healthbar = new Healthbar();
  window.$modules = modules;
})(window.$modules || {});
