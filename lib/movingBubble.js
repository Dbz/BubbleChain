(function() {
	if(typeof(BubbleChain) == "undefined")
		window.BubbleChain = {};
	
	var MovingBubble	= window.BubbleChain.MovingBubble = function(params) {
		this.expanding	= false;
		this.pos 				= params.pos;
		this.vel 				= window.BubbleChain.Util.randomVel(MovingBubble.SPEED);
		this.radius 		= params.radius;
		this.color 			= BubbleChain.Util.randomColor();
		this.context 		= params.context;
		this.game 			= params.game;
	}
	
	MovingBubble.RADIUS_SIZE_DELTA = 0.35;
	MovingBubble.SPEED = 3.5;
	
	MovingBubble.prototype.draw = function() {
		if(this.expanding)
			this.radius += MovingBubble.RADIUS_SIZE_DELTA;
		
		this.context.beginPath();
		this.context.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
		this.context.fillStyle = this.color;
		this.context.closePath();
		this.context.fill();
	}
	
	MovingBubble.prototype.move = function() {
		this.game.bounceOffWall(this);
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}
	
	MovingBubble.prototype.isCollidedWith = function(bubble) {
		return Math.sqrt(Math.pow(this.pos[0] - bubble.pos[0], 2) + Math.pow(this.pos[1] - bubble.pos[1], 2)) <= this.radius + bubble.radius;
	}
	
	MovingBubble.prototype.isClicked = function(pos) {
		return Math.sqrt(Math.pow(this.pos[0] - pos[0], 2) + Math.pow(this.pos[1] - pos[1], 2)) <= this.radius;
	}
	
})();