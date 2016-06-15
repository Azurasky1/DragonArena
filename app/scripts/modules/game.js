/*
Comments marked with -B are written by Bill to help better understand the code or ask questions for later

// Notable concepts in this code: a "shim" addressed towards the bottom, if/else shorthand, checking for keyboard presses in user input logic
// document.body.offsetWidth and document.body.offsetHeight
// Note: Unlike a typical (x, y) axis, when using a method attached to the 2d context object, the y value of the top of the canvas will start at zero.
*/
(function(global, undefined) {
  var screenWidth = document.body.offsetWidth;
  var screenHeight = document.body.offsetHeight;

  function game() {
    // private scope
    var _board = {
      background: '#FAFAFA'
    };

    // gameModule is an object, the functions in this file are assigned to this object as methods to be used in the rest of the program
    // public scope
    var gameModule = {};

    function drawPlayer(graph, player) {
      player.avatar.src = player.avatarSrc;

      // taken from (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
      // this function takes eight parameters. (image, sx, sy, swidth, sHeight, dx, dy, dWidth, dHeight)
      graph.drawImage(
        // first parameter is equal to the avatar property of the player object found in app.js, with the source property set above. -B
        player.avatar,
        // first frame taken from (0,0 on spritesheet)
        // next frame taken starts at (frame.width) because current_frame increments by 1 because of global.onkeydown()
        player.frame.width * player.frame.current_frame,
        // y will change only if the user changes direction, x will change as a result of the animation -B
        player.animation.y,
        // size of the image -B
        player.frame.width, player.frame.height, // clip size -S
        // dx & dy, d meaning destination canvas -B
        // start position on destination canvas -B
        player.pos.x, player.pos.y,
        // centered on canvas
        player.frame.width, player.frame.height // image size to draw
      );
    }

    function nextFrame(el) {
      // very good practice starting at frame 0
      // once current_frame reaches 8 (totaling 9 frames) it resets to 0. -B
      if (el.frame.current_frame < el.frame.frames - 1) {
        el.frame.current_frame += 1;
      } else {
        el.frame.current_frame = 0;
      }
      // returns the same object (player, or whatever other object we use) with an updated current_frame property -B
      return el;
    }

    function drawBoard(canvas) {
      // just fills the canvas with the background color of _board.background -B
      canvas.fillStyle = _board.background;
      // the canvas background starts at the top-left of the canvas, and spans the entire screen width and height, set at the beginning of the IIFE -B
      canvas.fillRect(0, 0, screenWidth, screenHeight);
    }

    gameModule.drawPlayer = drawPlayer;
    gameModule.drawBoard = drawBoard;
    gameModule.nextFrame = nextFrame;

    // gameModule object is returned as a result of the game function -B
    return gameModule;
  };

  // this is the only line of code that is run in the IIFE execution context -B
  // all of the functions assigned to the gameModule object are now made available to the rest of the program using the $GAME object -B
  // expose $PLAYER on the global scope
  global.$GAME = game();

// checks to see if the window object is undefined, if not uses the window (global) object as the first parameter -B
// if it is undefined then it uses its own "global" object, with all of the methods attached to it -B
// since all major browsers support the window object, could this be for implementing support on mobile? -B
// also, what is the undefined parameter for in the IIFE? -B
})(typeof window !== 'undefined' ? window : global);
