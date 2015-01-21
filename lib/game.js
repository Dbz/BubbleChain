(function() {
  window.BubbleChain = window.BubbleChain || {};
  
  var Game = window.BubbleChain.Game = function(context, canvas) {
    this.context          = context;
    this.canvas           = canvas;
    this.bubbles          = [];
    this.lastClickedColor  = ""; // Used in level 2
    this.timeLeft         = 0;  // Used in levels 4 and 5, value set in beginTimer
    
    this.soundIndex = 0;  // Keep track of the next sound to play
    this.popSounds  = [   // Multiple sounds for faster sound loading
      new Audio("bubblePop.mp3"),
      new Audio("bubblePop.mp3"),
      new Audio("bubblePop.mp3"),
      new Audio("bubblePop.mp3")
    ];
  }
  
  Game.DIM_X        = 700;
  Game.DIM_Y        = 500;
  Game.RADIUS       = 25;
  Game.MAX_RADIUS   = 55;
  Game.NUM_BUBBLES  = 25;
  Game.WALL_BUFFER  = 2.0;
  
  Game.prototype.start = function(level) {
    // Add bubbles
    this.level            = BubbleChain.levels[level - 1];
    this.lastClickedColor  = ""; // Used in level 2
    this.timeLeft         = 0;  // Set in beginTimer
    this.bubbles          = [];
    this.addBubbles();
  }
  
  Game.prototype.beginTimer = function() { // Fires when start-game menu is clicked
    if(this.level.timer) {
      this.timeLeft = this.level.timer;
      this.startTimer();
    }
  }
  
  Game.prototype.addBubbles = function() {
    for(var x = 0; x < Game.NUM_BUBBLES; x++) {
      this.bubbles.push(new BubbleChain.MovingBubble({
        level: this.level.number,
        radius: Game.RADIUS,
        context: this.context,
        game: this
      }));
    }
  }
  
  Game.prototype.moveAndDrawBubbles = function() {
    this.context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.bubbles.forEach(function(bubble) {
      bubble.move();
      bubble.draw();
    });
  }
  
  Game.prototype.checkCollisions = function() {
    // tells bubbles to expand; removes bubbles from list; changes score
    this.bubbles.forEach(function(bubble, i) {
      if(bubble.expanding) {
        this.bubbles.forEach(function(otherBubble) {
          if(bubble != otherBubble && bubble.isCollidedWith(otherBubble))
            otherBubble.expanding = true;
        });
        // Remove big bubbles; Change score if necessary
        if(bubble.radius >= Game.MAX_RADIUS) {
          this.changeLevelScore(bubble, "pop");
          this.bubbles.splice(i, 1);
          this.playSound();
        }
      }
    }.bind(this))
  }
  
  Game.prototype.playSound = function() {
    this.popSounds[this.soundIndex++].play();
    if(this.soundIndex >= this.popSounds.length)
      this.soundIndex = 0;
  }
  
  Game.prototype.step = function() {
    this.moveAndDrawBubbles();
    this.checkCollisions();
  }
  
  Game.prototype.chainReaction = function(event) {
    // Tells bubble to expand if clicked
    // Change the level score
    var x = event.pageX - this.canvas.offset().left;
    var y = event.pageY - this.canvas.offset().top;
    var bubble = this.findBubble([x, y]);
    if(~bubble && !bubble.expanding) {
      bubble.expanding = true;
      this.changeLevelScore(bubble, "click");
    }
  }
  
  Game.prototype.changeLevelScore = function(bubble, action) {
    if(action == "click")
      this.lastClickedColor = bubble.color;
    this.gameView.changeScore(this.level.scoreChange(bubble, action, this.lastClickedColor, this.bubbles));
  }
  
  Game.prototype.findBubble = function(pos) {
    // Determines if bubble is clicked on
    var clicked = -1;
    this.bubbles.forEach(function(bubble) {
      if(bubble.isClicked(pos))
        clicked = bubble;
    });
    return clicked;
  }
  
  Game.prototype.setGameView = function(gameView) {
    this.gameView = gameView;
  }
  
  Game.prototype.roundOver = function() {
    return this.level.isOver(this.bubbles, this.timeLeft, this.lastClickedColor);
      
  }
  
  Game.prototype.startTimer = function() {
    var interval = setInterval(function() {
      this.gameView.setTimer(this.timeLeft)
      this.timeLeft -= 1;
      if(this.timeLeft < 0) {
        clearInterval(interval);
      }
    }.bind(this), 1000);
  }
  
})();