(function() {
  if(typeof(BubbleChain) == "undefined")
    window.BubbleChain = {};
  
  var Level = window.BubbleChain.Level = function(levelNumber) {
    this.levelNumber = levelNumber;
  }
  
  Level.prototype.changeScore = function(bubble, event) {
    // Possible events: click, over, pop
  }
  
  Level.prototype.isOver = function(bubblesLeft, timeLeft, firstClickColor) {
    
  }
  
  Level.prototype.bubbleColor = function() {
    
  }
  
  
})();