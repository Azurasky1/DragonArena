(function(global) {
  'use strict';

  /**
   * [game description]
   */
  function Game() {
    var self = this;

    // private scope
    var _board = {
      background: '#FAFAFA'
    };

    // public scope

    /**
     * [drawPlayer description]
     *
     * @param  {Object} game  [description]
     */
    function drawPlayer(game) {
      // taken from (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
      game.csv.drawImage(game.player.avatar,
                      game.player.frame.width * game.player.frame.currentFrame,
                      game.player.animation.y,
                      game.player.frame.width, game.player.frame.height, // clip size
                      game.player.pos.x, game.player.pos.y, // centered on canvas
                      game.player.frame.scaleWidth, game.player.frame.scaleHeight // image size to draw
                    );
    }

    /**
     * [nextFrame description]
     *
     * @param  {Object} el [description]
     */
    function nextFrame(el) {
      if (el.frame.currentFrame < el.frame.frames - 1) {
        el.frame.currentFrame += 1;
      } else {
        el.frame.currentFrame = 0;
      }
    }

    /**
     * [drawBoard description]
     *
     * @param  {Object} game [description]
     */
    function drawBoard(game) {
      // added clearRect so that we don't keep drawing over the canvas
      game.csv.clearRect(0, 0,
                        game.screenSize.screenWidth,
                        game.screenSize.screenHeight);
      game.csv.fillStyle = _board.background;
      game.csv.fillRect(0, 0,
                        game.screenSize.screenWidth,
                        game.screenSize.screenHeight);
    }

    self.drawPlayer = drawPlayer;
    self.drawBoard = drawBoard;
    self.nextFrame = nextFrame;
  }

  // expose $PLAYER on the global scope
  global.$GAME = new Game();
})(typeof window === 'undefined' ? global : window);
