var svg = d3.select('body').append('svg')
    .attr('width', '600px')
    .attr('height', '600px')
    .attr('class', 'chart');

makeCircle(svg, {
  'cx': 600 / 2,
  'cy': 600 / 2,
  'r': 600 / 2,
  'color': generateRandomColor()
});

function makeCircle(svg, attr) {
  var c = svg.append('circle');
  c
    .attr('cx', attr.cx)
    .attr('cy', attr.cy)
    .attr('r', 0)
    .transition()
    .duration(500)
    .attr('r', attr.r)
    .style('fill', attr.color);

  c.on('mouseover', handleMouseover);
}

function handleMouseover() {
  var el = d3.select(this);
  var original = {
    cx: +el.attr('cx'),
    cy: +el.attr('cy'),
    r: +el.attr('r')
  };

  el.remove();

  makeCircle(svg, {
    'cx': original.cx + (original.r / 2),
    'cy': original.cy + (original.r / 2),
    'r': original.r / 2,
    'color': generateRandomColor()
  });

  makeCircle(svg, {
    'cx': original.cx + (original.r / 2),
    'cy': original.cy - (original.r / 2),
    'r': original.r / 2,
    'color': generateRandomColor()
  });

  makeCircle(svg, {
    'cx': original.cx - (original.r / 2),
    'cy': original.cy + (original.r / 2),
    'r': original.r / 2,
    'color': generateRandomColor()
  });

  makeCircle(svg, {
    'cx': original.cx - (original.r / 2),
    'cy': original.cy - (original.r / 2),
    'r': original.r / 2,
    'color': generateRandomColor()
  });
}

function getRandom0to255() {
  return Math.floor(Math.random() * (255 + 1));
}

function generateRandomColor() {
  return 'rgb('
    + getRandom0to255() + ','
    + getRandom0to255() + ','
    + getRandom0to255() + ')';
}
