(function(global) {
  'use strict';

  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');

  var frameRate = 5;
  var frameCounter = 0;

  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;

  var player = {
    pos: {
      x: 0,
      y: 0
    },

    animation: {
      x: 0,
      y: 0
    },

    frame: {
      width: 56,
      height: 64,
      frames: 9,
      current_frame: 0
    },

    avatar: new Image(),
    avatar_src: 'images/players/001.png'
  };

  // shim layer with setTimeout fallback
  global.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function ( callback ) {
        window.setTimeout( callback, 1000 / 60 );
      };
  })();

  // keyboard listener
  global.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 38) {
      // key up
      player.animation.x = 0;
      player.animation.y = 65;
    } else if (key == 40) {
      // key down
      player.animation.x = 0;
      player.animation.y = 391;
    } else if (key == 37) {
      // key left
      player.animation.x = 0;
      player.animation.y = 260;
    } else if (key == 39) {
      // key right
      player.animation.x = 0;
      player.animation.y = 194;
    }
  }

  function gameLoop() {
    // Borad
    $GAME.drawBoard(csv);

    // Player
    $GAME.drawPlayer(csv, player);
    player = $GAME.nextFrame(player);
  }

  function animationLoop() {
    if ( frameCounter < frameRate ) {
      frameCounter++;
      requestAnimFrame(animationLoop);
      return;
    }

    frameCounter = 0;

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
