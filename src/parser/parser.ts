import { Face, Vertex } from 'types';

const parse = async (meshFileUrl: string): Promise<[Vertex[], Face[]]> => {
  const meshText: string = await (await fetch(meshFileUrl)).text();
  const vertices: Vertex[] = [];
  const faces: Face[] = [];
  meshText.split('\n').forEach(line => {
    if (line.startsWith('v ')) {
      const chunks = line.split(' ');
      vertices.push([Number(chunks[1]), Number(chunks[2]), Number(chunks[3])]);
    }
    if (line.startsWith('f ')) {
      const chunks = line.split(' ').splice(1);
      faces.push(chunks.map(c => Number(c.split('/')[0])));
    }
  });
  return [vertices, faces];
};

export default parse;
