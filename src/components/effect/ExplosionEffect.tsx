import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useExplosion } from "../hooks/useExplosion"; // Tạo một hook để quản lý hiệu ứng hạt
import { Vector3 as ThreeVector3 } from "three";

interface IProps {
  position: ThreeVector3;
}

const ExplosionEffect = ({ position }: IProps) => {
  const group = useRef<Group>(null);
  const { particles, updateParticles } = useExplosion();

  useEffect(() => {
    // Thiết lập vị trí hiệu ứng nổ tại vị trí của con chó
    if (group.current) {
      const threePosition = new ThreeVector3(
        position.x,
        position.y,
        position.z
      );
      group.current.position.copy(threePosition);
    }
  }, [position]);

  useFrame(() => {
    updateParticles(); // Cập nhật trạng thái hạt trong mỗi frame
  });

  return (
    <group ref={group} position={position}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[particle.x, particle.y, particle.z]}
          scale={[particle.scale, particle.scale, particle.scale]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={particle.opacity}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ExplosionEffect;
