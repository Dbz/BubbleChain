(function() {
  window.BubbleChain = window.BubbleChain || {};
  
  var level1 = new BubbleChain.Level(1);              // THIS IS LEVEL 1
  level1.scoreChange = function(bubble, action, firstClickColor, bubbles) {
    if(action == "click")
      return 10;
    else if(action == "over")
      return 100;
    else
      return 0;
  }
  level1.isOver = function(bubbles, timeLeft, firstClickColor) {
    return bubbles.length == 0;
  }
  
  var level2 = new BubbleChain.Level(2);              // THIS IS LEVEL 2
  level2.scoreChange = function(bubble, action, firstClickColor) {
    if(action == "pop") {
      return firstClickColor == bubble.color ? 50 : -100;
    }
    else if(action == "over")
      return 100;
    else
      return 0;
  }
  level2.isOver = function(bubbles, timeLeft, firstClickColor) {
    if(firstClickColor == "")
      return false;
    var exists;
    bubbles.forEach(function(bubble) {
      if(bubble.color == firstClickColor)
        exists = true;
    }.bind(this));
    return !exists;
  }
  level2.bubbleColor = function() {
    var color = "rgba(";
    var attrs = ["0.7"];
    if(Math.round(Math.random()))
      attrs.unshift("0", "255", "0");
    else
      attrs.unshift("0", "0", "255");
    color += attrs.join(', ') + ")";
    return color;
  }

  var level3 = new BubbleChain.Level(3);              // THIS IS LEVEL 3
  level3.scoreChange = function(bubble, action, firstClickColor, bubbles) {
    if(action == "click")
      return 100;
    else if(action == "over")
      return 100;
    else
      return 0;
  }
  level3.isOver = function(bubbles, timeLeft, firstClickColor) {
    return bubbles.length == 0;
  }
  level3.bubbleColor = function() {
    var color = "rgba(";
    var attrs = ["0.7"];
    attrs.unshift("175", "30", "215");
    color += attrs.join(', ') + ")";
    return color;
  }

  var level4 = new BubbleChain.Level(4, 8);              // THIS IS LEVEL 4
  level4.scoreChange = function(bubble, action, firstClickColor, bubbles) {
    if(action == "over")
      return (-100) * bubbles.length + 100;
    else
      return 0;
  }
  level4.isOver = function(bubbles, timeLeft, firstClickColor) {
    return timeLeft == -1;
  }

  var level5 = new BubbleChain.Level(5, 8);              // THIS IS LEVEL 5
  level5.scoreChange = function(bubble, action, firstClickColor, bubbles) {
    if(action == "pop")
      return 25;
    else if(action == "over")
      return 200;
    else
      return 0;
  }
  level5.isOver = function(bubbles, timeLeft, firstClickColor) {
    return timeLeft == -1;
  }
  
  window.BubbleChain.levels = [level1, level2, level3, level4, level5];
  
})();