import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { Environment } from "@react-three/drei";

const XrHitModelContainer = () => {
  return (
    <>
      <ARButton
        sessionInit={{
          requiredFeatures: ["hit-test"],
        }}
      />
      <Canvas>
        <Environment
          files="/src/components/xr-hit-model/view3.hdr"
          background
        />
        <XR>
          <XrHitModel />
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;
