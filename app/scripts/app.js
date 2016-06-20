(function(global) {
  'use strict';

  // Namespace containing all the game's variables
  var game = {};
  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;
  var KEY_SPACE = 32;

  // keeps track of which keys are pressed
  var keyState = [];

  /**
   * keyDwn
   *
   * @param  {Object} evt   Event
   */
  function keyDwn(evt) {
    keyState[evt.keyCode || evt.which] = true;
  }

  /**
   * keyUp
   *
   * @param  {Object} evt   Event
   */
  function keyUp(evt) {
    keyState[evt.keyCode || evt.which] = false;
  }

  /**
   * resize the game
   */
  function resize() {
    game.screenSize.screenHeight = document.body.offsetHeight;
    game.screenSize.screenWidth = document.body.offsetWidth;

    game.c.width = game.screenSize.screenWidth;
    game.c.height = game.screenSize.screenHeight;

    game.player.frame.scaleWidth = game.screenSize.screenWidth *
      game.player.frame.width / 1200;

    game.player.frame.scaleHeight = game.screenSize.screenWidth *
      game.player.frame.height / 1200;

    // Max screen size
    if (game.screenSize.screenWidth >= 1200) {
      game.player.frame.scaleWidth = game.player.frame.width;
      game.player.frame.scaleHeight = game.player.frame.height;
    }
  }

  /**
   * [notColliding description]
   *
   * @param  {Object} body1 [description]
   * @param  {Object} body2 [description]
   *
   * @return {Boolean}      false if no collisions are detected
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
    game.csv.strokeStyle = color;
    game.csv.strokeRect(game.player.pos.x, game.player.pos.y,
        game.player.frame.width, game.player.frame.height);
    game.csv.fillStyle = 'blue';
    game.csv.font = '30px Cambria';
    game.csv.fillText(
      'Player hitbox(red = collision): ',
      10, 30
    );
    game.csv.strokeRect(
        400, 10,
        game.player.frame.width, game.player.frame.height
      );
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
      width: 55.5,
      height: 65
    };

    this.pos = {
      x: (game.screenSize.screenWidth - this.frame.width) / 2,
      y: (game.screenSize.screenHeight - this.frame.height) / 2
    };

    this.speed = 1;
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
      console.log('boom');
      // pushes a new Projectile() object onto the projectiles array
      $PROJECTILE.createNew(this, game.projectiles);
      console.log(game.projectiles.length);
    }
  };

  Player.prototype.isColliding = function() {
    for (var i = 0; i < game.projectiles.length; i++) {
      var projectile = game.projectiles[i];
      if (notColliding(game.player, projectile) === false) {
        game.player.health.percent -= 1;
        console.log('collision!');
        drawHitBox('red');
        console.log(game.player.health.percent);
        console.log(game.playerHealth.width);
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
      game.csv.fillStyle = this.color;
      game.csv.fillRect(this.pos.x, this.pos.y, this.width, this.height);
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
    $GAME.drawBoard(game);
    $GAME.drawPlayer(game);
    drawHitBox('black');
    game.player.update(timeBetweenFrames);
    game.player.isColliding();
    $GAME.nextFrame(game.player);
    game.player.health.percent -= .1;
    game.playerHealth.update(game.player);
    game.playerHealth.drawBar(game.player);
    $PROJECTILE.draw(game.projectiles, game.csv);
    $PROJECTILE.update(game.projectiles);
  }

  /**
   * [tick description]
   */
  function tick() {
    if (game.player.health.percent <= 0) {
      console.log('You ran out of health! You lose!');
    } else {
      requestAnimationFrame(tick);

      game.frameSet.now = Date.now();
      game.frameSet.elapsed = game.frameSet.now - game.frameSet.then;
      if (game.frameSet.elapsed > game.frameSet.fpsInterval) {
        game.frameSet.then = game.frameSet.now -
          (game.frameSet.elapsed % game.frameSet.fpsInterval);
        updateEverythingThenDraw(game.frameSet.elapsed);
      }
    }
  }

  /**
   * [startGame description]
   *
   * @param  {Number} fps [description]
   */
  function startGame(fps) {
    game.projectiles = [];
    game.playerHealth = new Healthbar(200, 10,
                                      'green',
                                      game.player
                                    );

    game.frameSet.fpsInterval = 1000 / fps;
    game.frameSet.then = Date.now();

    tick();
  }

  /**
   * Initialize the game variables
   */
  function _init() {
    game.c = document.getElementById('canvas');
    game.csv = game.c.getContext('2d');

    game.screenSize = {
      screenWidth: document.body.offsetWidth,
      screenHeight: document.body.offsetHeight
    };

    game.frameSet = {
      fps: 20,
      fpsInterval: null,
      now: null,
      then: null,
      elapsed: null
    };

    // set the canvas to the full page size
    game.c.width = game.screenSize.screenWidth;
    game.c.height = game.screenSize.screenHeight;

    game.player = new Player(100, 100);
    game.player.avatar = new Image();

    game.player.avatar.onload = function() {
      startGame(game.frameSet.fps);
    };

    game.player.avatar.onerror = function() {
      console.error('Cannot load spritesheet');
    };

    game.player.avatar.src = '/images/players/001.png';

    resize();

    window.addEventListener('keydown', keyDwn, false);
    window.addEventListener('keyup', keyUp, false);
    window.addEventListener('resize', resize, false);
  }

  _init();
})(typeof window === 'undefined' ? global : window);
