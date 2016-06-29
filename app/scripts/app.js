/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
*/
(function(global, document) {
  'use strict';

  global.app = null;

  // app core function
  function App() {
    this.elements = {};
    this.modules = {};
    this.elements.overlays = document.querySelector('.overlays');
    this.elements.welcome = document.querySelector('.overlays__welcome');
    this.elements.store = document.querySelector('.overlays__store');

    $log('App ready!')

    // Start the welcome screen once the app is loaded
    // $OVERLAYS.startWelcome();
  }

  function ready() {
    // Expose the app module to the global object
    global.app = new App();
  }

  window.addEventListener('load', ready, false);
})(typeof window === 'undefined' ? global : window, document);
