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
(function(global, document, _log) {
  'use strict';

  var modules = global.$modules || {};
  modules.Overlays = {};

  var module = modules.Overlays;
  var playerName = document.querySelector('.overlays__welcome .playername');
  var overlay;

  // Private scope

  function Overlays(overlays, welcome) {
    this.overlays = overlays;
    this.welcome = welcome;
  }

  // Public scope

  function show() {
    setTimeout(function() {
      overlay.overlays.classList.add('visible');
      overlay.welcome.classList.add('visible');
    }, 500);
  }

  function startGame() {
    overlay.overlays.classList.remove('visible');
    overlay.welcome.classList.remove('visible');
  }

  function registerPlayer() {
    var name;
    name = playerName.value;

    return name ? name : false;
  }

  function init(overlays, welcome) {
    overlay = new Overlays(overlays, welcome);
  }

  module.init = init;
  module.show = show;
  module.registerPlayer = registerPlayer;
  module.startGame = startGame;

  global.$modules = modules;

  _log('Overlays ready');
})(typeof window === 'undefined' ? global : window, document, _log);
