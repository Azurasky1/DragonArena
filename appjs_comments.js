/*
window.onkeydown = window.onkeyup = function(e) {
  keyState[e.keyCode] = e.type == 'keydown';
  if (keyState[38] && keyState[37]) {
    player.pos.x -= 2;
    player.pos.y -= 2;
  }
  else if (keyState[38] && keyState[39]) {
    player.pos.x += 2;
    player.pos.y += 2;
  }
  else if (keyState[40] && keyState [37]) {
    player.pos.x -= 2;
    player.pos.y -= 2;
  }
  else if(keyState[40] && keyState [39]) {
    player.pos.x += 2;
    player.pos.y -= 2;
  }
  else if (keyState[38]) {
    player.animation.y = 64;
    player.pos.y -= 2;
}
};
*/

/*

  function drawIt() {
    findDifference();
    updateValues();
    drawPlayer();
    requestAnimationFrame(drawIt);
  }

*/

// constructor for a key object
// has a pressed property, meant to be changed with the listener

/*
function key () {
  this.pressed = false;


}
*/

// takes two parameters: whichever axis the player will move when that button is pressed,
// and +/- depending on which direction the player is going

/*
key.prototype.move = function (axis, operator) {
  if (this.pressed === true) {
    player.pos.axis += (player.speed);
  }
}

*/

/*
var up = new key();
var down = new key();
var left = new key();
var right = new key();

var keys = [up, down, left, right]

*/
/*

function findFrameInterval(fps) {
  var timeBetween = 1000 / fps;
  var now = Date.now();
  var then = Date.now();
}

function app () {
  findFrameInterval();
  update();
  render();
}

*/


/*

function update() {
    console.log(keys[0]);
    if (up.pressed && left.pressed) {
      player.pos.x -= player.speed;
      player.pos.y -= player.speed;
    }

    else if (up.pressed && right.pressed) {
      player.pos.x += player.speed;
      player.pos.y -= player.speed;
    }

    else if (down.pressed && left.pressed) {
      player.pos.x -= player.speed;
      player.pos.y += player.speed;
    }

    else if (down.pressed && right.pressed) {
      player.pos.x += player.speed;
      player.pos.y += player.speed;
    }
    else if (up.pressed) {
      player.pos.y -= player.speed;
    }
    else if (down.pressed) {
      player.pos.y += player.speed;
    }
    else if (left.pressed) {
      player.pos.x -= player.speed;
    }
    else if (right.pressed) {
      player.pos.x += player.speed;
    }
    else {

    }

}

*/



/*

var buttons = [];
buttons[keys.up, keys.down, keys.left, keys.right];

for (var i in buttons) {
  if (buttons[i].pressed === true)
{}


}

*/
// pixels per second
/*
function updateValues() {
  switch (keyUp) {
  // var then = Date.now();
  case: 38
  player.speed = 100 * elapsed;
  player.pos.y = player.pos.y + player.speed;
  40
  37
  9

*/
/*  player.speed = 100 * elapsed;
  player.pos.y = player.pos.y + player.speed;
  }


}

*/

/*

  function findInterval (fps) {
  interval = 1000 / fps;
  var then = Date.now();


}

*/

/* function update () {
    if (onKeyDown) {
      move() {
          // switch statement?
          if (keyUp) {
            player.pos.x += 100;


          }

          if (down) {
            player.pos.x -= 100;


          }

      }


    }
  }



  }
*/

// keyboard listener
/*

global.onkeydown = function(e) {
  // shorthand if/else that accounts for whether the user is pressing a key on the keyboard or using a mouse button
  // pointless as of now aside from setting key = to keycode, add mouse functionality later
  var key = e.keyCode ? e.keyCode : e.which;
  var map = [up, down, left, right];
  map[e.keyCode] = e.type == 'keydown';
  // added a switch statement, removed if/else if statements
  switch (key) {

*/
    // key up and left

    /*

    case (map[38] && map[37]):
      up.move();
      left.move();
    break;
    // key up and right
    case (map[38] && map[39]):
      up.move();
      right.move();
    break;
    // key down and left
    case (map[40] && map[37]):
      down.move();
      left.move();
    break;
    // key down and right
    case (map[40] && map[39]):
      down.move();
      right.move();
    break;

    */

/*
    // key up
    case 38:
      checkSpritesheet(player.frame.current_frame, 65);
      up.pressed = true;
      update();
    break;
      // key down
    case 40:
      checkSpritesheet(player.frame.current_frame, 391);
      down.pressed = true;
      update();
    break;
    // key left
    case 37:
      checkSpritesheet(player.frame.current_frame, 260);
      left.pressed = true;
      update();
    break;
    // key right
    case 39:
      checkSpritesheet(player.frame.current_frame, 194);
      right.pressed = true;
      update();
    break;
    default:
      console.log("Key pressed: " + key.keyCode);
}
}
*/

/*
global.onkeyup = function (e) {
var key = e.keyCode ? e.keyCode : e.which;
switch(key) {
  case 38:
    up.pressed = false;
    break;
  case 40:
    dow%n.pressed = false;
    break;
  case 37:
    left.pressed = false;
    break;
case 39:
  right.pressed = false;
  break;
  default: 'default'
}
}
*/

//  function gameLoop() {
    // Board
    // csv is the 2d drawing context
    // game.js outputs a $GAME object with an attached drawBoard method, takes 2d drawing context as a parameter
  //  $GAME.drawBoard(csv);

    // Player
    // same as above, except takes a player object as well that has properties specifying width and height and other spritesheet information
    // $GAME.drawPlayer(csv, player);
    // player = $GAME.nextFrame(player);
  // }

// start time
  // game loop is run. the board is drawn, the player is drawn, then the player's next frame value is assigned
  // the animation loop runs until 0 is equal to 5
  // frameCounter goes back to 0
  // the next frame is then drawn again, alongside the entire Board
  // the way it is now, the canvas won't clear if we redraw the player

// one direction of movement is equal to 9 frames
  /*
  function animationLoop() {
      requestAnimFrame(animationLoop);

      now = Date.now();
      delta = now - then;

      if (delta > interval) {
        then = now - ((delta % interval));
        update();
        $GAME.drawBoard(csv);
        $GAME.drawPlayer(csv, player);
        player = $GAME.nextFrame(player);
      }
  }

  */
    // the amount of time between each frame is 1000 / 60 or 16.6666666666...7
/*
    if ( frameCounter < frameRate) {
      // then = now - (elapsed % 1000/60)
      // (1000 / 5) is the interval between frames
      frameCounter++;
      requestAnimFrame(animationLoop);
      // var now = Date.now();
      // var elapsed = now - then;
      return;
    }

    frameCounter = 0;
*/
// the game is updated once every 5 frames
// 45 frames per second?
/*
    update();
    $GAME.drawBoard(csv);
    $GAME.drawPlayer(csv, player);
    player = $GAME.nextFrame(player);

}
    requestAnimFrame(animationLoop);
  }
*/
