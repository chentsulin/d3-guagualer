var svg = d3.select("body").append("svg")
    .attr("width", "600px")
    .attr("height", "600px")
    .attr("class", "chart");

for (var i = 0; i < 2; i++) {
  for (var j = 0; j < 2; j++) {
    svg.append("circle")
      .attr("cx", (i + 0.5) * 600/2)
      .attr("cy", (j + 0.5) * 600/2)
      .attr("r", 600/4)
      .style("fill", "black")
  }
}

svg.selectAll('circle').each(function() {
  // ..this 是現在的 DOM element
  d3.select(this)
    .on('mouseover', handleMouseover);
})

function handleMouseover() {
  var el = d3.select(this);
  var original = {
    cx: +el.attr('cx'),
    cy: +el.attr('cy'),
    r: +el.attr('r')
  };

  svg.append("circle")
    .attr("cx", original.cx + (original.r / 2))
    .attr("cy", original.cy + (original.r / 2))
    .attr("r", original.r / 2)
    .style("fill", "black")
    .on('mouseover', handleMouseover);
  svg.append("circle")
    .attr("cx", original.cx + (original.r / 2))
    .attr("cy", original.cy - (original.r / 2))
    .attr("r", original.r / 2)
    .style("fill", "black")
    .on('mouseover', handleMouseover);
  svg.append("circle")
    .attr("cx", original.cx - (original.r / 2))
    .attr("cy", original.cy + (original.r / 2))
    .attr("r", original.r / 2)
    .style("fill", "black")
    .on('mouseover', handleMouseover);
  el
    .attr("cx", original.cx - (original.r / 2))
    .attr("cy", original.cy - (original.r / 2))
    .attr("r", (original.r / 2));
}



