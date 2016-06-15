(function(global) {
  'use strict';

  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');
  var keyState = {};
  var keysdown = {};
  var fps = 15;
  var interval = 1000/fps;
  var then;
  var delta;
  var player;

  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;

  function checkSpritesheet(frameNow, y) {
    if ((frameNow > 0) && player.animation.y !== y) {
      var new_frame = 0;
      player.frame.currentFrame = new_frame;
      player.animation.y = y;
    } else if (frameNow === 0 && player.animation.y !== y) {
      player.animation.y = y;
    }
  }

  function keyDown(evt) {
     keysdown[evt.which] = true;

    if (keysdown[38] && keysdown["37"]) {
      console.log('up & left');
      player.pos.x -= 4;
      player.pos.y -= 4;
      player.animation.y = 0;
    } else if (keysdown[38] && keysdown[39]) {
      console.log('up & right');
      player.pos.x += 4;
      player.pos.y -= 4;
      player.animation.y = 130;
    } else if (keysdown[40] && keysdown[37]) {
      console.log('down and left');
      player.pos.x -= 4;
      player.pos.y += 4;
      player.animation.y = 327;
    } else if (keysdown[40] && keysdown[39]) {
      console.log('down and right');
      player.pos.x += 4;
      player.pos.y += 4;
      player.animation.y = 454;
    } else if (keysdown[38] === true) {
      console.log('up');
      player.animation.y = 64;
      player.pos.y -= 4;
      player.animation.y = 65;
    }
    else if (keysdown[40] === true) {
      console.log('down');
      player.pos.y += 4;
      player.animation.y = 391;
    }
    else if (keysdown[37] === true) {
      console.log('left');
      player.pos.x -= 4;
      player.animation.y = 260;
    }
    else if (keysdown[39] === true) {
      console.log('right');
      player.pos.x += 4;
      player.animation.y = 194;
    }
  }

  function keyUp(evt) {
    keysdown[evt.which] = false;
  }

  function Keyboarder() {
    this.isDown = function(keyCode) {
      return keyState[keyCode] === true;
    };

    this.KEYS = {
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32
    };
  }

  function Player() {
    this.keyboarder = new Keyboarder();
    this.animation = {
      x: 0,
      y: 0
    };
    this.frame = {
      currentFrame: 0
    };
    this.pos = {
      x: 0,
      Y: 0
    };
    this.speed = 1;
    this.avatar = new Image();
  };

  Player.prototype.update = function() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.pos.x -= 2;
      this.animation.y = 260;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.pos.x += 2;
      this.animation.y = 194;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.pos.y -= 2;
      player.animation.y = 64;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.pos.y += 2;
      player.animation.y = 391;
    }
  };

  function tick(now) {
    requestAnimationFrame(tick);
    then = then || now;
    delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);

      player.update();
      $GAME.drawBoard(csv);
      $GAME.drawPlayer(csv, player);
      player = $GAME.nextFrame(player);
    }
  }

  function startGame() {
    // set the canvas to the full page size
    c.width = screenWidth;
    c.height = screenHeight;

    player = new Player();

    player.frame.frames = 9;
    player.frame.width = (500/9); // 55.555555555...6
    player.frame.height = (519/9); // 57.6666666...7
    player.pos.x = screenWidth/2 - ((500/9)/2);
    player.pos.y = screenHeight/2 - ((519/9)/2);

    /**
     * the avatarSrc property is later assigned to player.avatar.src
     * (src is a property of an HTMLImageElement)
     * dimensions: 500x519
     *
     * @type {String}
     */
    player.avatarSrc = 'images/players/001.png';

    // start the animation loop
    window.requestAnimationFrame(tick);

    window.addEventListener('keydown', keyDown, false);
	
    window.addEventListener('keyup', keyUp, false);
  }

  startGame();
})(window);
