(function(global) {
  'use strict';

  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;
  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');
  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;
  var fpsInterval;
  var now;
  var then;
  var elapsed;
  // keeps track of which keys are pressed
  var keyState = [];

  // set the canvas to the full page size
  c.width = screenWidth;
  c.height = screenHeight;

  window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
  }, true);

  window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
  }, true);

  /**
   * [Player description]
   *
   * @param {Number} totalHealth   [description]
   * @param {Number} currentHealth [description]
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
      currentFrame: 0,
      frames: 9,
      width: (500 / 9), // 55.555555555...6
      height: (519 / 9) // 57.6666666...7
    };

    this.pos = {
      x: screenWidth / 2 - ((500 / 9) / 2),
      y: screenHeight / 2 - ((519 / 9) / 2)
    };

    this.speed = 1;
    this.avatar = null;
  }

  Player.prototype.update = function(timeBetweenFrames) {
    if (keyState[KEY_UP] && keyState[KEY_LEFT]) {
      this.pos.x -= this.speed * timeBetweenFrames;
      this.pos.y -= this.speed * timeBetweenFrames;
      this.animation.y = 0;
    } else if (keyState[KEY_UP] && keyState[KEY_RIGHT]) {
      this.pos.x += this.speed * timeBetweenFrames;
      this.pos.y -= this.speed * timeBetweenFrames;
      this.animation.y = 130;
    } else if (keyState[KEY_DOWN] && keyState[KEY_LEFT]) {
      this.pos.x -= this.speed * timeBetweenFrames;
      this.pos.y += this.speed * timeBetweenFrames;
      this.animation.y = 327;
    } else if (keyState[KEY_DOWN] && keyState[KEY_RIGHT]) {
      this.pos.x += this.speed * timeBetweenFrames;
      this.pos.y += this.speed * timeBetweenFrames;
      this.animation.y = 454;
    } else if (keyState[KEY_UP]) {
      this.animation.y = 65;
      this.pos.y -= this.speed * timeBetweenFrames;
    } else if (keyState[KEY_DOWN]) {
      this.animation.y = 391;
      this.pos.y += this.speed * timeBetweenFrames;
    } else if (keyState[KEY_LEFT]) {
      this.animation.y = 260;
      this.pos.x -= this.speed * timeBetweenFrames;
    } else if (keyState[KEY_RIGHT]) {
      this.animation.y = 194;
      this.pos.x += this.speed * timeBetweenFrames;
    }
  };

  var player = new Player(100, 100);

  /**
   * healthbar varructor
   * creates healthbar and sets position 20px above the passed in object
   * for now, all healthbars will be 200px in width, or
   * twice the health percentage of any given object
   * hex is just a color, can be hexadecimal or a string
   * anyPlayerOrEnemy is an object of the Player() class, will add more soon
   *
   * @param {Number} width            [description]
   * @param {Number} height           [description]
   * @param {String} hex              [description]
   * @param {Object} anyPlayerOrEnemy [description]
   */
  function Healthbar(width, height, hex, anyPlayerOrEnemy) {
    this.width = width;
    this.height = height;
    this.color = hex;
    this.canvasPosition = {
      x: anyPlayerOrEnemy.pos.x,
      y: anyPlayerOrEnemy.pos.y - 20
    };
  }

  /**
   * all health bars will need their own draw and update functions
   * here they are in the prototype
   *
   * @param  {Object} anyPlayerOrEnemy [description]
   */
  Healthbar.prototype.drawBar = function(anyPlayerOrEnemy) {
    if (anyPlayerOrEnemy.health.percent) {
      csv.fillStyle = this.color;
      csv.fillRect(this.canvasPosition.x,
                  this.canvasPosition.y,
                  this.width,
                  this.height);
    } else {
      console.log('In order to determine the length of this health bar, ' +
                  'please input a player or enemy object with a valid ' +
                  'health.percent property.');
    }
  };

  Healthbar.prototype.update = function(anyPlayerOrEnemy) {
    this.canvasPosition.x = anyPlayerOrEnemy.pos.x;
    this.canvasPosition.y = anyPlayerOrEnemy.pos.y - 20;
    this.width = anyPlayerOrEnemy.health.percent * 2;
  };

  var playerHealth = new Healthbar(200, 10, 'green', player);

  /**
   * [updateEverythingThenDraw description]
   *
   * @param  {Number} timeBetweenFrames [description]
   */
  function updateEverythingThenDraw(timeBetweenFrames) {
    $GAME.drawBoard(csv);
    $GAME.drawPlayer(csv, player);
    playerHealth.drawBar(player);
    player.update(timeBetweenFrames);
    player = $GAME.nextFrame(player);
    player.health.percent -= .1;
    playerHealth.update(player);
  }

  /**
   * [tick description]
   */
  function tick() {
    if (player.health.percent <= 0) {
      console.log('You ran out of health! You lose!');
    } else {
      requestAnimationFrame(tick);
      now = Date.now();
      elapsed = now - then;
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        updateEverythingThenDraw(elapsed);
      }
    }
  }

  /**
   * [startGame description]
   *
   * @param  {Number} fps [description]
   */
  function startGame(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();

    tick();
  }

  player.avatar = new Image();

  player.avatar.onload = function() {
    startGame(30);
  };

  player.avatar.onerror = function() {
    console.error('Cannot load spritesheet');
  };

  player.avatar.src = '/images/players/001.png';
})(typeof window === 'undefined' ? global : window);
