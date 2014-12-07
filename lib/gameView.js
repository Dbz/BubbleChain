(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var gameView = window.BubbleChain.GameView = function(game, context) {
		this.game = game;
		this.context = context;
	}
	
	gameView.prototype.start = function() {
		setInterval(function() {
			this.game.step();
		}.bind(this), 20);
	}
	
})();