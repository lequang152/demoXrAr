import { OrbitControls } from "@react-three/drei";
import { Vector3, useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import { Matrix4, Mesh } from "three";
import { Model } from "./Model";

interface Model {
  position: Vector3;
  id: number;
}

function XrHitModel() {
  const reticleRef = useRef<Mesh>();
  const [models, setModels] = useState<Model[]>([]);

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

  const placeModel = (e: any) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModels([{ position, id }]);
  };

  return (
    <>
      <OrbitControls />
      {isPresenting &&
        models.map((model) => {
          return <Model position={model.position} key={model.id} />;
        })}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh
            ref={reticleRef as React.MutableRefObject<Mesh>}
            //   rolation-x={-Math.PI / 2}
          >
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}

      {!isPresenting && <Model position={[0.1, 0.1, 0.1]} />}
    </>
  );
}

export default XrHitModel;
