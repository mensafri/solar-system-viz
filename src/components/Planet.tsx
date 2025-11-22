import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Html, Trail } from '@react-three/drei';
import type { PlanetData } from '../data/planets';
import { useStore } from '../store';
import { createGasGiantTexture, createRockyTexture, createIceGiantTexture } from '../utils/textureGenerator';

interface PlanetProps {
  data: PlanetData;
}

export const Planet = ({ data }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null);
  const { isPaused, speedFactor, setSelectedPlanet, selectedPlanet } = useStore();
  const [hovered, setHovered] = useState(false);

  // Random starting angle
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Generate texture based on planet type
  const texture = useMemo(() => {
    if (data.textureType === 'gas') {
      return createGasGiantTexture(data.color, 8);
    } else if (data.textureType === 'ice') {
      return createIceGiantTexture(data.color);
    } else {
      return createRockyTexture(data.color);
    }
  }, [data.color, data.textureType]);

  useFrame((_state, delta) => {
    if (!isPaused && meshRef.current) {
      // Update angle
      angleRef.current += (data.speed * speedFactor * delta) * 0.1;
      
      // Calculate position
      const x = Math.cos(angleRef.current) * data.distance;
      const z = Math.sin(angleRef.current) * data.distance;
      
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += delta;
    }
  });

  const isSelected = selectedPlanet?.id === data.id;

  // Material properties based on planet type
  const materialProps = data.textureType === 'gas' || data.textureType === 'ice'
    ? { roughness: 0.3, metalness: 0.1 }
    : { roughness: 0.9, metalness: 0 };

  return (
    <group>
      {/* Orbit Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 64]} />
        <meshBasicMaterial color="#444" opacity={0.3} transparent side={2} />
      </mesh>

      {/* Trail Effect */}
      <Trail
        width={data.radius * 0.5}
        length={30}
        color={data.color}
        attenuation={(t) => t * t}
      >
        {/* Planet Mesh */}
        <mesh
          name={`planet-${data.id}`}
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPlanet(data);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial 
            map={texture}
            emissive={isSelected || hovered ? data.color : '#000'}
            emissiveIntensity={isSelected ? 0.3 : hovered ? 0.15 : 0}
            {...materialProps}
          />
          
          {/* Label (visible on hover or select) */}
          {(hovered || isSelected) && (
            <Html position={[0, data.radius + 0.5, 0]} center>
              <div style={{ 
                color: 'white', 
                background: 'rgba(0,0,0,0.7)', 
                padding: '2px 5px', 
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}>
                {data.name.en}
              </div>
            </Html>
          )}
        </mesh>
      </Trail>

      {/* Moon for Earth */}
      {data.id === 'earth' && (
         <mesh position={[data.radius + 2, 0, 0]} rotation={[0, 0, 0]}>
           <sphereGeometry args={[0.27, 16, 16]} />
           <meshStandardMaterial color="#888" />
         </mesh>
      )}
    </group>
  );
};
