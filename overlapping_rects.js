const { min, max } = Math;

// returns Point[]
function parsePoints(s) {
  // console.debug('regex >>> ', s.match(/-?\d,-?\d/));
  return s.match(/-?\d,-?\d/g).map(m => {
    // console.debug('match >>> ', m);
    const chunks = m.split(',');
    return { x: Number(chunks[0]), y: Number(chunks[1]) };
  });
}

// p - Points[]
// returns { tl, tr, br, bl }
function buildRectangleFromPoints(points) {
  return {
    tl: {
      x: min(...points.map(p => p.x)),
      y: max(...points.map(p => p.y)),
    },
    tr: {
      x: max(...points.map(p => p.x)),
      y: max(...points.map(p => p.y)),
    },
    br: {
      x: max(...points.map(p => p.x)),
      y: min(...points.map(p => p.y)),
    },
    bl: {
      x: min(...points.map(p => p.x)),
      y: min(...points.map(p => p.y)),
    },
  }
}

// returns { tl, tr, br, bl }
function findOverlappingArea(r1, r2) {
  // const r1 = buildRectangleFromPoints(points1);
  // const r2 = buildRectangleFromPoints(points2);
  return {
    tl: { x: max(r1.tl.x, r2.tl.x), y: min(r1.tl.y, r2.tl.y) }, // tl
    tr: { x: min(r1.tr.x, r2.tr.x), y: min(r1.tr.y, r2.tr.y) }, // tr
    br: { x: min(r1.br.x, r2.br.x), y: max(r1.br.y, r2.br.y) }, // br
    bl: { x: max(r1.bl.x, r2.bl.x), y: max(r1.bl.y, r2.bl.y) }, // bl
  };
}

// r: { tl, tr, br, bl }
// return number
function calcSquare(r) {
  return (r.tr.x - r.tl.x) * (r.tr.y - r.br.y);
}

function OverlappingRectangles(strArr) {
  const points = parsePoints(strArr[0]);

  const r1 = buildRectangleFromPoints(points.slice(0, 4));
  const r2 = buildRectangleFromPoints(points.slice(4));

  const overlappingArea = findOverlappingArea(r1, r2);
  console.debug('overlappingArea >>> ', overlappingArea);
  const s1 = calcSquare(r1);
  const sArea = calcSquare(overlappingArea);
  console.debug('s1, sArea > ', s1, sArea);

  return Math.floor(s1 / sArea);
}

// keep this function call here
console.log('Sample test passing: ' + (OverlappingRectangles(["(0,0),(0,-2),(3,0),(3,-2),(2,-1),(3,-1),(2,3),(3,3)"]) == '6'));
console.log('Sample test passing: ' + (OverlappingRectangles(["(0,0),(2,0),(0,4),(2,4),(0,1),(2,1),(0,4),(2,4)"]) == '1'));

/* do not remove this line: __internalTestCases__ */
