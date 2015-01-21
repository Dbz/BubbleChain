(function() {
  window.BubbleChain = window.BubbleChain || {};
  
  var Util = window.BubbleChain.Util = function() {}
  
  Util.randomColor = function(level, bubbleNum) {
    return window.BubbleChain.levels[level - 1].bubbleColor(bubbleNum);
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
  
  Util.randomPos = function() {
    return [Math.random() * (BubbleChain.Game.DIM_X - BubbleChain.Game.RADIUS * 2) + BubbleChain.Game.RADIUS, Math.random() * (BubbleChain.Game.DIM_Y - BubbleChain.Game.RADIUS * 2) + BubbleChain.Game.RADIUS];
  }
})();