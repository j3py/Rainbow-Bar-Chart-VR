var barFunInterval;
var turnOnBarFun;

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

    /* set y to scaleLinear() if you prefer, then start domain at 0 */
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLog().rangeRound([height, 0]);
  /* ************************************************************ */

  var scene = d3.select("a-scene");

  x.domain(data.map(function(d) { return d.language; }));

  /* set the beginning of your log scale if you need to */
  y.domain([700, d3.max(data, function(d) { return d.frequency; })]);
  /* ************************************************** */

  scene.append("a-plane")
    .attr("class", "axis axis--x")
    .attr("rotation", "-90 0 0")
    .attr("depth", 1)
    .attr("height", 200)
    .attr("width", 200)
    .attr("position", "0 -0.01 -6")
    .attr("material","color: #FFFFFF; roughness: 0; metalness: 1;")
    .call(d3.axisBottom(x));

  scene.selectAll(".bar")
    .data(data)
    .enter().append("a-box")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.language); })
    .attr("y", function(d) { return y(d.frequency); })
    .attr("data-x", function(d) { return d.language })
    .attr("data-y", function(d) { return d.frequency })
    .attr("depth", 1)
    .attr("width", 1)
    .attr("height", function(d) { return y(d.frequency); });

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
        "x": i * 2 - 5,
        "y": 0,
        "z": -8
      })
      self.transition()
        .delay(i*150)
        .attr("color", colors[count])
        .attr("width", 1.5)
        .attr("depth", 1.5)
        .duration(150)
        .ease(d3.easeLinear)
        .transition()
        .attr("width", 1)
        .attr("depth", 1)
        .duration(150)
        .ease(d3.easeLinear);

      this.setAttribute("cursor-listener", "");
    });

    count++;
  };

  barFun();

  turnOnBarFun = function() {
    barFunInterval = setInterval(barFun, (data.length * 150) + 150);
    return;
  }

  turnOnBarFun();
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