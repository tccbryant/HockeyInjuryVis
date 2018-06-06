//source: 
//-https://bl.ocks.org/d3noob/013054e8d7807dff76247b81b0e29030
//TODO: 
//  -node color
//  -ribbon color
//  -do something when a node is clicked


var units = "injuries";

//color scale data
var colorRange = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15', '#8dd3c7', '#ffffb3', '#bebada', '#80b1d3'];

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = window.innerWidth -50 - margin.left - margin.right,
    height = window.innerHeight- margin.top - margin.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scaleOrdinal(d3.schemeCategory20);

// append the svg object to the body of the page
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(75)
    .size([width, height]);

var path = sankey.link();

var translation = ["8","9","12","13","15", //based on sev_scale
                   "F","G","D",
                   "Lower body", "Upper body","Leg", "Head", "Foot", "Hand", "Groin", "Shoulder", "Back", "Face", "Torso", "Arm", "Neck"]
//load csv data
d3.csv("AggregateInjuries(1).csv", function(error, data) {
    
    data.forEach(function(d,i) {
        d.injuries_d=+d.injuries_d;
        d.injuries_f=+d.injuries_f;
        d.injuries_g=+d.injuries_g;
        d.type = d.injury_type;
        d.number = +d.num_injuries;
        d.severity = +d.total_severity / +d.num_injuries;
    });
    console.log( data[0]);
    // load the json data
    d3.json("sankey.json", function(error, graph) {
        /*graph.nodes.forEach(function(d,i){
           console.log(d); 
        });*/
        for (var i = 0; i < data.length; i++) {
            var type = data[i].type;
            var node_num = translation.indexOf(type);
            //console.log(type, node_num);
            var sev_node_num = sev_scale(data[i].severity);
            var num_injuries = data[i].number;
            var num_f = data[i].injuries_f;
            var num_g = data[i].injuries_g;
            var num_d = data[i].injuries_d;
            
            for(var j = 0; j < graph.links.length; j++){
                if( graph.links[j].source==node_num){
                    if( graph.links[j].target==5){
                        graph.links[j].value=num_f;
                        //console.log( graph.links[j]);
                    }else if( graph.links[j].target==6){
                        graph.links[j].value=num_g;
                        //console.log( graph.links[j]);
                    }else if( graph.links[j].target==7){
                        graph.links[j].value=num_d;
                        //console.log( graph.links[j]);
                    }
                }else if(graph.links[j].target==node_num){
                    if( graph.links[j].source==sev_node_num){
                        graph.links[j].value = num_injuries;
                        //console.log(graph.links[j]);
                    }
                }
            }
        }
    
    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(0);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
    .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(0, d.dy); });
        //.sort(function(a, b) { return b.dy - a.dy; });

    // add the link titles
    link.append("title")
        .text(function(d) {
            return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

    var min_height = 0
    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
    .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")"; })
        /*.call(d3.drag()
        .subject(function(d) {
            return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));*/

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) { 
            console.log(d)
            return d.color = get_color(d.node);})
            //return d.color = color(d.name.replace(/ .*/, "")); })
        .style("stroke", function(d) { 
            return d3.rgb(d.color).darker(2); })
        .append("title")
        .text(function(d) { 
            return d.name + "\n" + format(d.value); });

    // add in the title for the nodes
    node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    // the function for moving the nodes
    function dragmove(d) {
    d3.select(this)
      .attr("transform", 
            "translate(" 
               + d.x + "," 
               + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
                 ) + ")");
    sankey.relayout();
    link.attr("d", path);
    }
    });
});

function sev_scale(num){
    if( num < 8){
        return 0;
    }else if( num < 9){
        return 1;
    }else if( num < 12){
        return 2;
    }else if( num < 13){
        return 3;
    }else{
        return 4
    }
}

function get_color(num){
    if( num <= 8){
        return colorRange[num]
    }else{
        return "#80b1d3"
    }
}