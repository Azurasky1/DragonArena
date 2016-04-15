(function(global) {
  var _board = {
    background: '#666'
  };

  function drawBoard(canvas, width, height) {
    // board.screenHeight = document.body.offsetHeight;
    // board.screenWidth  = document.body.offsetWidth;
    //
    // csv.width  = board.screenWidth;
    // csv.height = board.screenHeight;
    canvas.fillStyle = _board.background;
    canvas.fillRect( 0, 0, width, height);
  }

  global.$BOARD = {
    drawBoard: drawBoard
  };
})(window);
