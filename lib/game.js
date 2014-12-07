(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var Game = window.BubbleChain.Game = function(context, canvas) {
		this.context 	= context;
		this.canvas 	= canvas;
		this.bubbles 	= [];
	}
	
	Game.DIM_X 				= 700;
	Game.DIM_Y 				= 500;
	Game.RADIUS 			= 20;
	Game.MAX_RADIUS 	= 50;
	Game.NUM_BUBBLES 	= 30;
	
	Game.prototype.start = function() {
		this.addBubbles();
	}
	
	Game.prototype.turnClickOn = function() {
		this.canvas.on('click', this.chainReaction.bind(this));
	}
	
	Game.prototype.turnClickOff = function() {
		this.canvas.off('click');
	}
	
	Game.prototype.addBubbles = function() {
		for(var x = 0; x < Game.NUM_BUBBLES; x++) {
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
		return [Math.random() * (Game.DIM_X - Game.RADIUS * 2) + Game.RADIUS, Math.random() * (Game.DIM_Y - Game.RADIUS * 2) + Game.RADIUS];
	}
	
	Game.prototype.bounceOffWall = function(bubble) {
		if(bubble.pos[0] - bubble.radius < 0 || bubble.pos[0] + bubble.radius > Game.DIM_X)
			bubble.vel[0] *= -1;
		
		if(bubble.pos[1] - bubble.radius < 0 || bubble.pos[1] + bubble.radius > Game.DIM_Y)
			bubble.vel[1] *= -1;
	}
	
	Game.prototype.checkCollisions = function() {
		this.bubbles.forEach(function(bubble) {
			if(bubble.expanding) {
				this.bubbles.forEach(function(otherBubble) {
					if(bubble != otherBubble && bubble.isCollidedWith(otherBubble))
						otherBubble.expanding = true;
				})
			}
		}.bind(this))
	}
	
	Game.prototype.step = function() {
		this.moveBubbles();
		this.checkCollisions();
		this.removeBigBubbles();
		this.draw();
	}
	
	Game.prototype.chainReaction = function(event) {
		var x = event.pageX - this.canvas.offset().left;
		var y = event.pageY - this.canvas.offset().top;
		var bubble = this.findBubble([x, y]);
		if(~bubble)
			bubble.expanding = true;
	}
	
	Game.prototype.findBubble = function(pos) {
		var clicked = -1;
		this.bubbles.forEach(function(bubble) {
			if(bubble.isClicked(pos))
				clicked = bubble;
		});
		return clicked;
	}
	
	Game.prototype.removeBigBubbles = function() {
		for(var x = 0; x < this.bubbles.length; x++) {
			if(this.bubbles[x].radius >= Game.MAX_RADIUS)
				this.bubbles.splice(x, 1);
		}
	}
})();