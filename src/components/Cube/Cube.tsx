import { useEffect, useMemo, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import initManifold, { ManifoldToplevel } from 'manifold-3d';
import { Manifold } from 'manifold-3d/manifoldCAD.js';
import * as THREE from 'three';

export function Cube() {
  const [manifold, setManifold] = useState<ManifoldToplevel | null>(null);

  useEffect(() => {
    initManifold().then((m: ManifoldToplevel) => {
      setManifold(m);
    });
  }, []);

  if (!manifold) {
    return (
      <Canvas>
        <ambientLight />
      </Canvas>
    );
  }

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.4} />
      <directionalLight position={[-4, 4, 4]} intensity={1} />
      <ManifoldObject />
      <OrbitControls />
    </Canvas>
  );
}

export function ManifoldObject() {
  const geometry = useMemo(() => {
    const { cube } = Manifold;
    const box = cube([1, 1, 1], true);
    const mesh = box.getMesh();
    box.delete();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(mesh.vertProperties, 3));
    geo.setIndex(new THREE.BufferAttribute(mesh.triVerts, 1));
    geo.computeVertexNormals();

    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="orange" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}
