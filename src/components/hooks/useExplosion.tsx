import { useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  scale: number;
  color: string;
  opacity: number;
  speed: number;
}

const useExplosion = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 100 }, () => {
      return {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        scale: Math.random(),
        color: getRandomColor(),
        opacity: 1,
        speed: Math.random() * 0.02,
      };
    });

    setParticles(newParticles);
  }, []);

  const updateParticles = () => {
    setParticles((prevParticles) => {
      return prevParticles.map((particle) => {
        return {
          ...particle,
          y: particle.y - particle.speed,
          opacity: particle.opacity - 0.01,
        };
      });
    });
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return {
    particles,
    updateParticles,
  };
};

export { useExplosion };
