var hockey_player = (function(){
var csv = 'data/AggregateInjuries(1).csv';  
var svg;
var body_locations = [
    {type: 'Head', left: 119, top: 18},
    {type: 'Upper body', left: 215, top: 85},
    {type: 'Lower body', left: 272, top: 243},
    {type: 'Leg', left: 189, top: 312},
    {type: 'Foot', left: 170, top: 386},
    {type: 'Hand', left: 255, top: 151},
    {type: 'Groin', left: 230, top: 199},
    {type: 'Shoulder', left: 210, top: 33},
    {type: 'Back', left: 241, top: 111},
    {type: 'Face', left: 139, top: 50},
    {type: 'Neck', left: 166, top: 78},
    {type: 'Torso', left: 205, top: 144},
    {type: 'Arm', left: 149, top: 142}
];

function getInjuryData(csv){
    return new Promise(function(resolve,reject){
        d3.csv(csv, function(error, data){
            if(error){
                reject(error);
            }
            resolve(data); 
        });
    }); 
}
function mergeCSVandPoints(data){   
    
    data.forEach(function(point){
        var found = body_locations.find(function(element){
            return element.type === point.injury_type;
        });
        if(found) {
            point['left'] = found.left,
            point['top'] = found.top;
        }
    });
    return data;
}
function printXY(){
    d3.select('.hockey-player-svg-elem').on('click', function(){
       var top_off = d3.select(this).node().getBoundingClientRect().top,
           left_off = d3.select(this).node().getBoundingClientRect().left;
        
        console.log("left: " + (d3.event.offsetX - 10) + ", top: " + (d3.event.offsetY - 20));
      console.log(d3.event);
    });
}

function drawToolTipDiv(){
    d3.select("body")
        .select(".hockey-player")
        .append("div")
        .attr('class', 'tool-tip');
}
function bindOnClickPoints(data){
    
    d3.selectAll('.body-point')
        .on('click', function(){
            
            var classes = d3.select(this).attr('class').split(/\s/);
            var body_part = classes.length > 2 ? classes[1] + " " + classes[2] : classes[1];
            
            var found = data.find(function(element){
                return body_part === element.injury_type;
            });
            
            if(found){
                var golie_injuries = (found.injuries_g/found.num_injuries)*100,
                    defense_injuries = (found.injuries_d/found.num_injuries)*100,
                    forward_injuries = (found.injuries_f/found.num_injuries)*100;
                
                d3.select('.injury-type').text(body_part);
                
                d3.select('.severity').text((found.total_severity / found.num_injuries).toFixed(2));
                
                d3.select('.inj-list').text(found.notes);
                
                d3.select(".golie-inj-percentage").text(golie_injuries.toFixed(2));
                
                d3.select(".defense-inj-percentage").text(defense_injuries.toFixed(2));
                
                d3.select(".forward-inj-percentage").text(forward_injuries.toFixed(2));
            }
        })
}
function drawCircles(data){
    svg
        .append('g')
        .attr('class', 'body-points-group')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', function(d){ return 'body-point' + " " + d.injury_type; })
		.attr('cx', function (d) { return d.left; })
		.attr('cy', function (d) { return d.top; })
        .attr('r', function(d){return 7;})
        .attr('stroke', 'red')
        .style("pointer-events","visible")
        .attr('fill', 'none')
    
}
function drawBodyPoints(){
    var margin = {left: 10, right: 10, bottom: 20, top: 20};
    var width = 320 - (margin.left + margin.right);
    var height = 443 - (margin.top + margin.bottom);
    var img_width = 300, img_height = 423; 
    svg = d3.select('.hockey-player')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ',' + margin.top + ")")
        .attr("class", "hockey-player-svg-elem");
    
    var imgs = svg.append("svg:image")
                .attr("xlink:href", "img/hockey-icon.png")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", img_width)
                .attr("height", img_height);
    
    getInjuryData(csv).then(mergeCSVandPoints).then(function(data){
        drawCircles(data);
        bindOnClickPoints(data);
    })
    
     
    
}

return {
    printXY: printXY,
    draw: drawBodyPoints,
}
})()
hockey_player.draw();

