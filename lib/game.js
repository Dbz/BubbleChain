(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var Game = window.BubbleChain.Game = function(context) {
		this.context = context;
		this.bubbles = [];
		this.addBubbles();
		
	}
	
	Game.prototype.addBubbles = function() {
		for(var x = 0; x < 10; x++) {
			this.bubbles.push(new window.BubbleChain.MovingBubble({
				pos: this.randomPosition(),
				radius: Game.RADIUS,
				context: this.context,
				game: this
			}));
		}
	}
	
	Game.prototype.draw = function() {
		this.context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		this.bubbles.forEach(function(bubble) {
			bubble.draw();
		});
	}
	
	Game.prototype.moveBubbles = function() {
		this.bubbles.forEach(function(bubble) {
			bubble.move();
		}.bind(this));
	}
	
	Game.prototype.randomPosition = function() {
		return [Math.random() * (Game.DIM_X - Game.RADIUS), Math.random() * (Game.DIM_Y - Game.RADIUS)];
	}
	
	Game.prototype.bounceOffWall = function(pos, vel) {
		if(pos[0] - Game.RADIUS < 0 || pos[0] + Game.RADIUS > Game.DIM_X)
			vel[0] *= -1;
		
		if(pos[1] - Game.RADIUS < 0 || pos[1] + Game.RADIUS > Game.DIM_Y)
			vel[1] *= -1;
		
		return vel;
	}
	
	Game.prototype.checkCollisions = function() {
		this.bubbles.forEach(function(bubble) {
			if(bubble.expanding) {
				this.bubbles.forEach(function(otherBubble) {
					if(bubble != otherBubble && bubble.isCollidedWith(otherBubble))
						console.log('collision');
				})
			}
		}.bind(this))
	}
	
	Game.prototype.step = function() {
		this.moveBubbles();
		this.checkCollisions();
		this.draw();
	}
	
	
	Game.DIM_X = 700;
	Game.DIM_Y = 500;
	Game.RADIUS = 20;
})();