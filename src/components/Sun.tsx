import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { createSunTexture } from '../utils/textureGenerator';

export const Sun = () => {
  const meshRef = useRef<Mesh>(null);
  const texture = useMemo(() => createSunTexture(), []);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Main Sun Body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial 
          map={texture}
          color="#FDB813" 
          emissive="#FDB813"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      
      {/* Glow/Corona simulation */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial 
          color="#FF8C00" 
          transparent 
          opacity={0.2} 
          side={2}
        />
      </mesh>

      <pointLight intensity={5} distance={300} decay={1} color="#FDB813" />
    </group>
  );
};
