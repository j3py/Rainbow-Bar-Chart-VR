// Register new component to show/hide tooltip via aframe
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    // Get divs for the tooltip
    var tip = document.getElementById("ttip");
    var tipcont = document.getElementById("tipcontent");
    
    this.el.addEventListener('mouseenter', function () {
      let self = d3.select(this);
      tipcont.setAttribute("value", self.attr("data-x") + ":\r\n"  + self.attr("data-y") + " bytes");
      tipcont.setAttribute("opacity", "1.0");
      tip.setAttribute("opacity", "1.0");
    });

    this.el.addEventListener('mouseleave', function () {
      tipcont.setAttribute("opacity", "0.0");
      tip.setAttribute("opacity", "0.0");
    });
  }
});

// Register new component to toggle color wave via aframe
AFRAME.registerComponent('toggle-listener', {
  init: function () {
    // Get divs for the button
    var button = document.getElementById('button');
    var toggle = document.getElementById('toggle');
    
    var tflag = true;
    this.el.addEventListener('click', function() {
      button.setAttribute("depth", "0.0");
      
      if (tflag) {
        toggle.setAttribute("value", "Turn on");
        clearInterval(barFunInterval);
      } else {
        toggle.setAttribute("value", "Turn off");
        turnOnBarFun();
      }
      tflag = tflag ? false : true;
      setTimeout(function() {
        button.setAttribute("depth", "0.1");
      }, 500);
    });
  }
});