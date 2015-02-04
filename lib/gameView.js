(function() {
  window.BubbleChain = window.BubbleChain || {};
  
  var gameView = window.BubbleChain.GameView = function(context, game) {
    this.context    = context;
    this.game       = game;
    this.level      = 1;
    this.score      = 0;
    this.$menu      = $('.start-menu');
    this.$score     = $('#score');
    this.$timer     = $('#timer');
    this.$canvas    = $('#canvas');
    
    $('#wrapper').on('click', '.start-menu', function(event) {
      $(event.currentTarget).css('display', 'none');
      this.$canvas.removeClass('super-blur');
      this.turnClickOn();
      this.game.beginTimer(); // Start timer for levels 4 and 5
    }.bind(this));
    
    this.game.setGameView(this);
    this.setMenu();
    this.game.start(this.level++);
    this.start();
  }
  
  gameView.prototype.start = function() {
    var interval = setInterval(function() {
      this.game.step();
      if(this.game.roundOver()) {
        clearInterval(interval);
        this.gameOver();
      }
    }.bind(this), 25);
  }
  
  gameView.prototype.gameOver = function() {
    // Add level bonus
    // Bring up the next level menu
    // Start the next round in the background
    this.changeScore(BubbleChain.levels[this.level - 2].scoreChange(null, "over", null, this.game.bubbles));
    
    if(BubbleChain.levels[this.level - 2].number == BubbleChain.levels.length)
      this.level = 1;
    
    this.setMenu();
    this.game.start(this.level++);
    this.start();
    this.turnClickOff();
  }
  
  gameView.prototype.changeScore = function(score) {
    this.score += score;
    this.$score.text(this.score + "pts");
  }
  
  gameView.prototype.setMenu = function() {
    this.$menu.css('display', 'inline-block');
    this.$canvas.addClass('super-blur');
    this.$menu.find('#text').text(BubbleChain.levels[this.level - 1].instructions);
  }
  
  gameView.prototype.setTimer = function(time) {
    this.$timer.css('display', 'inline-block');
    this.$timer.text(time);
    if(time == 0)
      this.$timer.css('display', 'none');
  }
  
  gameView.prototype.turnClickOn = function() {
    this.$canvas.on('click', this.game.chainReaction.bind(this.game));
  }
  
  gameView.prototype.turnClickOff = function() {
    this.$canvas.off('click');
  }
  
  gameView.prototype.drawBubble = function(bubble) {
    this.context.beginPath();
    this.context.arc(bubble.pos[0], bubble.pos[1], bubble.radius, 0, 2 * Math.PI, true);
    this.context.fillStyle = bubble.color;
    this.context.closePath();
    this.context.fill();
  }
  
  gameView.prototype.clearRect = function() {
    this.context.clearRect(0, 0, BubbleChain.Game.DIM_X, BubbleChain.Game.DIM_Y);
  }
  
})();