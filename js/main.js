/* Script by Jamp Vongkusolkit, 2019 */

//example1
window.onload = function() {

  //SVG dimension variables
  var w = 900, h = 500;

  var cityPop = [
      {
          city: 'Yokohama',
          population: 3725000
      },
      {
          city: 'Kyoto',
          population: 1475000
      },
      {
          city: 'Osaka',
          population: 2691000
      },
      {
          city: 'Kanazawa',
          population: 465699
      }
  ];
  //Example 1.5 line 1...container block
  var container = d3.select("body") //get the <body> element from the DOM
      .append("svg") //put a new svg in the body
      .attr("width", w) //assign the width
      .attr("height", h) //assign the height
      .attr("class", "container") //assign a class name
      .style("background-color", "rgba(0,0,0,0.2)"); //svg background color


  //Example 1.8 line 1...innerRect block
  var innerRect = container.append("rect")
      .datum(400) //a single value is a DATUM
      .attr("width", function(d){ //rectangle width
          return d * 2; //400 * 2 = 800
      })
      .attr("height", function(d){ //rectangle height
          return d; //400
      })
      .attr("class", "innerRect") //class name
      .attr("x", 50) //position from left on the x (horizontal) axis
      .attr("y", 50) //position from top on the y (vertical) axis
      .style("fill", "#FFFFFF"); //fill color


  //find the minimum value of the array
  var minPop = d3.min(cityPop, function(d){
      return d.population;
  });

  //find the maximum value of the array
  var maxPop = d3.max(cityPop, function(d){
      return d.population;
  });

  //scale for circles center x coordinate
  var x = d3.scaleLinear() //create the scale
      .range([120, 720]) //output min and max
      .domain([0, 3]); //input min and max


  //scale for circles center y coordinate
  var y = d3.scaleLinear()
      .range([450, 50]) //was 440, 95
      .domain([0, 4500000]); //was minPop, maxPop


  //color scale generator
  var color = d3.scaleLinear()
      .range([
          "#edf8fb",
          "#88419d"
      ])
      .domain([
          minPop,
          maxPop
      ]);


  //Example 2.6 line 3
  var circles = container.selectAll(".circles") //create an empty selection
      .data(cityPop) //here we feed in an array
      .enter() //one of the great mysteries of the universe
      .append("circle") //inspect the HTML--holy crap, there's some circles there
      .attr("class", "circles")
      .attr("id", function(d){
          return d.city;
      })
      .attr("r", function(d){
          //calculate the radius based on population value as circle area
          var area = d.population * 0.0015;
          return Math.sqrt(area/Math.PI);
      })
      .attr("cx", function(d, i){
          //use the index to place each circle horizontally
          return x(i);
      })
      .attr("cy", function(d){
          //subtract value from 400 to "grow" circles up from the bottom instead of down from the top of the SVG
          return y(d.population);
      })
      .style("fill", function(d, i){ //add a fill based on the color scale generator
          return color(d.population);
      })
      .style("stroke", "#000"); //black circle stroke


  //create y axis generator
  var yAxis = d3.axisLeft(y);

  //create axis g element and add axis
  var axis = container.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(50, 0)")
      .call(yAxis);

  //create a text element and add the title
  var title = container.append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("x", 450)
      .attr("y", 30)
      .text("City Populations");


  //create circle labels
  var labels = container.selectAll(".labels")
      .data(cityPop)
      .enter()
      .append("text")
      .attr("class", "labels")
      .attr("text-anchor", "left")
      .attr("y", function(d){
          //vertical position centered on each circle
          return y(d.population) + 5;
      });

  //first line of label
  var nameLine = labels.append("tspan")
      .attr("class", "nameLine")
      .attr("x", function(d,i){
          //horizontal position to the right of each circle
          return x(i) + Math.sqrt(d.population * 0.0015 / Math.PI) + 5;
      })
      .text(function(d){
          return d.city;
      });

  //create format generator
  var format = d3.format(",");

  //second line of label
  var popLine = labels.append("tspan")
      .attr("class", "popLine")
      .attr("x", function(d,i){
          return x(i) + Math.sqrt(d.population * 0.0015 / Math.PI) + 5;
      })
      .attr("dy", "15") //vertical offset
      .text(function(d){
          return "Pop. " + format(d.population); //use format generator to format numbers
      });

};
