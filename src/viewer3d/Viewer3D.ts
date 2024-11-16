import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

import { Face, Vertex } from 'types';

class Viewer3D {
  private readonly scene: THREE.Scene;

  private readonly camera: THREE.PerspectiveCamera;

  private readonly renderer: THREE.WebGLRenderer;

  private readonly material = new THREE.MeshMatcapMaterial();
  // private readonly material = new THREE.MeshNormalMaterial();

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.renderer.setSize(canvas.width, canvas.height);
  }

  private setupAnimation(mesh: THREE.Mesh) {
    const animate = () => {
      requestAnimationFrame(animate);
      // eslint-disable-next-line no-param-reassign
      mesh.rotation.x += 0.01;
      // eslint-disable-next-line no-param-reassign
      mesh.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  renderConvexGeometry(vertices: Vertex[]) {
    const geometry = new ConvexGeometry(vertices.map(v => new THREE.Vector3(...v)));
    const mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(mesh);
    this.setupAnimation(mesh);
  }

  renderPlaneGeometry(vertices: Vertex[], faces: Face[]) {
    faces.forEach(face => {
      const geometry = new ConvexGeometry(face.map(vertexIdx => new THREE.Vector3(...vertices[vertexIdx - 1])));
      const plane = new THREE.Mesh(geometry, this.material);
      this.scene.add(plane);
      this.setupAnimation(plane);
    });
  }
}

export default Viewer3D;
