(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var Util = window.BubbleChain.Util = function() {
		
	}
	
	Util.randomColor = function() {
		var color = "rgba(";
		var attrs = [0.5];
		for(var x = 0; x < 3; x++)
			attrs.unshift(Math.round(Math.random() * 255));
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