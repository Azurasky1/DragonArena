(function(global) {
  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;

  function drawPlayer(graph, avatar) {
    graph.drawImage(
      avatar,
      0, 0, 55, 64, // clip size
      screenWidth/2 - 40, screenHeight/2 - 40, // where on canvas
      80, 80 // image size to draw
    );
  };

  global.$PLAYER = {
    drawPlayer: drawPlayer
  };
})(window);
