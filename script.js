var svg = d3.select('body').append('svg')
    .attr('width', '600px')
    .attr('height', '600px')
    .attr('class', 'chart');

svg.append('circle')
  .attr('cx', 600 / 2)
  .attr('cy', 600 / 2)
  .attr('r', 600 / 2)
  .style('fill', 'black')
  .on('mouseover', handleMouseover);

function handleMouseover() {
  var el = d3.select(this);
  var original = {
    cx: +el.attr('cx'),
    cy: +el.attr('cy'),
    r: +el.attr('r')
  };

  svg.append('circle')
    .attr('cx', original.cx + (original.r / 2))
    .attr('cy', original.cy + (original.r / 2))
    .attr('r', original.r / 2)
    .style('fill', 'black')
    .on('mouseover', handleMouseover);
  svg.append('circle')
    .attr('cx', original.cx + (original.r / 2))
    .attr('cy', original.cy - (original.r / 2))
    .attr('r', original.r / 2)
    .style('fill', 'black')
    .on('mouseover', handleMouseover);
  svg.append('circle')
    .attr('cx', original.cx - (original.r / 2))
    .attr('cy', original.cy + (original.r / 2))
    .attr('r', original.r / 2)
    .style('fill', 'black')
    .on('mouseover', handleMouseover);
  el
    .attr('cx', original.cx - (original.r / 2))
    .attr('cy', original.cy - (original.r / 2))
    .attr('r', (original.r / 2));
}



