import { useEffect, useMemo, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import initManifold, { ManifoldToplevel } from 'manifold-3d';
import { Manifold } from 'manifold-3d/manifoldCAD.js';
import { Text } from '@mantine/core';

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
    <Canvas style={{ height: '100vh', width: '100vw', background: 'red' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ManifoldObject />
      <OrbitControls />
    </Canvas>
  );
}

export function ManifoldObject() {
  const meshData = useMemo(() => {
    const { cube } = Manifold;
    const box = cube([1, 1, 1], true);
    const mesh = box.getMesh();
    box.delete();
    return mesh;
  }, []);

  if (!meshData) {
    return <Text c="dimmed">Error loading 3D model. Check console for details.</Text>;
  }

  // 3. Return a React Three Fiber element
  const positions = new Float32Array(meshData.numVert * 3);
  for (let i = 0; i < meshData.numVert; i++) {
    positions[i * 3] = meshData.vertProperties[i * meshData.numProp];
    positions[i * 3 + 1] = meshData.vertProperties[i * meshData.numProp + 1];
    positions[i * 3 + 2] = meshData.vertProperties[i * meshData.numProp + 2];
  }

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          args={[positions, 3]}
          count={meshData.numVert}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={meshData.triVerts}
          args={[meshData.triVerts, 1]}
          count={meshData.triVerts.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
