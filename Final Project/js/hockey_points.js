var hockey_player = (function(){


var body_locations = [
    {type: 'head', left: 133, top: 12},
    {type: 'upperBody', left: 215, top: 85},
    {type: 'lowerBody', left: 272, top: 243},
    {type: 'leg', left: 189, top: 312},
    {type: 'foot', left: 170, top: 386},
    {type: 'hand', left: 255, top: 151},
    {type: 'groin', left: 230, top: 199},
    {type: 'shoulder', left: 210, top: 33},
    {type: 'back', left: 241, top: 111},
    {type: 'face', left: 152, top: 49},
    {type: 'neck', left: 166, top: 78},
    {type: 'torso', left: 205, top: 144},
    {type: 'arm', left: 149, top: 142}
];

function printXY(){
    d3.select('.hockey-player').on('click', function(){
       var top_off = d3.select(this).node().getBoundingClientRect().top,
           left_off = d3.select(this).node().getBoundingClientRect().left;
        
        console.log("left: " + (d3.event.clientX - left_off) + ", top: " + (d3.event.clientY - top_off));
        
    });
}

function drawBodyPoints(){
    d3.select('.hockey-player')
        .append('g')
        .attr('class', 'body-points-group')
        .selectAll('div')
        .data(body_locations)
        .enter()
        .append('div')
        .text(function(d){ return d.type;})
        .attr('class', 'body-point')
        .style('position','absolute')
		.style('top', function (d) { return d.top + 'px'; })
		.style('left', function (d) { return d.left + 'px'; })
        .style('width', '10px')
        .style('height', '10px')
        .style('background-color', 'red')
    
}

return {
    printXY: printXY,
    draw: drawBodyPoints,
}
})()
hockey_player.printXY();
hockey_player.draw();