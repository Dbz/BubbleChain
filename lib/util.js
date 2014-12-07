(function() {
	if(typeof(BubbleChain) == 'undefined')
		window.BubbleChain = {};
	
	var Util = window.BubbleChain.Util = function() {
		
	}
	
	Util.randomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
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