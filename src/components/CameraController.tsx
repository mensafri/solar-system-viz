import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useStore } from '../store';
import { useEffect, useRef } from 'react';
import { planets } from '../data/planets';

export const CameraController = () => {
  const { selectedPlanet, isTourActive, tourStep, setSelectedPlanet, setTourStep, stopTour } = useStore();
  const isTransitioning = useRef(false);
  const tourTimer = useRef(0);
  const TOUR_DURATION = 5; // seconds per planet

  useEffect(() => {
    if (selectedPlanet) {
      isTransitioning.current = true;
    } else {
      isTransitioning.current = false;
    }
  }, [selectedPlanet]);

  // Tour mode logic
  useEffect(() => {
    if (isTourActive) {
      tourTimer.current = 0;
      if (planets[tourStep]) {
        setSelectedPlanet(planets[tourStep]);
      }
    }
  }, [isTourActive, tourStep, setSelectedPlanet]);

  useFrame((state, delta) => {
    const camera = state.camera;
    const controls = state.controls as any;

    // Tour mode timer
    if (isTourActive) {
      tourTimer.current += delta;
      if (tourTimer.current >= TOUR_DURATION) {
        tourTimer.current = 0;
        const nextStep = tourStep + 1;
        if (nextStep >= planets.length) {
          stopTour();
        } else {
          setTourStep(nextStep);
        }
      }
    }

    if (selectedPlanet && controls) {
      const planetMesh = state.scene.getObjectByName(`planet-${selectedPlanet.id}`);
      
      if (planetMesh) {
        const planetPos = planetMesh.position;
        
        // Smoothly move controls target to the planet position
        controls.target.lerp(planetPos, 5 * delta);
        
        if (isTransitioning.current) {
          // Calculate desired camera position relative to the planet
          const offset = new Vector3(
            selectedPlanet.radius * 3,
            selectedPlanet.radius * 2,
            selectedPlanet.radius * 3
          );
          const desiredCamPos = planetPos.clone().add(offset);
          camera.position.lerp(desiredCamPos, 2 * delta);
          
          if (camera.position.distanceTo(desiredCamPos) < 1) {
            isTransitioning.current = false;
          }
        }
        
        controls.update();
      }
    }
    // When no planet is selected, just let OrbitControls work freely
    // Don't force any camera position or target
  }, -1);

  return null;
};
