(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var gameView = window.BubbleChain.GameView = function(game) {
		this.game				= game;
		this.level			= 1;
		this.score			= 0;
		this.$menu			= $('.start-menu');
		this.$score			= $('.score');
		this.$canvas		= $('#canvas');
		
		$('#wrapper').on('click', '.start-menu', function(event) {
			$(event.currentTarget).css('display', 'none');
			this.$canvas.removeClass('blur');
			this.game.turnClickOn();
		}.bind(this));
		
		this.game.setGameView(this);
		this.setMenu();
		this.game.start(this.level++);
		this.start();
	}
	
	gameView.prototype.start = function() {
		var interval = setInterval(function() {
			this.game.step();
			if(this.game.gameOver()) {
				clearInterval(interval);
				this.gameOver();
			}
		}.bind(this), 25);
	}
	
	gameView.prototype.gameOver = function() {
		// Add level bonus
		// Bring up the next level menu
		// Start the next round in the background
		this.changeScore(this.game.levelBonus());
		this.setMenu();
		this.game.start(this.level++);
		this.start();
		this.game.turnClickOff();
	}
	
	gameView.prototype.changeScore = function(score) {
		this.score += score;
		this.$score.text(this.score + "pts");
	}
	
	gameView.prototype.setMenu = function() {
		this.$menu.css('display', 'inline-block');
		this.$canvas.addClass('blur');
		if(this.level == 1) {
			this.$menu.find('#text').text("Click a bubble, and it will expand. If it touches another bubble, the other bubble will also expand. Keep in mind that you will lose 100pts for every click. Now, pop those bubbles!");
		} else {
			this.$menu.find('#text').text("This time, only pop a bubble of a single color. The first bubble you click sets your color. You get 50pts for every bubble you pop of your color, and lose 100pts for every bubble you pop of the wrong color. Don't worry if you mess up, it's hard!");
		}
	}
	
})();