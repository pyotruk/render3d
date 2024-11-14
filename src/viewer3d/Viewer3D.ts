import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

import { Point } from 'types';

class Viewer3D {
  private readonly scene: THREE.Scene;

  private readonly camera: THREE.PerspectiveCamera;

  private readonly renderer: THREE.WebGLRenderer;

  private readonly material = new THREE.MeshNormalMaterial();

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.renderer.setSize(canvas.width, canvas.height);
  }

  render(vertices: Point[]) {
    const geometry = new ConvexGeometry(vertices.map(v => new THREE.Vector3(v.x, v.y, v.z)));
    const mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(mesh);
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}

export default Viewer3D;
