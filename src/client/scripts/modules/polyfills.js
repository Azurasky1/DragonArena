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
 * Module name: Polyfills
 * Description: A wrapper for all the polyfills required for the app to
 *              properly being supported by all the digfferent browsers.
 */
(function() {
  'use strict';

  /**
   * requestAnimationFrame polyfill by Erik Möller
   * fixes from Paul Irish and Tino Zijdel
   *
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   */
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                            window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  // textContent for IE8
  if (Object.defineProperty &&
    Object.getOwnPropertyDescriptor &&
    Object.getOwnPropertyDescriptor(Element.prototype, 'textContent') &&
    !Object.getOwnPropertyDescriptor(Element.prototype, 'textContent').get) {
    (function() {
      var innerText = Object
        .getOwnPropertyDescriptor(Element.prototype, 'innerText');

      Object.defineProperty(Element.prototype, 'textContent', {
        get: function() {
          return innerText.get.call(this);
        },
        set: function(s) {
          return innerText.set.call(this, s);
        }
      });
    })();
  }
})();
