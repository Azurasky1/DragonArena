(function (global, undefined) {
  var screenWidth = document.body.offsetWidth;
  var screenHeight = document.body.offsetHeight;
  function game() {
    // private scope
    var _board = {
      background: '#FAFAFA',
    };

    // public scope
    var gameModule = {};

    function drawPlayer(graph, player) {
      // taken from (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
      graph.drawImage(
        player.avatar,
        player.frame.width * player.frame.current_frame,
        player.animation.y,
        player.frame.width, player.frame.height, // clip size -S
        player.pos.x, player.pos.y, // centered on canvas
        player.frame.width, player.frame.height // image size to draw
      );
    }

    function nextFrame(el) {
      if (el.frame.current_frame < el.frame.frames - 1) {
        el.frame.current_frame += 1;
      } else
        el.frame.current_frame = 0;
      return el;
    }

    function drawBoard(canvas) {
      // added clearRect so that we don't keep drawing over the canvas
      canvas.clearRect(0, 0, canvas.width, canvas.height);
      canvas.fillStyle = _board.background;
      canvas.fillRect(0, 0, screenWidth, screenHeight);
    }

    gameModule.drawPlayer = drawPlayer;
    gameModule.drawBoard = drawBoard;
    gameModule.nextFrame = nextFrame;

    return gameModule;
  };

  // expose $PLAYER on the global scope
  global.$GAME = game();

})(typeof window !== 'undefined' ? window : global);
