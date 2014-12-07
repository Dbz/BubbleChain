(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var gameView = window.BubbleChain.GameView = function(game) {
		this.game				= game;
		this.firstGame 	= true;
		$('#wrapper').on('click', 'p', function(event) {
			$(event.currentTarget).css('display', 'none');
			$('#canvas').removeClass('blur');
			this.game.turnClickOn();
		}.bind(this));
		this.game.start();
		this.start();
	}
	
	gameView.prototype.start = function() {
		if(!this.firstGame)
			this.game.start();
		var interval = setInterval(function() {
			this.game.step();
			if(this.game.bubbles.length == 0) {
				clearInterval(interval);
				this.gameOver();
			}
		}.bind(this), 20);
	}
	
	gameView.prototype.gameOver = function() {
		$(".start-game").css('display', 'inline-block');
		$('#canvas').addClass('blur');
		this.start();
		this.game.turnClickOff();
		this.firstGame = false;
	}
	
})();