(function() {
  window.BubbleChain = window.BubbleChain || {};
  
  var level1 = new BubbleChain.Level(1);              // THIS IS LEVEL 1
  level1.instructions = "Click a bubble and it will expand and pop. Expanding bubbles will pop nearby bubbles.";
  level1.scoreChange = function(bubble, action, lastClickedColor, bubbles) {
    if(action == "click")
      return 1;
    else if(action == "over")
      return 50;
    else
      return 0;
  }
  level1.isOver = function(bubbles, timeLeft, lastClickedColor) {
    return bubbles.length == 0;
  }
  
  var level2 = new BubbleChain.Level(2);              // THIS IS LEVEL 2
  level2.instructions = "Only pop GREEN bubbles. You get 5pts for every green bubble and LOSE 10pts for every BLUE bubble.";
  level2.scoreChange = function(bubble, action, lastClickedColor) {
    if(action == "pop")
      return bubble.color == "rgba(0, 255, 0, 0.7)" ? 5 : -10;
    else if(action == "over")
      return 40;
    else
      return 0;
  }
  level2.isOver = function(bubbles, timeLeft, lastClickedColor) {
    var exists;
    bubbles.forEach(function(bubble) {
      if(bubble.color == "rgba(0, 255, 0, 0.7)")
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
  level3.instructions = "Click a bubble before it expands and get 10pts.";
  level3.scoreChange = function(bubble, action, lastClickedColor, bubbles) {
    if(action == "click")
      return 10;
    else if(action == "over")
      return 30;
    else
      return 0;
  }
  level3.isOver = function(bubbles, timeLeft, lastClickedColor) {
    return bubbles.length == 0;
  }
  level3.bubbleColor = function() {
    var color = "rgba(";
    var attrs = ["0.7"];
    attrs.unshift("175", "30", "215");
    color += attrs.join(', ') + ")";
    return color;
  }

  var level4 = new BubbleChain.Level(4, 10);              // THIS IS LEVEL 4
  level4.instructions = "Penalty Round! Lose 30pts for every bubble remaining after the timer runs out!";
  level4.scoreChange = function(bubble, action, lastClickedColor, bubbles) {
    if(action == "over")
      return (-30) * bubbles.length + 100;
    else
      return 0;
  }
  level4.isOver = function(bubbles, timeLeft, lastClickedColor) {
    return timeLeft == -1;
  }

  var level5 = new BubbleChain.Level(5, 7);              // THIS IS LEVEL 5
  level5.instructions = "Gain 10pts for every bubble popped before the timer runs out!";
  level5.scoreChange = function(bubble, action, lastClickedColor, bubbles) {
    if(action == "pop")
      return 10;
    else if(action == "over")
      return 100;
    else
      return 0;
  }
  level5.isOver = function(bubbles, timeLeft, lastClickedColor) {
    return timeLeft == -1;
  }
  
  window.BubbleChain.levels = [level1, level2, level3, level4, level5];
  
})();