/*
TODO:
1 - can select bars to grey out other bars
2 - 2 modes, stacked bar and severity
*/

//define the margins
var margin = {top: 10, right: 40, bottom: 150, left: 70},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//define the svg
var svg = d3.select(".chart").append("svg") //will need to change body to something else
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
console.log(svg);
//color scale data
var colorRange = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'];
var colorDomain = [];

//scales
var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var yScale = d3.scaleLinear().range([height, 0]);
var cScale = d3.scaleThreshold().range(colorRange);

//create the x and y axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale); //.ticks .tickformat



d3.csv("data/AggregateInjuries(1).csv", function(error, data) {
    data.forEach(function(d) {
        d.type = d.injury_type;
        d.number = +d.num_injuries;
        d.severity = +d.total_severity / +d.num_injuries;
    });
    
    //block for color scale domain
    cMax = d3.max(data, function(d) { return d.severity; });
    cMin = d3.min(data, function(d) { return d.severity; }); //maybe try 0 to see impact
    
    d = (cMax - cMin)/5;
    
    colorDomain = [8, 9, 12, 13, 15];
    
    console.log(colorDomain);
    
    //update the domains of the scales with the data
    xScale.domain(data.map(function(d) { return d.type; }));
    yScale.domain([0, d3.max(data, function(d) { return d.number; })]);
    cScale.domain(colorDomain);
    
    //draw the bars
    var bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", height)
        .attr("height", 0)
        .attr("width", xScale.bandwidth())
        .attr("x", function(d) {
            return xScale(d.type);
        })
        .transition().ease(d3.easeCubic).duration(1200)
        .delay(function(d,i) { return i*100; })
        .attr("y", function(d) {
            return yScale(d.number);
        })
        .attr("height", function(d) {
            return height - yScale(d.number);
        })
        .attr("stroke", "#000000")
        .attr("fill", function(d) {
            return(cScale(d.severity))
        });
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-0.8em")
        .attr("dy", ".25em")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-60)");
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text");
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -1*margin.left)
        .attr("x", -1*(height/2))
        .attr("dy", "1.5em")
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .text("Number of Injuries");
    
    var ls_w = 40, ls_h = 20;
    
    var legend = svg.selectAll("g.legend")
        .data(colorDomain)
        .enter().append("g")
        .attr("class", "legend");
    
    legend.append("rect")
        .attr("x", function(d,i) { return width - (i*ls_w) - 50; })
        .attr("y", function(d, i){ return 80 - (ls_h) - 2*ls_h; })
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill", function(d, i) {
            return cScale(d-1); 
        })
        .attr("stroke", "#000000");
    
    legend.append("text")
        .attr("x", function(d, i){ return width - (i*ls_w) - 35; })
        .attr("y", function(d, i){ return 80 - (ls_h) - ls_h + 15; })
        .style("text-align", "middle")
        .text(function(d, i){ return colorDomain[i]; });
    
    svg.append("text")
        .attr("x", width - 212)
        .attr("y", 10)
        .style("font-family", "sans-serif")
        .style("font-size", "11pt")
        .text("Injury Severity (Games Missed)")
})