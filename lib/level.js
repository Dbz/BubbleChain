(function() {
  if(typeof(BubbleChain) == "undefined")
    window.BubbleChain = {};
  
  var Level = window.BubbleChain.Level = function(levelNumber, timer) {
    this.levelNumber  = levelNumber;
    this.timer        = timer || 0;
  }
  
  // Returns the amount to change the score
  Level.prototype.scoreChange = function(bubble, action, firstClickColor, bubbles) { } // Possible events: click, over, pop
  
  Level.prototype.isOver = function(bubbles, timeLeft, firstClickColor) {}
  
  Level.prototype.bubbleColor = function() { // Default is random color
    var color = "rgba(";
    var attrs = ["0.7"];
    for(var x = 0; x < 3; x++)
      attrs.unshift(Math.round(Math.random() * 170) + 85);
    color += attrs.join(', ') + ")";
    return color;
  }
  
})();