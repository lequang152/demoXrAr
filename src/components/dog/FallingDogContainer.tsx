import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { Environment } from "@react-three/drei";
import FallingDogManager from "./FallingDogManager";

const FallingDogContainer = () => {
  return (
    <>
      <Canvas>
        <Environment
          files="/src/components/xr-hit-model/view3.hdr"
          background
        />
        <XR>
          <FallingDogManager />
        </XR>
      </Canvas>
    </>
  );
};

export default FallingDogContainer;
