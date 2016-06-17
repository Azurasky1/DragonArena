(function(global) {
  'use strict';

  var screenWidth = document.body.offsetWidth;
  var screenHeight = document.body.offsetHeight;

  /**
   * [game description]
   */
  function Game() {
    // private scope
    var _board = {
      background: '#FAFAFA'
    };

    // public scope
    var gameModule = {};

    /**
     * [drawPlayer description]
     *
     * @param  {Object} graph  [description]
     * @param  {Object} player [description]
     */
    function drawPlayer(graph, player) {
      // taken from (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
      graph.drawImage(
        player.avatar,
        player.frame.width * player.frame.currentFrame,
        player.animation.y,
        player.frame.width, player.frame.height, // clip size -S
        player.pos.x, player.pos.y, // centered on canvas
        player.frame.width, player.frame.height // image size to draw
      );
    }

    /**
     * [nextFrame description]
     *
     * @param  {Object} el [description]
     *
     * @return {Object}    [description]
     */
    function nextFrame(el) {
      if (el.frame.currentFrame < el.frame.frames - 1) {
        el.frame.currentFrame += 1;

        return;
      }

      el.frame.currentFrame = 0;

      return el;
    }

    /**
     * [drawBoard description]
     *
     * @param  {Object} canvas [description]
     */
    function drawBoard(canvas) {
      // added clearRect so that we don't keep drawing over the canvas
      canvas.clearRect(0, 0, canvas.width, canvas.height);
      canvas.fillStyle = _board.background;
      canvas.fillRect(0, 0, screenWidth, screenHeight);
    }

    gameModule.drawPlayer = drawPlayer;
    gameModule.drawBoard = drawBoard;
    gameModule.nextFrame = nextFrame;
  }

  // expose $PLAYER on the global scope
  global.$GAME = new Game();
})(typeof window === 'undefined' ? global : window);
