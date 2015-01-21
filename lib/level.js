(function() {
  if(typeof(BubbleChain) == "undefined")
    window.BubbleChain = {};
  
  var Level = window.BubbleChain.Level = function(levelNumber, timer, numBubbles) {
    this.number       = levelNumber;
    this.timer        = timer || Level.DEFAULT_TIME;
    this.numBubbles   = numBubbles || Level.DEFAULT_BUBBLES;
    this.instructions = "It appears there is bug! Click all the bubbles for fun.";
  }
  
  Level.DEFAULT_TIME    = 0; // Zero for no timer
  Level.DEFAULT_BUBBLES = 25;
  
  // Returns the amount to change the score
  Level.prototype.scoreChange = function(bubble, action, lastClickedColor, bubbles) { } // Possible events: click, over, pop
  
  Level.prototype.isOver = function(bubbles, timeLeft, lastClickedColor) {}
  
  Level.prototype.bubbleColor = function(bubbleNum) { // Default is random color
    var color = "rgba(";
    var attrs = ["0.7"];
    for(var x = 0; x < 3; x++)
      attrs.unshift(Math.round(Math.random() * 170) + 85);
    color += attrs.join(', ') + ")";
    return color;
  }
  
})();