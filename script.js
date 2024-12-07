import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { MeshStandardMaterial } from 'three';

const FinTechObject = () => {
  const mesh = useRef(null);
  const [hovered, setHovered] = useState(false);

  const [texture] = useLoader(TextureLoader, ['fintech-texture.png']);

  useEffect(() => {
    const cursor = `${hovered ? 'pointer' : 'grab'}`;
    document.body.style.cursor = cursor;
  }, [hovered]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial map={texture} color={hovered ? '#ff6b6b' : '#f4f4f4'} />
    </mesh>
  );
};

const ThreeJSScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars count={1000} depth={50} saturation={1} fade />
      <FinTechObject />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeJSScene;
