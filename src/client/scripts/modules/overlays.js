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
 * Module name: Overlays
 * Description: Overlays elements like the welcome screen and the store
 *              are served by this module
 */
(function(modules) {
  'use strict';

  // Private scope

  var _game;
  var keyPressListener;
  var keyUpListener;

  // Public scope

  function Overlays() {
    this.el = {};
  }

  Overlays.prototype.startGame = function() {
    var event = new Event('start');

    this.element.classList.remove('visible');
    this.el.welcome.classList.remove('visible');

    this.element.dispatchEvent(event);
  };

  Overlays.prototype.validateGame = function(e) {
    this.onInputChange();

    // validate the field also if the Return key is pressed
    if (e && e.keyCode && e.keyCode !== 13) {
      return;
    }

    if (!!_game.player.name) {
      this.el.playerName.removeEventListener('keyup', keyUpListener, false);
      this.element.removeEventListener('keypress', keyPressListener, false);
      this.el.startGame.removeEventListener('click', keyPressListener, false);

      this.startGame();
    }
  };

  Overlays.prototype.startWelcome = function() {
    var self = this;

    setTimeout(function() {
      self.element.classList.add('visible');
      self.el.welcome.classList.add('visible');
    }, 750);
  };

  Overlays.prototype.registerPlayer = function() {
    var name = this.el.playerName.value;

    return name ? name : null;
  };

  Overlays.prototype.onInputChange = function() {
    _game.player.name = this.registerPlayer();

    if (!_game.player.name) {
      this.el.startGameError.classList.add('active');
    } else {
      this.el.startGameError.classList.remove('active');
    }
  };

  Overlays.prototype.init = function(element, game) {
    var self = this;

    self.element = element;
    _game = game;

    _game.player = {};

    // define elements in the DOM
    self.el.welcome = self.element.querySelector('.overlays__welcome');
    self.el.store = self.element.querySelector('.overlays__store');
    self.el.playerName = self.element.querySelector('.playername');
    self.el.startGame = self.element.querySelector('.start__game');
    self.el.startGameError = self.element
        .querySelector('.input__element__message--error');

    keyPressListener = self.validateGame.bind(self);
    keyUpListener = self.onInputChange.bind(self);

    // event listeners
    self.el.playerName.addEventListener('keyup', keyUpListener, false);
    self.element.addEventListener('keypress', keyPressListener, false);
    self.el.startGame.addEventListener('click', keyPressListener, false);

    _log('Overlays ready');
  };

  modules.Overlays = new Overlays();
  window.$modules = modules;
})(window.$modules || {});
