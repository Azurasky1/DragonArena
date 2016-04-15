(function(global) {
  'use strict';

  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');

  var frameRate = 10;
  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;

  var player = {
    pos: {
      x: 0,
      y: 0
    },

    avatar: 'images/players/001.png'
  };

  var avatar = new Image();
  avatar.src = player.avatar;

  // shim layer with setTimeout fallback
  global.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function ( callback ) {
        window.setTimeout( callback, 1000 / 60 );
      };
  })();

  global.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 38) {
      // key up

    } else if (key == 40) {
      // key down

    } else if (key == 37) {
      // key left

    } else if (key == 39) {
      // key right

    }
  }

  function gameLoop() {
    // Borad
    $BOARD.drawBoard(csv, screenWidth, screenHeight);

    // Player
    $PLAYER.drawPlayer(csv, avatar);
  }

  function animationLoop() {
    gameLoop();
    requestAnimFrame(animationLoop);
  }

  function startGame() {
    // set the canvas to the full page size
    c.width = screenWidth;
    c.height = screenHeight;

    // start the animation loop
    animationLoop();
  }

  startGame();
})(window);
