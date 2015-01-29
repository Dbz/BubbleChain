(function() {
  window.BubbleChain = window.BubbleChain || {};
  
  var Bubble  = window.BubbleChain.Bubble = function(params) {
    this.expanding  = false;
    this.pos        = BubbleChain.Util.randomPos();
    this.vel        = BubbleChain.Util.randomVel(Bubble.SPEED);
    this.radius     = params.radius;
    this.color      = BubbleChain.Util.randomColor(params.level, params.bubbleNum);
    this.context    = params.context;
    this.bubbleNum  = params.bubbleNum;
  }
  
  Bubble.RADIUS_SIZE_DELTA  = 0.4;
  Bubble.SPEED              = 3.5;
  
  Bubble.prototype.draw = function() {    
    this.context.beginPath();
    this.context.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    this.context.fillStyle = this.color;
    this.context.closePath();
    this.context.fill();
  }
  
  Bubble.prototype.move = function() {
    // Increase bubble size if expanding and move it away from wall if it is outside boundaries
    if(this.expanding) {
      this.radius += Bubble.RADIUS_SIZE_DELTA;
      this.moveFromWall();
    }
    
    this.bounceOffWall();
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
  
  Bubble.prototype.bounceOffWall = function() {
    // Mirror velocity
    if(this.pos[0] - this.radius < 0 || this.pos[0] + this.radius > BubbleChain.Game.DIM_X)
      this.vel[0] *= -1;

    if(this.pos[1] - this.radius < 0 || this.pos[1] + this.radius > BubbleChain.Game.DIM_Y)
      this.vel[1] *= -1;
  }
  
  Bubble.prototype.moveFromWall = function() {
    // Move expanding bubble away from wall so it doesn't get stuck
    if(this.pos[0] - this.radius < 0)
      this.pos[0] += BubbleChain.Game.WALL_BUFFER;
    if(this.pos[0] + this.radius > BubbleChain.Game.DIM_X)
      this.pos[0] -= BubbleChain.Game.WALL_BUFFER;
    if(this.pos[1] - this.radius < 0)
      this.pos[1] += BubbleChain.Game.WALL_BUFFER;
    if(this.pos[1] + this.radius > BubbleChain.Game.DIM_Y)
      this.pos[1] -= BubbleChain.Game.WALL_BUFFER;
  }
  
  Bubble.prototype.isCollidedWith = function(bubble) {
    // Distance between bubbles is less than the sum of their radii
    return Math.sqrt(Math.pow(this.pos[0] - bubble.pos[0], 2) + Math.pow(this.pos[1] - bubble.pos[1], 2)) <= this.radius + bubble.radius;
  }
  
  Bubble.prototype.isClicked = function(pos) {
    return Math.sqrt(Math.pow(this.pos[0] - pos[0], 2) + Math.pow(this.pos[1] - pos[1], 2)) <= this.radius;
  }
  
})();