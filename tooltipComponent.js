// Define the div for the tooltip via d3
var tip = d3.select("#ttip")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
// Component to show/hide tooltip via aframe
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('mouseenter', function (evt) {
      let self = d3.select(this);
      let color = self.style('fill');
      self.style('opacity', 0.45);
      tip.transition()		
        .duration(200)		
        .style("opacity", 1.0);		
      tip.html("<div style='margin-top:20px;'>" + self.attr("data-x") + ":<br/>"  + self.attr("data-y") + " bytes </div>")	
        .style("left", 51 + "%")		
        .style("top", 40 + "%")
        .style('color', color);	
    });

    this.el.addEventListener('mouseleave', function (evt) {
      let self = d3.select(this);
      self.style('opacity', 1.0);
      tip.transition()		
        .duration(500)		
        .style("opacity", 0);
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