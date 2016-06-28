(function(global, document) {
  'use strict';

  var app;

  function App() {
    // app core function
    this.elements = {};
    this.elements.overlays = document.querySelector('.overlays');
    this.elements.welcome = document.querySelector('.overlays__welcome');
    this.elements.store = document.querySelector('.overlays__store');

    console.log('App ready');
  }

  function ready() {
    app = new App();
  }

  window.addEventListener('load', ready, false);
  // App.prototype.defineElements = function() {};
})(typeof window === 'undefined' ? global : window, document);
