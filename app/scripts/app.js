(function(global) {
  'use strict';

  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');
  var keyState = {};
  var keysdown = {};
  var fps = 15;
  var lastCall = Date.now();
  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;
  var timeBetweenFrames;

  // set the canvas to the full page size
  c.width = screenWidth;
  c.height = screenHeight;

  var keyState = [];
  const KEY_UP = 38;
  const KEY_DOWN = 40;
  const KEY_LEFT = 37;
  const KEY_RIGHT = 39;

  window.addEventListener('keydown', function (e) {
    keyState[e.keyCode || e.which] = true;
  }, true);

  window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

/*
  onkeydown = window.onkeyup = function (e) {
      if (e.type === 'keydown') {
          keyState[e.keyCode] = e.type == 'keydown';
          console.log("working");
      }
  }
*/

  function Player(totalHealth, currentHealth) {
    this.health = {
      totalHealth: totalHealth,
      currentHealth: currentHealth,
      percent: (currentHealth / totalHealth) * 100
    };
    this.animation = {
      x: 0,
      y: 0
    };
    this.frame = {
      current_frame: 0,
      frames: 9,
      width: (500/9), // 55.555555555...6
      height: (519/9) // 57.6666666...7
    };
    this.pos = {
      x: screenWidth/2 - ((500/9)/2),
      y: screenHeight/2 - ((519/9)/2)
    };
    this.speed = 1;
    this.avatar;
  };

  Player.prototype.update = function(timeBetweenFrames) {
    if (keyState[KEY_UP]) {
      this.animation.y = 0;
      this.pos.y -= this.speed * timeBetweenFrames;
    }

    if (keyState[KEY_DOWN]) {
      this.animation.y = 60;
      this.pos.y += this.speed * timeBetweenFrames;
    }

    if (keyState[KEY_LEFT]) {
      this.animation.y = 120;
      this.pos.x -= this.speed * timeBetweenFrames;
    }

    if (keyState[KEY_RIGHT]) {
      this.animation.y = 180;
      this.pos.x += this.speed * timeBetweenFrames;
    }
  };

  var player = new Player(100, 100);

  function Healthbar (width, height, hex, anyPlayerOrEnemy) {
    this.width = width;
    this.height = height;
    this.color = hex;
    this.canvasPosition = {
      x: anyPlayerOrEnemy.pos.x,
      y: anyPlayerOrEnemy.pos.y - height
    }
  }

  Healthbar.prototype.drawBar = function (anyPlayerOrEnemy) {
        if (anyPlayerOrEnemy.health.percent) {
          var num = anyPlayerOrEnemy.health.percent;
          csv.fillStyle = this.color;
          csv.fillRect = (0, 0, (num / this.width), this.height);
        }
        else {
          console.log("In order to determine the length of this health bar, please input a player" +
          " or enemy object with a valid .health.percent property.");
          return;
        }
  }

  Healthbar.prototype.update = function (anyPlayerOrEnemy) {
    this.canvasPosition.x = anyPlayerOrEnemy.pos.x;
    this.canvasPosition.y = anyPlayerOrEnemy.pos.y - 10;
  }

  var playerHealth = new Healthbar(200, 10, 'green', player);

    /**
     * the avatarSrc property is later assigned to player.avatar.src
     * (src is a property of an HTMLImageElement)
     * dimensions: 500x519
     *
     * @type {String}
     */

  // so that the movement animation resets only if the player changes direction
  /*
  function checkSpritesheet(frameNow, y) {
    if ((frameNow > 0) && player.animation.y !== y) {
      var new_frame = 0;
      player.frame.currentFrame = new_frame;
      player.animation.y = y;
    } else if (frameNow === 0 && player.animation.y !== y) {
      player.animation.y = y;
    }
  }
*/

/*
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
*/

/*

  function keyDown(evt) {
     keysdown[evt.which] = true;
  }

  function keyUp(evt) {
    keysdown[evt.which] = false;
  }

*/

/*

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

*/

  function tick() {

	var now = Date.now();
	timeBetweenFrames = (now - lastCall) / 1000; //time in seconds
  lastCall = now;

      player.update(timeBetweenFrames);
      player = $GAME.nextFrame(player);
      $GAME.drawBoard(csv);
      $GAME.drawPlayer(csv, player);
      playerHealth.update(player);
      playerHealth.drawBar(player);
      requestAnimationFrame(tick);
  }

/*
  function startGame() {

    // start the animation loop
    player.update();
    $GAME.drawBoard(csv);
    $GAME.drawPlayer(csv, player);

    window.addEventListener('keydown', keyDown, false);

    window.addEventListener('keyup', keyUp, false);
  }
*/

  player.avatar = new Image();
  player.avatar.onload = function () {
    $GAME.drawBoard(csv);
    $GAME.drawPlayer(csv, player);
    playerHealth.update(player);
    playerHealth.drawBar(player);
    tick();
  }
  player.avatar.onerror = function () {
  console.error("Cannot load spritesheet");
  }
  player.avatar.src = "/images/players/001.png";




})(window);
