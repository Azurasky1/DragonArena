(function (global) {
  'use strict';

  const KEY_UP = 38;
  const KEY_DOWN = 40;
  const KEY_LEFT = 37;
  const KEY_RIGHT = 39;
  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');
  var keyState = {};
  var keysdown = {};
  var lastCall = Date.now();
  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;
  var timeBetweenFrames;
  var frameCount = 0;
  var fps;
  var fpsInterval;
  var startTime;
  var now;
  var then;
  var elapsed;

  // set the canvas to the full page size
  c.width = screenWidth;
  c.height = screenHeight;

  // keeps track of which keys are pressed
  var keyState = [];

  window.addEventListener('keydown', function (e) {
    keyState[e.keyCode || e.which] = true;
  }, true);

  window.addEventListener('keyup', function (e) {
    keyState[e.keyCode || e.which] = false;
  }, true);

  function Player(totalHealth, currentHealth) {
    this.health = {
      totalHealth: totalHealth,
      currentHealth: currentHealth,
      percent: (currentHealth / totalHealth) * 100,
    };
    this.animation = {
      x: 0,
      y: 0,
    };
    this.frame = {
      current_frame: 0,
      frames: 9,
      width: (500 / 9), // 55.555555555...6
      height: (519 / 9), // 57.6666666...7
    };
    this.pos = {
      x: screenWidth / 2 - ((500 / 9) / 2),
      y: screenHeight / 2  - ((519 / 9) / 2),
    };
    this.speed = 1;
    this.avatar;
  };

  Player.prototype.update = function (timeBetweenFrames) {
    if (keyState[38] && keyState[37]) {
      this.pos.x -= this.speed * timeBetweenFrames;
      this.pos.y -= this.speed * timeBetweenFrames;
      this.animation.y = 0;
    } else if (keyState[38] && keyState[39]) {
      this.pos.x += this.speed * timeBetweenFrames;
      this.pos.y -= this.speed * timeBetweenFrames;
      this.animation.y = 130;
    }  else if (keyState[40] && keyState[37]) {
      this.pos.x -= this.speed * timeBetweenFrames;
      this.pos.y += this.speed * timeBetweenFrames;
      this.animation.y = 327;
    }  else if (keyState[40] && keyState[39]) {
      this.pos.x += this.speed * timeBetweenFrames;
      this.pos.y += this.speed * timeBetweenFrames;
      this.animation.y = 454;
    }  else if (keyState[KEY_UP]) {
      this.animation.y = 65;
      this.pos.y -= this.speed * timeBetweenFrames;
    }  else if (keyState[KEY_DOWN]) {
      this.animation.y = 391;
      this.pos.y += this.speed * timeBetweenFrames;
    }  else if (keyState[KEY_LEFT]) {
      this.animation.y = 260;
      this.pos.x -= this.speed * timeBetweenFrames;
    }  else if (keyState[KEY_RIGHT]) {
      this.animation.y = 194;
      this.pos.x += this.speed * timeBetweenFrames;
    }
  };

  var player = new Player(100, 100);

  // healthbar constructor
  // creates healthbar and sets position 20px above the passed in object
  // for now, all healthbars will be 200px in width, or...
  // ... twice the health percentage of any given object
  // hex is just a color, can be hexadecimal or a string
  // anyPlayerOrEnemy is an object of the Player() class, will add more soon
  function Healthbar(width, height, hex, anyPlayerOrEnemy) {
    this.width = width;
    this.height = height;
    this.color = hex;
    this.canvasPosition = {
      x: anyPlayerOrEnemy.pos.x,
      y: anyPlayerOrEnemy.pos.y - 20,
    };
  }

  // all health bars will need their own draw and update functions
  // here they are in the prototype
  Healthbar.prototype = {
    drawBar: function (anyPlayerOrEnemy) {
        if (anyPlayerOrEnemy.health.percent) {
          var num = anyPlayerOrEnemy.health.percent;
          csv.fillStyle = this.color;
          csv.fillRect(this.canvasPosition.x, this.canvasPosition.y, this.width, this.height);
        } else {
          console.log('In order to determine the length of this health bar, please input a player' +
            ' or enemy object with a valid .health.percent property.');
          return;
        }
      },

    update: function (anyPlayerOrEnemy) {
      this.canvasPosition.x = anyPlayerOrEnemy.pos.x;
      this.canvasPosition.y = anyPlayerOrEnemy.pos.y - 20;
      this.width = anyPlayerOrEnemy.health.percent * 2;
    },
  };

  var playerHealth = new Healthbar(200, 10, 'green', player);

  function updateEverythingThenDraw(timeBetweenFrames) {
    player.update(timeBetweenFrames);
    player = $GAME.nextFrame(player);
    $GAME.drawBoard(csv);
    $GAME.drawPlayer(csv, player);
    player.health.percent -= .1;
    playerHealth.update(player);
    playerHealth.drawBar(player);
  }

  function startGame(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    tick();
  }

  function tick() {

    if (player.health.percent < 0) {
      console.log('You ran out of health! You lose!');
      return;
    }  else {
      requestAnimationFrame(tick);
      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        updateEverythingThenDraw(elapsed);
      }
    }
  }

  player.avatar = new Image();
  player.avatar.onload = function () {
    startGame(30);
  };

  player.avatar.onerror = function () {
    console.error('Cannot load spritesheet');
  };

  player.avatar.src = '/images/players/001.png';

})(window);
