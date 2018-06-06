var hockey_player = (function(){

var annotations = [{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'head' },
  y: 12,
  x: 70,
    dx: 5,
  dy: 300,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'upperBody' },
  y: 85,
  x: 215,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'lowerBody' },
  y: 243,
  x: 272,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'leg' },
  y: 312,
  x: 189,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'foot' },
  y: 386,
  x: 170,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'hand' },
  y: 151,
  x: 255,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'groin' },
  y: 199,
  x: 230,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'shoulder' },
  y: 33,
  x: 210,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'back' },
  y: 111,
  x: 241,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'face' },
  y: 49,
  x: 152,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'neck' },
  y: 78,
  x: 166,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'torso' },
  y: 144,
  x: 205,
    dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
},
{
  note: {
    label: "Longer text to show text wrapping",
    title: "Annotations :)"
  },
  //can use x, y directly instead of data
  data: { injury: 'arm' },
  y: 142,
  x: 149,
  dx: 78,
  dy: 380,
  subject: {
    radius: 5,
    radiusPadding: 5
  }
}
];
//var body_locations = [
//    {type: 'head', left: 133, top: 12},
//    {type: 'upperBody', left: 215, top: 85},
//    {type: 'lowerBody', left: 272, top: 243},
//    {type: 'leg', left: 189, top: 312},
//    {type: 'foot', left: 170, top: 386},
//    {type: 'hand', left: 255, top: 151},
//    {type: 'groin', left: 230, top: 199},
//    {type: 'shoulder', left: 210, top: 33},
//    {type: 'back', left: 241, top: 111},
//    {type: 'face', left: 152, top: 49},
//    {type: 'neck', left: 166, top: 78},
//    {type: 'torso', left: 205, top: 144},
//    {type: 'arm', left: 149, top: 142}
//];

function printXY(){
    d3.select('.hockey-player-svg-elem').on('click', function(){
       var top_off = d3.select(this).node().getBoundingClientRect().top,
           left_off = d3.select(this).node().getBoundingClientRect().left;
        
        console.log("left: " + (d3.event.clientX - left_off) + ", top: " + (d3.event.clientY - top_off));
        
    });
}

function drawBodyPoints(){
    var margin = {left: 10, right: 10, bottom: 20, top: 20};
    var width = 320 - (margin.left + margin.right);
    var height = 443 - (margin.top + margin.bottom);
    var img_width = 300, img_height = 423; 
    var svg = d3.select('.hockey-player')
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
    
    var type = d3.annotationCalloutCircle;
    var makeAnnotations = d3.annotation()
          .editMode(true)
          .type(type)
          //accessors & accessorsInverse not needed
          //if using x, y in annotations JSON
          
          .annotations(annotations)
    svg
      .append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations)
//    d3.select('.hockey-player')
//        .append('g')
//        .attr('class', 'body-points-group')
//        .selectAll('div')
//        .data(body_locations)
//        .enter()
//        .append('div')
//        .text(function(d){ return d.type;})
//        .attr('class', 'body-point')
//        .style('position','absolute')
//		.style('top', function (d) { return d.top + 'px'; })
//		.style('left', function (d) { return d.left + 'px'; })
//        .style('width', '10px')
//        .style('height', '10px')
//        .style('background-color', 'red')  
    
}

return {
    printXY: printXY,
    draw: drawBodyPoints,
}
})()
hockey_player.draw();
hockey_player.printXY();
