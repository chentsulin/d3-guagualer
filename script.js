var svg;
var data;
var maxSize = 512;
var minSize = 4;
var dim = maxSize / minSize; // 128


var hasBase64Input = window.location.search.length > 1; //?=

if (hasBase64Input) {
  loadImage(window.location.search.substring(1), createFirstCircle);
} else {
  createFirstCircle();
}

function transformRGBAData(dataset) {
  var result = [];
  for (var i = 0, len = dataset.length; i < len; i = i + 4) {
    var newRGBValue = {
      r: dataset[i],
      g: dataset[i + 1],
      b: dataset[i + 2],
      a: dataset[i + 3] / 255
    };
    result.push(newRGBValue);
  }
  return result;
}


function loadImage(base64, callback) {
  var canvas = document.createElement('canvas').getContext('2d');
  var image = new Image();
  image.onload = function() {
    canvas.drawImage(image, 0, 0, dim, dim);
    data = transformRGBAData(canvas.getImageData(0, 0, dim, dim).data);
    callback();
  };
  image.src = 'data:image/png;base64,' + base64;
}


function createFirstCircle() {
  svg = d3.select('body').append('svg')
    .attr('width', '512px')
    .attr('height', '512px')
    .attr('class', 'chart');

  makeCircle(svg, {
    'cx': 512 / 2,
    'cy': 512 / 2,
    'r': 512 / 2,
    'color': data ? avgColor(data, 1) : generateRandomColor(),
    'level': 1
  });
}

function avgColor(data, level, position) {
  var dataset;
  if (level > 1) {
    if (position === 'top-left') {
      dataset = data.filter(function(d, i) { return (i % 128 < 64) && i < 8192 });
    } else if (position === 'top-right') {
      dataset = data.filter(function(d, i) { return (i % 128 >= 64) && i < 8192 });
    } else if (position === 'bottom-left') {
      dataset = data.filter(function(d, i) { return (i % 128 < 64) && i >= 8192 });
    } else if (position === 'bottom-right') {
      dataset = data.filter(function(d, i) { return (i % 128 >= 64) && i >= 8192 });
    }
  } else {
    dataset = data;

  }
  var denominator = dataset.length;
  var avgR = Math.round(dataset.map(function(d) { return d.r; })
    .reduce(function(previousValue, currentValue) { return previousValue + currentValue; }) / denominator);
  var avgG = Math.round(dataset.map(function(d) { return d.g; })
    .reduce(function(previousValue, currentValue) { return previousValue + currentValue; }) / denominator);
  var avgB = Math.round(dataset.map(function(d) { return d.b; })
    .reduce(function(previousValue, currentValue) { return previousValue + currentValue; }) / denominator);
  var avgA = Math.round(dataset.map(function(d) { return d.a; })
    .reduce(function(previousValue, currentValue) { return previousValue + currentValue; }) / denominator);
  console.log('rgba(' + avgR + ',' + avgG + ',' + avgB + ',' + avgA + ')')
  return 'rgba(' + avgR + ',' + avgG + ',' + avgB + ',' + (avgA) + ')';
}


function makeCircle(svg, attr) {
  console.log('makeCircle', attr);

  var c = svg.append('circle');
  c
    .attr('cx', attr.cx)
    .attr('cy', attr.cy)
    .style('fill', attr.color)
    .attr('data-level', attr.level)
    .attr('r', 0)
    .transition()
    .duration(500)
    .attr('r', attr.r);

  c.on('mouseover', handleMouseover);
}

function handleMouseover() {
  var el = d3.select(this);
  var original = {
    cx: +el.attr('cx'),
    cy: +el.attr('cy'),
    r: +el.attr('r'),
    level: +el.attr('data-level')
  };

  el.remove();

  var nextLevel = original.level + 1;

  makeCircle(svg, {
    'cx': original.cx - (original.r / 2),
    'cy': original.cy - (original.r / 2),
    'r': original.r / 2,
    'color': data ? avgColor(data, nextLevel, 'top-left') : generateRandomColor(),
    'level': nextLevel
  });

  makeCircle(svg, {
    'cx': original.cx + (original.r / 2),
    'cy': original.cy - (original.r / 2),
    'r': original.r / 2,
    'color': data ? avgColor(data, nextLevel, 'top-right') : generateRandomColor(),
    'level': nextLevel
  });

  makeCircle(svg, {
    'cx': original.cx - (original.r / 2),
    'cy': original.cy + (original.r / 2),
    'r': original.r / 2,
    'color': data ? avgColor(data, nextLevel, 'bottom-left') : generateRandomColor(),
    'level': nextLevel
  });

  makeCircle(svg, {
    'cx': original.cx + (original.r / 2),
    'cy': original.cy + (original.r / 2),
    'r': original.r / 2,
    'color': data ? avgColor(data, nextLevel, 'bottom-right') : generateRandomColor(),
    'level': nextLevel
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
