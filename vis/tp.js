
var width = 1000;
var height = 1000;
var r= 20;
var color = d3.scaleLinear()
    .range(["steelblue", "brown"])
    .interpolate(d3.interpolateHcl)
    .domain([0, 200]);

var svg = d3.select("#chartTP")
    .append('svg')
    .attr('width', width )
    .attr('height', height)
    //.style('background-color', color(0));

//a. Déclaration de fonction : 
var fisheye = d3.fisheye.circular()
    .radius(100)
    .distortion(5);

// magnifier as circle
// var lens = svg.append("circle")
//     .attr("r", fisheye.radius())
//     .style("stroke", "black")
//     .style("stroke-width", 2)
//     .style("fill", "none");

d3.json("/TP/ressource/data copy 2.json", function (data) {
    console.log(data)
    
    var lines = svg.selectAll("line")
        .data(data.links)
        .enter()
        .append("line");
    
    var lineAttributes = lines
        .attr("x1", function (d) { var srcc=d.source
            //console.log( data.nodes[srcc-1] )
            return  data.nodes[srcc-1].x * 1000; })
        .attr("y1", function (d) { var srcc=d.source 
            return data.nodes[srcc-1].y * 1000; })
        .attr("x2", function (d) { var destt=d.target
            return data.nodes[destt-1].x * 1000; })
        .attr("y2", function (d) { var destt=d.target
            return data.nodes[destt-1].y * 1000; })
        .style("stroke","gray")
        .style('stroke-width', function (d) {return d.value*10/12});
    
    var circles = svg.selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle");
    
    var circleAttributes = circles
        .attr("cx", function (d) { return d.x * 1000; })
        .attr("cy", function (d) { return d.y * 1000; })
        .attr("r", r)
        .style("fill", function (d) {
            switch(d.group) {
                case 1:
                  return "#CD34B5"
                case 2:
                  return "#2B0089"
                case 3:
                    return "#00C5FF"
                case 4:
                  return "#3B41E9"
              }            
        });

    var texts = svg.selectAll("text")
        .data(data.nodes)
        .enter()
        .append("text");
      
    var textAttributes = texts
        .attr("x", function (d) { return d.x * 1000; })
        .attr("y", function (d) { return d.y * 1000; })
        .text(function (d) { return d.name; })
        .style("text-anchor","middle")
        .style("font-size", 13)
        .attr("font-weight", "bold")
        .style("fill", function (d) {
            switch(d.group) {
                case 1:
                  return "black"
                case 2:
                  return "white"
                case 3:
                    return "black"
                case 4:
                  return "black"
              }            
        });
    
    // c. Ajout l’interaction sur chaque position à l’svg 
    // svg.on("mousemove", function() {
    //     var mouse = d3.mouse(this)
    //     var mouseX = mouse[0]
    //     var mouseY = mouse[1]

    //     fisheye.focus(mouse);
    //     // display magnifier as circle
    //     lens
    //         .attr("cx", mouseX)
    //         .attr("cy", mouseY);

    //     circles.each(function(d) { 
    //         d.fisheye = fisheye(d);
    //         console.log("this is d: ",d," this is fisheye of d: ", d.fisheye)
    //     })
    //         .attr("cx", function(d) { return d.fisheye.x*1000; })
    //         .attr("cy", function(d) { return d.fisheye.y*1000; })
    //         //.attr("r", function(d) { return d.fisheye.z*4.5; });
    //         .attr("r", function(d) { return r*1.5; });

    //     lines.attr("x1", function(d) { return data.nodes[d.src-1].fisheye.x * 1000; })
    //         .attr("y1", function(d) { return data.nodes[d.src-1].fisheye.y * 1000; })
    //         .attr("x2", function(d) { return data.nodes[d.dest-1].fisheye.x * 1000; })
    //         .attr("y2", function(d) { return data.nodes[d.dest-1].fisheye.y * 1000; });
    // });
    })


      