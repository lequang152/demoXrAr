import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { Vector3 } from "@react-three/fiber";

interface IProps {
  position: Vector3;
}

function Cube({ position }: IProps) {
  const cubeRef = useRef<Mesh>();

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta; // Check if cubeRef.current is defined before accessing rotation
    }
  });

  return (
    <>
      <mesh ref={cubeRef as React.MutableRefObject<Mesh>} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={"mediumpurple"} />
      </mesh>
    </>
  );
}

export default Cube;
