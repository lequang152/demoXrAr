// Angle.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
const backgroundImage =
  import.meta.env.BASE_URL + "assets/background/angle.jpg";
const Angle = () => {
  // Load the PNG texture
  const texture = useTexture(backgroundImage);

  return (
    <Plane rotation={[300, 300, 300]} position={[-60, 10, 10]}>
      <meshBasicMaterial attach="material" map={texture} />
    </Plane>
  );
};

export default Angle;
