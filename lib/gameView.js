(function() {
	window.BubbleChain = window.BubbleChain || {};
	
	var gameView = window.BubbleChain.GameView = function(game) {
		this.game				= game;
		this.level			= 1;
		this.score			= 0;
		this.$menu			= $('.start-menu');
		this.$score			= $('#score');
		this.$timer			= $('#timer');
		this.$canvas		= $('#canvas');
		
		$('#wrapper').on('click', '.start-menu', function(event) {
			$(event.currentTarget).css('display', 'none');
			this.$canvas.removeClass('super-blur');
			this.game.turnClickOn();
			this.game.beginTimer(); // Start timer for levels 4 and 5
		}.bind(this));
		
		this.game.setGameView(this);
		this.setMenu();
		this.game.start(this.level++);
		this.start();
	}
	
	gameView.prototype.start = function() {
		if(this.level == 6)
			this.level = 1;
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
		this.$canvas.addClass('super-blur');
		if(this.level == 1) {
			this.$menu.find('#text').text("Pop a bubble by clicking on it. It'll expand and touch other bubbles popping them.");
		} else if(this.level == 2) {
			this.$menu.find('#text').text("Only pop a bubble of a single color. The first bubble you click sets your color. You get 50pts for every bubble you pop of your color, and lose 100pts for every bubble you pop of the wrong color.");
		} else if(this.level == 3) {
			this.$menu.find('#text').text("For this level, click as many bubbles as you can. You get 100pts for every *non-expanding* bubble that you click.");
		} else if(this.level == 4) {
			this.$menu.find('#text').text("Negative Bonus Round! Lose 100pts for every bubble remaining after the timer runs out!");
		} else if(this.level == 5) {
			this.$menu.find('#text').text("Positive Bonus Round! Gain 25pts for every bubble popped before the timer runs out!");
		} else {
			this.$menu.find('#text').text("It appears there is bug! Click all the bubbles for fun.");
		}
	}
	
	gameView.prototype.setTimer = function(time) {
		this.$timer.css('display', 'inline-block');
		this.$timer.text(time);
		if(time == 0)
			this.$timer.css('display', 'none');
	}
	
})();