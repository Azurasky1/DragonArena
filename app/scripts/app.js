(function(global) {
  'use strict';

  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;
  var KEY_SPACE = 32;
  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');
  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;
  var fpsInterval;
  var now;
  var then;
  var elapsed;
  var projectiles = [];
  var projectile;
  var player;
  var playerHealth;
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
   * [notColliding description]
   *
   * @param  {Object} body1 [description]
   * @param  {Object} body2 [description]
   */
  function notColliding(body1, body2) {
    return ((body1.pos.x + body1.frame.width < body2.pos.x) ||
    (body1.pos.x > body2.pos.x + body2.width) ||
    (body1.pos.y > body2.pos.y + body2.height) ||
    (body1.pos.y + body1.height < body2.pos.y));
  }

  /**
   * [drawHitBox description]
   *
   * @param  {String} color [description]
   */
  function drawHitBox(color) {
    csv.strokeStyle = color;
    csv.strokeRect(player.pos.x, player.pos.y,
        player.frame.width, player.frame.height);
    csv.fillStyle = 'blue';
    csv.font = '30px Cambria';
    csv.fillText('Player hitbox(red = collision): ', 10, 30);
    csv.strokeRect(400, 10, player.frame.width, player.frame.height);
  }

  /**
   * [Player description]
   *
   * @param {Number} totalHealth   [description]
   * @param {Number} currentHealth [description]
   */
  function Player(totalHealth, currentHealth) {
    this.health = {
      total: totalHealth,
      current: currentHealth,
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
      height: (519 / 8) // 57.6666666...7
    };

    this.pos = {
      x: screenWidth / 2 - ((500 / 9) / 2),
      y: screenHeight / 2 - ((519 / 8) / 2)
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
    } else if (keyState[KEY_SPACE]) {
      // pushes a new Projectile() object onto the projectiles array
      $PROJECTILE.createNew(this, projectiles);
      console.log(projectiles.length);
    } else {
      // console.log('No keys being pressed right now');
    }
  };

  Player.prototype.isColliding = function() {
    for (var i = 0; i < projectiles.length; i++) {
      var projectile = projectiles[i];
      if (notColliding(player, projectile) === false) {
        player.health.percent -= 1;
        console.log('collision!');
        drawHitBox('red');
        console.log(player.health.percent);
        console.log(playerHealth.width);
      }
    }
  };

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
    this.pos = {
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
      csv.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    } else {
      console.log('In order to determine the length of this ' +
        'health bar, please input a player' +
        ' or enemy object with a valid .health.percent property.');
    }
  };

  Healthbar.prototype.update = function(anyPlayerOrEnemy) {
    this.pos.x = anyPlayerOrEnemy.pos.x - anyPlayerOrEnemy.frame.width;
    this.pos.y = anyPlayerOrEnemy.pos.y - 20;
    this.width = anyPlayerOrEnemy.health.percent * 2;
  };

  /**
   * [updateEverythingThenDraw description]
   *
   * @param  {Number} timeBetweenFrames [description]
   */
  function updateEverythingThenDraw(timeBetweenFrames) {
    $GAME.drawBoard(csv);
    $GAME.drawPlayer(csv, player);
    drawHitBox('black');
    player.update(timeBetweenFrames);
    player.isColliding();
    $GAME.nextFrame(player);
    player.health.percent -= .1;
    playerHealth.update(player);
    playerHealth.drawBar(player);
    $PROJECTILE.draw(projectiles, csv);
    $PROJECTILE.update(projectiles);
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

  player = new Player(100, 100);
  playerHealth = new Healthbar(200, 10, 'green', player);
  player.avatar = new Image();
  // projectile = new Projectile(player);

  player.avatar.onload = function() {
    startGame(30);
  };

  player.avatar.onerror = function() {
    console.error('Cannot load spritesheet');
  };

  player.avatar.src = '/images/players/001.png';
})(typeof window === 'undefined' ? global : window);
