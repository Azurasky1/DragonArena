(function(global) {
  'use strict';

  var screenWidth = document.body.offsetWidth;
  var screenHeight = document.body.offsetHeight;

  /**
   * [game description]
   */
  function Game() {
    var self = this;

    // private scope
    var _board = {
      background: '#FAFAFA'
    };

    // public scope

    /**
     * [drawPlayer description]
     *
     * @param  {Object} graph  [description]
     * @param  {Object} player [description]
     */
    function drawPlayer(graph, player) {
      // taken from (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
      graph.drawImage(
        player.avatar,
        player.frame.width * player.frame.currentFrame,
        player.animation.y,
        player.frame.width, player.frame.height, // clip size -S
        player.pos.x, player.pos.y, // centered on canvas
        player.frame.width, player.frame.height // image size to draw
      );
    }

    /**
     * [nextFrame description]
     *
     * @param  {Object} el [description]
     */
    function nextFrame(el) {
      if (el.frame.currentFrame < el.frame.frames - 1) {
        el.frame.currentFrame += 1;
      } else {
        el.frame.currentFrame = 0;
      }
    }

    /**
     * [drawBoard description]
     *
     * @param  {Object} canvas [description]
     */
    function drawBoard(canvas) {
      // added clearRect so that we don't keep drawing over the canvas
      canvas.clearRect(0, 0, canvas.width, canvas.height);
      canvas.fillStyle = _board.background;
      canvas.fillRect(0, 0, screenWidth, screenHeight);
    }

    function collisionDetection(body1, body2) {
      return ( (body1 === body2) ||
      (body1.pos.x + body1.frame.width < body2.pos.x) ||
      (body1.pos.x > body2.pos.x + body2.width) ||
      (body1.pos.y > body2.pos.y + body2.height) ||
      (body1.pos.y + body1.height < body2.pos.y));
    };

    function isNotColliding(b1) {
        return this.bodies.filter(function (b2) {
        collisionDetection(b1, b2)
        }.length === 0);
    }

    function isColliding () {
     for (var i = 0; i < bodies.length; i++) {
       if (bodies[i] instanceof Projectile) {
       if (collisionDetection(player, bodies[i]) === false)  {
         player.health.percent -= 1;
         console.log('collision!');
         drawHitBox('red');
         console.log(player.health.percent);
         console.log(playerHealth.width);
       }
     }
     }
   }

  function updateBodies() {
    var newBodies = bodies.filter(this.isNotColliding);
    bodies = newBodies;
    for (var i = 0; i < bodies.length; i++) {
      bodies[i].update;
      }
    }

    self.drawPlayer = drawPlayer;
    self.drawBoard = drawBoard;
    self.nextFrame = nextFrame;
    self.updateBodies = updateBodies;
    self.collisionDetection = collisionDetection;
    self.isNotColliding = isNotColliding;
    self.isColliding = isColliding;
  }

  // expose $PLAYER on the global scope
  global.$GAME = new Game();
})(typeof window === 'undefined' ? global : window);
