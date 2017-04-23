window.addEventListener("DOMContentLoaded", function () {
  var grapher = function(rawData) {
    // for testing
  //  var data = [
  //    {
  //      'language': 'js',
  //      'frequency': 1000.0
  //    },
  //    {
  //      'language': 'python',
  //      'frequency': 655.0
  //    },
  //    {
  //      'language': 'html',
  //      'frequency': 200.0
  //    }
  //  ];

    // the real thing
    var languages = Object.keys(rawData);
    var data = languages.map(function(language) {
      return { 'language': language, 'frequency': rawData[language] };
    });

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 20,
        height = 20;

    // Define the div for the tooltip
    var tip = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

      /* set y to scaleLinear() if you prefer, then start domain at 0 */
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLog().rangeRound([height, 0]);
    /* ************************************************************ */

    var scene = d3.select("a-scene");

    x.domain(data.map(function(d) { return d.language; }));

    /* set the beginning of your log scale if you need to */
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    /* ************************************************** */

    scene.append("a-plane")
      .attr("class", "axis axis--x")
      .attr("rotation", "-90 0 0")
      .attr("height", height)
      .attr("width", 20)
      .attr("position", "0 0.5 -6")
      .attr("color", "black")
      .call(d3.axisBottom(x));

    scene.append("a-plane")
      .attr("class", "axis axis--y")
      .attr("rotation", "0 -90 0")
      .attr("height", height)
      .attr("width", 2)
      .attr("position", "-2 0.5 -6")
      .attr("color", "black")
      .call(d3.axisLeft(y).ticks(10, ''))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    scene.selectAll(".bar")
      .data(data)
      .enter().append("a-box")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.language); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("depth", 1)
      .attr("width", 1)
      .attr("height", function(d) { return d.frequency/100.0; });

    var bars = d3.selectAll(".bar");
    var count = 0;
    var barFun = function() {
      var colors = [
        "#0C8EE8",
        "#E600FF",
        "#E8720C",
        "#CAFF0A"
       ];

      if (count > 3) {
        count = 0;
      }

      bars.each(function(d, i) {
          var self = d3.select(this);
          self.attr("position", {
            "x": i * 2 - 2,
            "y": 0,
            "z": -6
          })
          self.transition()
            .delay(i*150)
            .attr("color", colors[count])
            .duration(150)
            .ease(d3.easeLinear);
      });

      count++;
    };

    barFun();

    var barFunInterval;
    var turnOnBarFun = function() {
      barFunInterval = setInterval(barFun, (data.length * 150) + 150);
      return;
    }

    turnOnBarFun();

    bars.each(function(d, i) {
      var self = d3.select(this);
      self.on('mouseover', function() {
          let color = self.style('fill');
        self.style('opacity', 0.45);
        tip.transition()		
          .duration(200)		
          .style("opacity", 1.0);		
        tip.html(d.language + ":<br/>"  + d.frequency + ' bytes')	
          .style("left", (d3.event.pageX) + "px")		
          .style("top", (d3.event.pageY - 90) + "px")
          .style('color', color);	
      }).on('mouseout', function() {
          self.style('opacity', 1.0);
        tip.transition()		
          .duration(500)		
          .style("opacity", 0);	
        });
    });

    var toggle = document.getElementById('toggle');
    var tflag = true;
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('regPad');
      toggle.classList.toggle('smPad');
      toggle.classList.toggle('btnColors');

      if (tflag) {
        toggle.innerText = "Turn color wave on";
        clearInterval(barFunInterval);
      } else {
        toggle.innerText = "Turn color wave off";
        turnOnBarFun();
      }
      tflag = tflag ? false : true;
      setTimeout(function() {
        toggle.classList.toggle('regPad');
        toggle.classList.toggle('smPad');
      }, 150);
    });
  };

  var respData = {};

  /* put in your username instead of "j3py"! */
  var urls = ['https://api.github.com/users/j3py/repos'];
  /* *************************************** */

  var requester = function(url, flag, callback) {
    var gitReq = new XMLHttpRequest();
    gitReq.onload = function() {
      if ((gitReq.status >= 200) && (gitReq.status <= 400)) {
        var gitJson = JSON.parse(gitReq.response);
        if (flag) {
          var langArray = gitJson.map(function(repo) {
            return repo.languages_url;
          });

          langArray.forEach(function(langUrl, i) {
            if (i < langArray.length-1) {
              return requester(langUrl, false, false);
            }
            if (i === langArray.length-1) {
              return requester(langUrl, false, function(rawData) {
                return grapher(rawData);
              });
            }
          });
        } else {
          var keys = Object.keys(respData);
          for (let lang in gitJson) {
            if (keys.includes(lang)) {
              respData[lang] = respData[lang] + gitJson[lang];
            } else {
              respData[lang] = gitJson[lang];
            }
          }
        }
        if (callback) {
          return callback(respData);
        }
      } else {
        return alert('Response status:' + gitReq.response);
      }
    };
    gitReq.open('GET', url);
    gitReq.send();
  };
  urls.forEach(function(url) {
    // for testing
  //  grapher();

    // the real thing
    requester(url, true, false);
  });
});