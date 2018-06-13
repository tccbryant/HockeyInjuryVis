var bar_chart = (function(){
function init(){
    /*
    TODO:
    1 - can select bars to grey out other bars
    2 - 2 modes, stacked bar and severity
    */

    //define the margins
    var margin = {top: 10, right: 40, bottom: 150, left: 70},
        width = 760 - margin.left - margin.right,
        height = 510 - margin.top - margin.bottom;

    //define the svg
    var svg = d3.select(".bar-chart").append("svg") //will need to change body to something else
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
    var lScale = d3.scaleLinear().domain([5, 15]).range([0, 240]);

    //create the x and y axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale); //.ticks .tickformat
    var lAxis = d3.axisBottom(lScale)
        .tickSize(13)
        .tickValues(cScale.domain())
        .tickFormat(function(d) { return d3.format(".0f")(d); });



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

        console.log(cMax + ", " + cMin);

        //update the domains of the scales with the data
        xScale.domain(data.map(function(d) { return d.type; }));
        yScale.domain([0, 1.05*d3.max(data, function(d) { return d.number; })]);
        cScale.domain(colorDomain);
        lAxis.tickValues(cScale.domain());

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
        
        svg.selectAll("text")
            .data(data)
            .enter().append("text")
            .attr("text-anchor", "middle")
            .attr("x", function(d) { return xScale(d.type) + 20; })
            .attr("y", function(d) { return yScale(d.number) - 5; })
            .style("font-size", "10px")
            .text(function(d) { return d.number; });
        

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

        
        var g = svg.append("g")
            .attr("transform", "translate(400, 20)")
            .call(lAxis);
        
        g.select(".domain")
            .remove();
        
        g.selectAll("rect")
            .data(cScale.range().map(function(color) {
                var d = cScale.invertExtent(color);
                if(d[0]==null) d[0]=lScale.domain()[0];
                if(d[1]==null) d[1]=lScale.domain()[1];
                return d;
            }))
            .enter().insert("rect", ".tick")
                .attr("height", 8)
                .attr("x", function(d) { return lScale(d[0]); })
                .attr("width", function(d) { return lScale(d[1]) - lScale(d[0]); })
                .attr("fill", function(d) { return cScale(d[0]); });
        
        g.append("text")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .attr("y", -5)
            .text("Injury Severity (Number of Games Missed)");
            
    });
}
    return {
        init: init,
    }
})()
bar_chart.init();