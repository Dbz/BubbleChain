(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var gameView = window.BubbleChain.GameView = function(game) {
		this.game = game;
	}
	
	gameView.prototype.start = function() {
		setInterval(function() {
			this.game.step();
		}.bind(this), 20);
	}
	
})();