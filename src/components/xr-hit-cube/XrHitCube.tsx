import { OrbitControls } from "@react-three/drei";
import { Vector3, useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import { Matrix4, Mesh } from "three";
import Cube from "./Cube";

interface Cube {
  position: Vector3;
  id: number;
}

function XrHitCube() {
  const reticleRef = useRef<Mesh>();
  const [cubes, setCubes] = useState<Cube[]>([]);

  const { isPresenting } = useXR();

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix: Matrix4, hit: XRHitTestResult) => {
    if (reticleRef.current) {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );
      reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    }
  });

  const placeCube = (e: any) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setCubes([...cubes, { position, id }]);
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        cubes.map((cube) => {
          return <Cube key={cube.id} position={cube.position} />;
        })}
      {isPresenting && (
        <Interactive onSelect={placeCube}>
          <mesh
            ref={reticleRef as React.MutableRefObject<Mesh>}
            //   rolation-x={-Math.PI / 2}
          >
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}

      {!isPresenting && <Cube position={[0, 0, 0]} />}
    </>
  );
}

export default XrHitCube;
