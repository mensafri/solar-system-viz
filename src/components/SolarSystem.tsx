import { planets } from '../data/planets';
import { Planet } from './Planet';
import { Sun } from './Sun';

export const SolarSystem = () => {
  return (
    <group>
      <Sun />
      {planets.map((planet) => (
        <Planet key={planet.id} data={planet} />
      ))}
    </group>
  );
};
