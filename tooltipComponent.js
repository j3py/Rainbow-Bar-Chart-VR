// Get divs for the tooltip
var tip = document.getElementById("ttip");
var tipcont = document.getElementById("tipcontent");
// Register new component to show/hide tooltip via aframe
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('mouseenter', function (evt) {
      let self = d3.select(this);
      tipcont.setAttribute("value", self.attr("data-x") + ":\r\n"  + self.attr("data-y") + " bytes");
      tipcont.setAttribute("opacity", "1.0");
      tip.setAttribute("opacity", "1.0");
    });

    this.el.addEventListener('mouseleave', function (evt) {
      tipcont.setAttribute("opacity", "0.0");
      tip.setAttribute("opacity", "0.0");
    });
  }
});


/*  this was the tooltip method before VR refactor  */
/*  it lived in rainbowchartvr.js after the turnOnBarFun method call  */

//    bars.each(function(d, i) {
//      var self = d3.select(this);
//      self.on('mouseover', function() {
//          let color = self.style('fill');
//        self.style('opacity', 0.45);
//        tip.transition()		
//          .duration(200)		
//          .style("opacity", 1.0);		
//        tip.html(d.language + ":<br/>"  + d.frequency + ' bytes')	
//          .style("left", (d3.event.pageX) + "px")		
//          .style("top", (d3.event.pageY - 90) + "px")
//          .style('color', color);	
//      }).on('mouseout', function() {
//          self.style('opacity', 1.0);
//        tip.transition()		
//          .duration(500)		
//          .style("opacity", 0);	
//        });
//    });