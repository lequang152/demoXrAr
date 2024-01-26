import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
const backgroundImage =
  import.meta.env.BASE_URL + "assets/background/scenes/wt_View03.jpg";

const ThreeScene = () => {
  const cubeRef = useRef<THREE.Mesh>();
  const textureLoader = new TextureLoader();
  const backgroundTexture = textureLoader.load(backgroundImage);

  useFrame(() => {
    // Update the cube rotations
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[20, 0, 20]} />

      <mesh
        ref={cubeRef as React.MutableRefObject<THREE.Mesh>}
        geometry={new THREE.BoxGeometry(1, 1, 1)}
      >
        <meshLambertMaterial attach="material" color={0xff00ff} />
      </mesh>

      <Background texture={backgroundTexture} />
    </Canvas>
  );
};

const Background = ({ texture }: any) => {
  const { viewport } = useThree();

  useFrame(() => {
    // Do additional background-specific animations if needed
  });

  return (
    <mesh
      geometry={new THREE.PlaneGeometry(viewport.width, viewport.height, 1, 1)}
      position={[0, 0, -5]} // Adjust the z-position to make the background appear behind the cube
    >
      <meshBasicMaterial attach="material">
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
};

export default ThreeScene;
