(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var gameView = window.BubbleChain.GameView = function(game) {
		this.game				= game;
		this.firstGame 	= true;
		this.level			= 1;
		this.$menu			= $('.start-menu');
		this.$canvas		= $('#canvas');
		$('#wrapper').on('click', '.start-menu', function(event) {
			$(event.currentTarget).css('display', 'none');
			this.$canvas.removeClass('blur');
			this.game.turnClickOn();
		}.bind(this));
		this.setMenu();
		this.game.start(this.level++);
		this.start();
	}
	
	gameView.prototype.start = function() {
		if(!this.firstGame)
			this.game.start(this.level++);
		var interval = setInterval(function() {
			this.game.step();
			if(this.game.bubbles.length == 0) {
				clearInterval(interval);
				this.gameOver();
			}
		}.bind(this), 25);
	}
	
	gameView.prototype.gameOver = function() {
		this.setMenu();
		this.start();
		this.game.turnClickOff();
		this.firstGame = false;
	}
	
	gameView.prototype.setMenu = function() {
		this.$menu.css('display', 'inline-block');
		this.$canvas.addClass('blur');
		if(this.level == 1) {
			this.$menu.find('#text').text("Click a bubble, and it will expand. If it touches another bubble, the other bubble will also expand. Pop all the bubbles!");
		} else {
			this.$menu.find('#text').text("This time, only pop a bubble of a single color. The first bubble you click sets your color. Don't worry if you mess up, it's hard!");
		}
	}
	
})();