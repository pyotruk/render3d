import { Point } from 'types';

const parse = async (meshFileUrl: string): Promise<Point[]> => {
  const meshText: string = await (await fetch(meshFileUrl)).text();
  const vertices: Point[] = [];
  meshText.split('\n').forEach(line => {
    if (!line.startsWith('v ')) return;
    const chunks = line.split(' ');
    vertices.push({
      x: Number(chunks[1]),
      y: Number(chunks[2]),
      z: Number(chunks[3]),
    });
  });
  return vertices;
};

export default parse;
