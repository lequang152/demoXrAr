import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import { AnimationAction, Group } from "three";
import { Vector3 as ThreeVector3 } from "three";
import useSound from "use-sound";
import ExplosionEffect from "../effect/ExplosionEffect";
import { Product } from "../../types/products";

export interface IProps {
  position: ThreeVector3;
  product?: Product;
  onClick: (bool: boolean) => void;
}

export function Dog({ position, product, onClick }: IProps) {
  const group = useRef<Group>(null) as RefObject<Group>;

  const [exploding, setExploding] = useState(false);
  const [dogPosition, setDogPosition] = useState(position);
  const [dogVisible, setDogVisible] = useState(true);

  const { nodes, animations } = useGLTF("src/model/dog.gltf") as any;
  const { actions } = useAnimations(animations, group);
  const [playSound] = useSound("src/components/dog/sound.wav");

  const handlePointerDown = (event: any) => {
    // Xử lý sự kiện khi chú chó được click
    console.log(`Product ${product?.id} was clicked`);
    setExploding(true);
    setDogVisible(false);
    playSound();
    onClick(true);
    if (group.current) {
      setDogPosition(group.current.position);
    }
    // Biến mất sau một khoảng thời gian (ví dụ: 1 giây)
    setTimeout(() => {
      setExploding(false);
    }, 1000);
  };

  useEffect(() => {
    // Kiểm tra xem actions.animation có tồn tại không
    if (actions.animation) {
      // Chạy animation khi mô hình được tạo
      actions.animation.play();
    }
  }, [actions.animation]);

  useFrame(() => {
    // Cập nhật vị trí mô hình trong mỗi frame
    if (group.current) {
      group.current.position.y -= 0.05; // Điều chỉnh tốc độ rơi
      group.current.scale.set(0.5, 0.5, 0.5);
      group.current.rotation.y += 0.1;
    }
  });

  return (
    <>
      <group
        ref={group}
        position={position}
        dispose={null}
        scale={1}
        onClick={handlePointerDown}
        visible={dogVisible}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.character_dog as any).geometry}
          material={(nodes.character_dog as any).material}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.character_dogArmLeft as any).geometry}
            material={(nodes.character_dog as any).material}
            position={[0.204, 0, -0.634]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.character_dogArmRight as any).geometry}
            material={(nodes.character_dog as any).material}
            position={[-0.204, 0, -0.634]}
          />
          <group position={[0, 0, -0.704]}>
            <mesh
              castShadow
              receiveShadow
              geometry={(nodes.Cube1339 as any).geometry}
              material={(nodes.character_dog as any).material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={(nodes.Cube1339_1 as any).geometry}
              material={(nodes.character_dog as any).material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={(nodes.Cube1339_2 as any).geometry}
              material={(nodes.character_dog as any).material}
            />
          </group>
        </mesh>
      </group>
      {exploding && <ExplosionEffect position={dogPosition} />}
    </>
  );
}

const ModelPreload = () => {
  useGLTF.preload("src/model/dog.gltf");
  return null;
};

export { ModelPreload };
