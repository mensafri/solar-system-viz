export interface PlanetData {
  id: string;
  name: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  radius: number; // Relative to Earth = 1
  distance: number; // Relative to Sun center
  speed: number; // Orbital speed factor
  color: string;
  textureType: 'rocky' | 'gas' | 'ice' | 'sun';
  details: {
    rotationPeriod: string;
    temperature: string;
    moons: number;
    mass: string; // Relative to Earth
    diameter: string; // km
    orbitalPeriod: string; // Earth days/years
    gravity: string; // m/s²
  };
}

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: { en: 'Mercury', id: 'Merkurius' },
    description: {
      en: 'The smallest planet in the Solar System and the closest to the Sun.',
      id: 'Planet terkecil di Tata Surya dan yang terdekat dengan Matahari.',
    },
    radius: 0.38,
    distance: 10,
    speed: 4.7,
    color: '#A5A5A5',
    textureType: 'rocky',
    details: {
      rotationPeriod: '59 days',
      temperature: '167°C',
      moons: 0,
      mass: '0.055 Earths',
      diameter: '4,879 km',
      orbitalPeriod: '88 days',
      gravity: '3.7 m/s²'
    }
  },
  {
    id: 'venus',
    name: { en: 'Venus', id: 'Venus' },
    description: {
      en: 'The second planet from the Sun. It has a thick atmosphere trapping heat.',
      id: 'Planet kedua dari Matahari. Memiliki atmosfer tebal yang memerangkap panas.',
    },
    radius: 0.95,
    distance: 15,
    speed: 3.5,
    color: '#E3BB76',
    textureType: 'rocky',
    details: {
      rotationPeriod: '243 days',
      temperature: '464°C',
      moons: 0,
      mass: '0.815 Earths',
      diameter: '12,104 km',
      orbitalPeriod: '225 days',
      gravity: '8.9 m/s²'
    }
  },
  {
    id: 'earth',
    name: { en: 'Earth', id: 'Bumi' },
    description: {
      en: 'Our home planet, the only known celestial body to support life.',
      id: 'Planet rumah kita, satu-satunya benda langit yang diketahui mendukung kehidupan.',
    },
    radius: 1,
    distance: 20,
    speed: 3.0,
    color: '#22A6B3',
    textureType: 'rocky',
    details: {
      rotationPeriod: '24 hours',
      temperature: '15°C',
      moons: 1,
      mass: '1 Earth',
      diameter: '12,742 km',
      orbitalPeriod: '365.25 days',
      gravity: '9.8 m/s²'
    }
  },
  {
    id: 'mars',
    name: { en: 'Mars', id: 'Mars' },
    description: {
      en: 'The Red Planet, known for its dusty, iron-rich surface.',
      id: 'Planet Merah, dikenal dengan permukaannya yang berdebu dan kaya zat besi.',
    },
    radius: 0.53,
    distance: 25,
    speed: 2.4,
    color: '#DD4C39',
    textureType: 'rocky',
    details: {
      rotationPeriod: '24.6 hours',
      temperature: '-65°C',
      moons: 2,
      mass: '0.107 Earths',
      diameter: '6,779 km',
      orbitalPeriod: '687 days',
      gravity: '3.7 m/s²'
    }
  },
  {
    id: 'jupiter',
    name: { en: 'Jupiter', id: 'Jupiter' },
    description: {
      en: 'The largest planet in the Solar System, a gas giant with a Great Red Spot.',
      id: 'Planet terbesar di Tata Surya, raksasa gas dengan Bintik Merah Besar.',
    },
    radius: 3.5,
    distance: 35,
    speed: 1.3,
    color: '#D9A066',
    textureType: 'gas',
    details: {
      rotationPeriod: '9.9 hours',
      temperature: '-110°C',
      moons: 95,
      mass: '318 Earths',
      diameter: '139,820 km',
      orbitalPeriod: '11.9 years',
      gravity: '24.8 m/s²'
    }
  },
  {
    id: 'saturn',
    name: { en: 'Saturn', id: 'Saturnus' },
    description: {
      en: 'Known for its prominent ring system.',
      id: 'Dikenal dengan sistem cincinnya yang mencolok.',
    },
    radius: 3.0,
    distance: 45,
    speed: 0.9,
    color: '#EAD6B8',
    textureType: 'gas',
    details: {
      rotationPeriod: '10.7 hours',
      temperature: '-140°C',
      moons: 146,
      mass: '95 Earths',
      diameter: '116,460 km',
      orbitalPeriod: '29.5 years',
      gravity: '10.4 m/s²'
    }
  },
  {
    id: 'uranus',
    name: { en: 'Uranus', id: 'Uranus' },
    description: {
      en: 'An ice giant with a unique sideways rotation.',
      id: 'Raksasa es dengan rotasi miring yang unik.',
    },
    radius: 2.0,
    distance: 55,
    speed: 0.7,
    color: '#D1F3F9',
    textureType: 'ice',
    details: {
      rotationPeriod: '17 hours',
      temperature: '-195°C',
      moons: 27,
      mass: '14.5 Earths',
      diameter: '50,724 km',
      orbitalPeriod: '84 years',
      gravity: '8.9 m/s²'
    }
  },
  {
    id: 'neptune',
    name: { en: 'Neptune', id: 'Neptunus' },
    description: {
      en: 'The farthest known planet from the Sun, an ice giant.',
      id: 'Planet terjauh yang diketahui dari Matahari, sebuah raksasa es.',
    },
    radius: 2.0,
    distance: 65,
    speed: 0.5,
    color: '#3E54E8',
    textureType: 'ice',
    details: {
      rotationPeriod: '16 hours',
      temperature: '-200°C',
      moons: 14,
      mass: '17 Earths',
      diameter: '49,244 km',
      orbitalPeriod: '165 years',
      gravity: '11.2 m/s²'
    }
  },
];
