/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 gift-two.gltf --transform 
Files: gift-two.gltf [33.39KB] > C:\Users\Admin\Downloads\a_gift_box\gift-two-transformed.glb [88.98KB] (-166%)
Author: Rofnay (https://sketchfab.com/Rofnay)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/a-gift-box-1a53662e300b4d7e9ae39eba101409ea
Title: A Gift Box
*/
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 as ThreeVector3 } from "three";
import { RefObject, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { useFrame } from "@react-three/fiber";
import ExplosionEffect from "../effect/ExplosionEffect";
import { IProps } from "../../types/gift.props";

export function GiftTwo({ position, product, onClick }: IProps) {
  const group = useRef<Group>(null) as RefObject<Group>;

  const { nodes, materials, animations } = useGLTF(
    "src/model/gift-two.glb"
  ) as any;

  const { actions } = useAnimations(animations, group);

  const [exploding, setExploding] = useState(false);
  const [giftPosition, setGiftPosition] = useState(position);
  const [giftVisible, setGiftVisible] = useState(true);

  const [playSound] = useSound("src/components/dog/sound.wav");

  const calculateFallSpeed = (probability: number | undefined): number => {
    // Kiểm tra xem probability có tồn tại không
    if (probability !== undefined) {
      // Áp dụng tốc độ rơi dựa trên khoảng giá trị của probability
      if (probability >= 0.1 && probability <= 0.4) {
        return 0.13;
      } else if (probability > 0.4 && probability <= 0.7) {
        return 0.2;
      } else if (probability > 0.7 && probability <= 1) {
        return 0.3;
      }
    }

    // Nếu probability không tồn tại hoặc không nằm trong bất kỳ khoảng nào, sử dụng một giá trị mặc định
    return 0.1;
  };

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
      group.current.position.y -= calculateFallSpeed(product?.probability); // Điều chỉnh tốc độ rơi
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
        scale={1.6}
      >
        <mesh
          geometry={nodes.Giftbox_GiftMat_0.geometry}
          material={materials.GiftMat}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      {exploding && <ExplosionEffect position={giftPosition} />}
    </>
  );
}

useGLTF.preload("src/model/gift-two.glb");
