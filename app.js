var width = 1300;
var height = 730;
var padding = 35;
//deifne the width and height of svg
var svgSection = d3.select("svg")
    .attr("width",width)
    .attr("height",height)
        .style("padding","20px 20px");
//appending tooltip vaccant div
var tooltip = d3.select("body")
    .append("div")
        .classed("tooltip",true);
//scale y-axis
var yScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011,d => d.lifeExpectancy))
                .range([height-padding,0+padding]);
//scale x-axis
var xScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011, d => d.births/d.population))
                .range([0+padding,width-padding]);
//scale color from lightgreen to black
var colorScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, d => d.population/d.area))
                    .range(['lightgreen','black']);
//scale raius of circle base on number of births
var scaleRadius = d3.scaleLinear()
                    .domain(d3.extent(birthData2011,d => d.births))
                    .range([5,40]);
//define the x-axis on scale xScale
var xAxis = d3.axisBottom(xScale)
                .tickSize(-height+2*padding)
                .tickSizeOuter(0);
//define the y-axis on scale yScale
var yAxis = d3.axisLeft(yScale)
                .tickSize(-width+2*padding)
                .tickSizeOuter(0);
//append the xAxis to graph or html
d3.select("svg")
    .append("g")
    .attr("transform","translate(0,"+(height-padding)+")")
    .call(xAxis);
//append the y-axis to graph or html
d3.select("svg")
    .append("g")
    .attr("transform","translate("+(padding)+",0)")
    .call(yAxis);
//creating the scatterplot
svgSection.selectAll("circle")
            .data(birthData2011)//insert the data
            .enter()
            .append("circle")//append all the circles with respect to data
                .attr("cx",d => {//define the x-component of center of circle
                    return xScale(d.births/d.population);
                })
                .attr("cy", d => {//define the y-component of center of circle
                    return yScale(d.lifeExpectancy);
                })
                .attr("r", d => {//define the radius of circle
                    return scaleRadius(d.births)
                })
                    .attr("fill", d => {//fill the color in the circle as per color scale
                        return colorScale(d.population/d.area);
                    })
            .on("mousemove",function(d){
                tooltip
                    .style("opacity","1")
                    .style("left",d3.event.x+"px")
                    .style("top",d3.event.y+"px")
                    .html(`
                        <p><strong>Region</strong> : ${d.region}</p>
                        <p><strong>Births</strong> : ${d.births}</p>
                        <p><strong>Life Expectancy</strong> : ${d.lifeExpectancy}</p>
                        <p><strong>Population</strong> : ${d.population}</p>
                        <p><strong>Area</strong> : ${d.area}</p>
                    `);
            })
            .on("mouseout",function(){
                tooltip
                    .style("opacity","0");
            });
//append text to show the x-axis name
d3.select("svg")
    .append("text")
    .attr("x", (width-padding)/2)
    .attr("y", height-padding)
    .attr("dy","1.6em")
    .style("text-anchor","middle")
    .text("Births Per Capita");
//appending heading to the graph
d3.select("svg")
    .append("text")
    .attr("x",(width-padding)/2)
    .style("font-size","1.5em")
    .attr("y",padding-8)
    .style("text-anchor","middle")
    .text("Date on Births By County in 2011");
//appending text to show the y-axis name
d3.select("svg")
    .append("text")
    .attr("x",-height/2)
    .attr("y",padding-20)
    .attr("transform","rotate(-90)")
    .style("text-anchor","middle")
    .text("Life Expentancy");