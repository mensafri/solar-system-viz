import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { SolarSystem } from './SolarSystem';
import { AsteroidBelt } from './AsteroidBelt';
import { CameraController } from './CameraController';

export const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 50, 100], fov: 45 }}>
      <color attach="background" args={['#000010']} />
      <ambientLight intensity={0.4} />
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <SolarSystem />
      <AsteroidBelt />
      <CameraController />
      
      <OrbitControls 
        minDistance={10} 
        maxDistance={200} 
        enablePan={false}
        makeDefault
      />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
      </EffectComposer>
    </Canvas>
  );
};
