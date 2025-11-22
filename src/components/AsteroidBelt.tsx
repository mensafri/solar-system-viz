import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D } from 'three';
import { useStore } from '../store';

export const AsteroidBelt = () => {
  const meshRef = useRef<InstancedMesh>(null);
  const { isPaused, speedFactor } = useStore();
  const count = 800; // Number of asteroids

  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      // Randomize distance slightly to create a belt width
      const distance = 28 + Math.random() * 4; // Between Mars (25) and Jupiter (35)
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = (Math.random() - 0.5) * 2; // Slight vertical spread
      
      const scale = 0.1 + Math.random() * 0.3;
      
      temp.push({ x, y, z, scale, angle, distance, speed: 0.5 + Math.random() * 0.5 });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new Object3D(), []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    asteroids.forEach((data, i) => {
      if (!isPaused) {
        // Update angle based on speed
        data.angle += (data.speed * 0.1 * speedFactor * delta) * 0.5;
        
        // Recalculate position
        data.x = Math.cos(data.angle) * data.distance;
        data.z = Math.sin(data.angle) * data.distance;
      }

      dummy.position.set(data.x, data.y, data.z);
      dummy.rotation.x += delta * Math.random();
      dummy.rotation.y += delta * Math.random();
      dummy.scale.set(data.scale, data.scale, data.scale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#888" roughness={0.8} />
    </instancedMesh>
  );
};
