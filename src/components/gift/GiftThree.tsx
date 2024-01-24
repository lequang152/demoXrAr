/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 scene.gltf --transform 
Files: scene.gltf [10.77KB] > C:\Users\Admin\Downloads\gift_box\scene-transformed.glb [851.9KB] (-7810%)
Author: Multipainkiller Studio (https://sketchfab.com/Multipainkiller_Studio)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/gift-box-9aadeeb6635440af88606903a06950d8
Title: Gift box
*/
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 as ThreeVector3 } from "three";
import { Product } from "../../types/products";
import { RefObject, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { useFrame } from "@react-three/fiber";
import ExplosionEffect from "../effect/ExplosionEffect";

interface IProps {
  position: ThreeVector3;
  product?: Product;
  onClick: (bool: boolean) => void;
}
export function GiftThree({ position, product, onClick }: IProps) {
  const group = useRef<Group>(null) as RefObject<Group>;

  const { nodes, materials, animations } = useGLTF(
    "src/model/gift-three.glb"
  ) as any;

  const { actions } = useAnimations(animations, group);

  const [exploding, setExploding] = useState(false);
  const [giftPosition, setGiftPosition] = useState(position);
  const [giftVisible, setGiftVisible] = useState(true);

  const [playSound] = useSound("src/components/dog/sound.wav");

  const handlePointerDown = (event: any) => {
    // Xử lý sự kiện khi chú chó được click
    setExploding(true);
    setGiftVisible(false);
    playSound();
    onClick(true);
    if (group.current) {
      setGiftPosition(group.current.position);
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
      group.current.position.y -= 0.07; // Điều chỉnh tốc độ rơi
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
        onClick={handlePointerDown}
        visible={giftVisible}
      >
        <mesh
          geometry={nodes.defaultMaterial.geometry}
          material={materials.M_Lines}
        />
        <mesh
          geometry={nodes.defaultMaterial_1.geometry}
          material={materials.M_BTop}
        />
        <mesh
          geometry={nodes.defaultMaterial_2.geometry}
          material={materials.M_BBottom}
        />
      </group>
      {exploding && <ExplosionEffect position={giftPosition} />}
    </>
  );
}

useGLTF.preload("src/model/gift-three.glb");
