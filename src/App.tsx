import { useEffect, useRef } from 'react';

import Viewer3D from './viewer3d/Viewer3D';

function App() {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const viewer = useRef<Viewer3D>();

  useEffect(() => {
    if (!canvas.current || viewer.current) return;
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    viewer.current = new Viewer3D(canvas.current);
    viewer.current.render();
  }, []);

  return <canvas ref={canvas} />;
}

export default App;
