/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
 *
 * Module name: Board
 * Description: Prepare the game setting the global scaleFactor according to
 *              the user's display size and draw the board on the screen
*/
(function(modules) {
  'use strict';

  // Private scope

  var _game;
  var _canvas;
  var _cv;
  var event = new Event('board_ready');
  var screenHeight;
  var screenWidth;
  var boardHeight;
  var boardWidth;
  var cellSize = 31;
  var lineWidth = 0.5;
  var gridColor = '#AAA';
  var background = '#EEE';
  var padding = 10;

  // Public scope

  function Board() {}

  /**
   * Draw the board on the screen
   */
  Board.prototype.drawGrid = function() {
    var x;
    var cell;

    cell = cellSize * _game.scaleFactor;

    _cv.clearRect(0, 0, boardWidth, boardHeight);
    _cv.fillStyle = background;
    _cv.fillRect(0, 0, boardWidth, boardHeight);

    _cv.beginPath();

    for (x = lineWidth; x <= screenWidth; x += cell) {
      _cv.moveTo(x - padding, lineWidth);
      _cv.lineTo(x - padding, boardHeight);
    }

    for (x = lineWidth; x <= boardHeight; x += cell) {
      _cv.moveTo(lineWidth, x - padding);
      _cv.lineTo(screenWidth, x - padding);
    }

    _cv.strokeStyle = gridColor;
    _cv.stroke();
  };

  /**
   * Prepare the board according to the current screen size
   */
  Board.prototype.updateBoard = function() {
    /**
     * The maximum board size, in pixels
     *
     * @type {Object}
     */
    var maxSize = {
      width: 800,
      height: 600
    };

    /**
     * THe scaleFactor will be defined according to the current
     * screen size
     *
     * @type {Number}
     */
    _game.scaleFactor = 1;

    screenHeight = document.body.offsetHeight;
    screenWidth = document.body.offsetWidth;

    if (maxSize.height > screenHeight) {
      _game.scaleFactor = screenHeight / maxSize.height;
    }

    if (maxSize.width > screenWidth) {
      var scaleFactor = screenWidth / maxSize.width;
      if (scaleFactor < _game.scaleFactor) {
        _game.scaleFactor = scaleFactor;
      }
    }

    if (_game.scaleFactor === 1) {
      _canvas.classList.add('canvas--big');
    } else {
      _canvas.classList.remove('canvas--big');
    }

    boardHeight = _game.scaleFactor * maxSize.height;
    boardWidth = _game.scaleFactor * maxSize.width;

    _log('boardHeight: ' + boardHeight);
    _log('boardWidth: ' + boardWidth);

    // set the canvas size
    _canvas.width = boardWidth;
    _canvas.height = boardHeight;

    _game.board = {
      width: boardWidth,
      height: boardHeight
    };

    this.drawGrid();

    // DIspatch an event to the app as the board is ready
    document.dispatchEvent(event);
  };

  /**
   * Initialize the board
   *
   * @param  {Object} game    The game object from the App
   * @param  {Object} canvas  The canvas DOM element
   */
  Board.prototype.init = function(game, canvas) {
    _game = game;
    _canvas = canvas;
    _cv = canvas.getContext('2d');
    _game.cv = _cv;

    this.updateBoard();
  };

  modules.Board = new Board();
  window.$modules = modules;
})(window.$modules || {});
