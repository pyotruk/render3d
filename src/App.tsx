import { useEffect, useRef } from 'react';

import Viewer3D from './viewer3d/Viewer3D';
import parse from './parser/parser';

function App() {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const viewer = useRef<Viewer3D>();

  useEffect(() => {
    if (!canvas.current || viewer.current) return;
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    parse('/icosphere.obj').then(vertices => {
      viewer.current = new Viewer3D(canvas.current!);
      viewer.current.render(vertices);
    });
  }, []);

  return <canvas ref={canvas} />;
}

export default App;
