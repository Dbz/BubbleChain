(function() {
  window.BubbleChain = window.BubbleChain || {};
  
  var Util = window.BubbleChain.Util = function() {}
  
  Util.randomColor = function(level) {
    return window.BubbleChain.levels[level - 1].bubbleColor();
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