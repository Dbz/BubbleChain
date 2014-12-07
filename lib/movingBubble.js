(function() {
	if(typeof(BubbleChain) == "undefined")
		window.BubbleChain = {};
	
	var MovingBubble = window.BubbleChain.MovingBubble = function(params) {
		this.expanding = false;
		this.pos = params.pos;
		this.vel = window.BubbleChain.Util.randomVel(3);
		this.radius = params.radius;
		this.color = BubbleChain.Util.randomColor();
		this.context = params.context;
		this.game = params.game;
	}
	
	MovingBubble.prototype.draw = function() {
		this.context.beginPath();
		this.context.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
		this.context.fillStyle = this.color;
		this.context.closePath();
		this.context.fill();
	}
	
	MovingBubble.prototype.move = function() {
		this.vel = this.game.bounceOffWall(this.pos, this.vel);
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}
	
	MovingBubble.prototype.isCollidedWith = function(bubble) {
		return Math.sqrt(Math.pow(this.pos[0] - bubble.pos[0], 2) + Math.pow(this.pos[1] - bubble.pos[1], 2)) <= this.radius * 2
	}
})();