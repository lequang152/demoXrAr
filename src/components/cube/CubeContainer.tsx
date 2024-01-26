import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import { CubeTextureLoader, Scene } from "three";
const backgroundImage =
  import.meta.env.BASE_URL + "assets/background/scenes/wt_View03.jpg";

const CubeContainer = () => {
  const scene = new Scene();
  scene.background = new CubeTextureLoader().load([
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
  ]);

  return (
    <Canvas>
      <Cube />
    </Canvas>
  );
};

export default CubeContainer;
