/**
 *
 * Source: https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5
 *
 * JSON data is mine
 *
 *
 */

var bookNodeData = {
    "name": "Contemporary Book Genres", "children" : [
    {
        "name": "Post-Apocalyptic",
        "children": [
            {
                "name": "Walking Dead",
                "size": 5
            },
            {
                "name": "Weakened",
                "size": 12
            },
            {
                "name": "Zombies vs. Unicorns",
                "size": 2
            }
        ]
    },{
        "name": "Science Fiction",
        "children": [
            {
                "name": "The Oracle Year",
                "size": 9
            }, {
                "name": "The Day the Sun Died",
                "size": 2
            }
        ]
    },{
        "name": "Horror",
        "children": [
            {
                "name": "The Devil Crept In",
                "size": 7
            },{
                "name": "Last Days",
                "size": 11
            },{
                "name": "Little Heaven",
                "size": 4
            }
        ]
    }]

};

var width = 500;
var height = 500;

var radius = Math.min(width, height) / 2;


var svg = d3.select(".chart").append("svg")
    .attr("width", width)
    .attr("height", height)

    .append('g')
    .attr("transform", "translate( " + width/2 + "," + height/2 + ")");

var data = d3.json("docs/books.json");

var colors = d3.scaleOrdinal(d3.schemeCategory20c);



var partition = d3.partition()
    .size([Math.PI * 2, radius]);


var rootNode = d3.hierarchy(bookNodeData) // have to use this instead of a data property
    .sum(function(d){
        return d.size;
    });


partition(rootNode);



var arc = d3.arc()
    .startAngle(function(d) { return d.x0; })
    .endAngle(function(d) { return d.x1; })
    .innerRadius(function(d) { return d.y0; })
    .outerRadius(function(d) { return d.y1; });


svg.selectAll("path")
    .data(rootNode.descendants())
    .enter().append('path')
    .attr("display", function(d) { return d.depth ? null: "none"; })
    .attr("d", arc)
    .attr("stroke", "#fff")
    .style("fill", function(d) { return colors((d.children ? d : d.parent).data.name); });



