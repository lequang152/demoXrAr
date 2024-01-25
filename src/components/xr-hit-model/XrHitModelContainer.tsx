import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { Environment } from "@react-three/drei";
const view3 = import.meta.env.BASE_URL + "assets/background/view3.hdr";

const XrHitModelContainer = () => {
  return (
    <>
      <ARButton
        sessionInit={{
          requiredFeatures: ["hit-test"],
        }}
      />
      <Canvas>
        <Environment files={view3} background />
        <XR>
          <XrHitModel />
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;
