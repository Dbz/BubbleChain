(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var Game = window.BubbleChain.Game = function(context, canvas) {
		this.context					= context;
		this.canvas						= canvas;
		this.bubbles					= [];
		this.firstClickColor	= ""; // Used in level 2
		this.timeLeft					= 8; // Used in level 4
		
		this.soundIndex = 0;	// Keep track of the next sound to play
		this.popSounds 	= [		// Multiple sounds for faster sound loading
			new Audio("bubblePop.mp3"),
			new Audio("bubblePop.mp3"),
			new Audio("bubblePop.mp3"),
			new Audio("bubblePop.mp3")
		];
	}
	
	Game.DIM_X 				= 700;
	Game.DIM_Y 				= 500;
	Game.RADIUS 			= 20;
	Game.MAX_RADIUS 	= 50;
	Game.NUM_BUBBLES 	= 25;
	
	Game.prototype.start = function(level) {
		// Add bubbles
		this.level						= level;
		this.firstClickColor	= ""; // Used in level 2
		this.bubbles					= [];
		this.addBubbles();
	}
	
	Game.prototype.begin = function() { // Fires when start-game menu is clicked
		if(this.level == 4)
			this.startTimer();
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
				level: this.level,
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
		// move to until
		return [Math.random() * (Game.DIM_X - Game.RADIUS * 2) + Game.RADIUS, Math.random() * (Game.DIM_Y - Game.RADIUS * 2) + Game.RADIUS];
	}
	
	Game.prototype.bounceOffWall = function(bubble) {
		// Mirror bubble velocity
		if(bubble.pos[0] - bubble.radius < 0 || bubble.pos[0] + bubble.radius > Game.DIM_X)
			bubble.vel[0] *= -1;

		if(bubble.pos[1] - bubble.radius < 0 || bubble.pos[1] + bubble.radius > Game.DIM_Y)
			bubble.vel[1] *= -1;
	}
	
	Game.prototype.moveFromWall = function(bubble) {
		// Move expanding bubble away from wall so it doesn't get stuck
		if(bubble.pos[0] - bubble.radius < 0)
			bubble.pos[0] += 1;
		if(bubble.pos[0] + bubble.radius > Game.DIM_X)
			bubble.pos[0] -= 1;
		if(bubble.pos[1] - bubble.radius < 0)
			bubble.pos[1] += 1;
		if(bubble.pos[1] + bubble.radius > Game.DIM_Y)
			bubble.pos[1] -= 1;
	}
	
	Game.prototype.checkCollisions = function() {
		// tells bubbles to expand; removes bubbles from list; changes score
		this.bubbles.forEach(function(bubble, i) {
			if(bubble.expanding) {
				this.bubbles.forEach(function(otherBubble) {
					if(bubble != otherBubble && bubble.isCollidedWith(otherBubble))
						otherBubble.expanding = true;
				});
				// Remove big bubbles; Change score if necessary
				if(bubble.radius >= Game.MAX_RADIUS) {
					this.changeLevelScore(bubble, "expand");
					this.bubbles.splice(i, 1);
					this.playSound();
				}
			}
		}.bind(this))
	}
	
	Game.prototype.playSound = function() {
		this.popSounds[this.soundIndex++].play();
		if(this.soundIndex >= this.popSounds.length)
			this.soundIndex = 0;
	}
	
	Game.prototype.step = function() {
		this.moveBubbles();
		this.checkCollisions();
		this.draw();
	}
	
	Game.prototype.chainReaction = function(event) {
		// Tells bubble to expand if clicked
		// Change the level score
		var x = event.pageX - this.canvas.offset().left;
		var y = event.pageY - this.canvas.offset().top;
		var bubble = this.findBubble([x, y]);
		if(~bubble && !bubble.expanding) {
			bubble.expanding = true;
			this.changeLevelScore(bubble, "click");
		}
	}
	
	Game.prototype.changeLevelScore = function(bubble, action) {
		if(this.level == 1) {
			if(action == "click")
				this.gameView.changeScore(-100)
		} else if(this.level == 2) {
			if(this.firstClickColor == "")
				this.firstClickColor = bubble.color;
			this.gameView.changeScore(this.firstClickColor == bubble.color ? 50 : -100)
		} else if(this.level == 3) {
			if(action == "click")
				this.gameView.changeScore(100);
		} else if(this.level == 4) {
			if(action == 'over')
				this.gameView.changeScore((-100) * this.bubbles.length)
		}
	}
	
	Game.prototype.levelBonus = function() {
		if(this.level == 1)
			return 1000;
		else if(this.level == 2)
			return 750;
		else if(this.level == 3)
			return 500;
		else if(this.level == 4)
			return 500;
		else
			return 250;
	}
	
	Game.prototype.findBubble = function(pos) {
		// Determines if bubble is clicked on
		var clicked = -1;
		this.bubbles.forEach(function(bubble) {
			if(bubble.isClicked(pos))
				clicked = bubble;
		});
		return clicked;
	}
	
	Game.prototype.setGameView = function(gameView) {
		this.gameView = gameView;
	}
	
	Game.prototype.roundOver = function() {
		if(this.level == 1)
			return this.bubbles.length == 0
		else if(this.level == 2) {
			if(this.firstClickColor == "")
				return false;
			var exists;
			this.bubbles.forEach(function(bubble) {
				if(bubble.color == this.firstClickColor)
					exists = true;
			}.bind(this));
			return !exists;
		} else if(this.level == 3)
			return this.bubbles.length == 0
		else if(this.level == 4)
			return this.timeLeft == -1
			
	}
	
	Game.prototype.startTimer = function() {
		var interval = setInterval(function() {
			this.gameView.setTimer(this.timeLeft)
			this.timeLeft -= 1;
			if(this.timeLeft < 0) {
				this.changeLevelScore(null, "over");
				clearInterval(interval);
			}
		}.bind(this), 1000);
	}
	
})();