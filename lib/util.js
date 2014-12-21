(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var Util = window.BubbleChain.Util = function() {
		
	}
	
	Util.randomColor = function(level) {
		var color = "rgba(";
		var attrs = [0.5];
		
		if(level == 1) {
			for(var x = 0; x < 3; x++)
				attrs.unshift(Math.round(Math.random() * 255));
		} else if(level == 2) {
			if(Math.round(Math.random())) 
				attrs.unshift("0", "255", "0")
			else
				attrs.unshift("0", "0", "255")
		} else if(level == 3) {
			attrs.unshift("175", "30", "215")
		} else if(level == 4) {
			for(var x = 0; x < 3; x++)
				attrs.unshift(Math.round(Math.random() * 255));
		}
		
		color += attrs.join(', ') + ")";
    return color;
	}
	
	Util.randomVel = function(speed) {
		var x = Math.random() * speed;
		var y = Math.random() * speed;
		if(Math.random() > .5)
			x *= -1;
		if(Math.random() > .5)
			y *= -1;
		return [x, y];
	}
})();