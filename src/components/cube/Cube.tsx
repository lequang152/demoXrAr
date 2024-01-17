import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function Cube() {
  const cubeRef = useRef<Mesh>();

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta; // Check if cubeRef.current is defined before accessing rotation
    }
  });
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <mesh ref={cubeRef as React.MutableRefObject<Mesh>}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"mediumpurple"} />
      </mesh>
    </>
  );
}

export default Cube;
