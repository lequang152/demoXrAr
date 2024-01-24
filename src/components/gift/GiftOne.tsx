/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 scene.gltf --transform 
Files: scene.gltf [39.12KB] > C:\Users\Admin\Downloads\gift\scene-transformed.glb [91.56KB] (-134%)
Author: Mug (https://sketchfab.com/1Mug)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/gift-729c11632ae14db6975e4d58e8749b54
Title: Gift
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 as ThreeVector3 } from "three";
import { Product } from "../../types/products";
import { RefObject, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { useFrame } from "@react-three/fiber";
import ExplosionEffect from "../effect/ExplosionEffect";
import { IProps } from "../../types/gift.props";

export function GiftOne({ position, product, onClick }: IProps) {
  const group = useRef<Group>(null) as RefObject<Group>;

  const { nodes, materials, animations } = useGLTF(
    "src/model/gift-one.glb"
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
      group.current.position.y -= 0.09; // Điều chỉnh tốc độ rơi
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
          geometry={nodes.Sphere008_Material013_0.geometry}
          material={materials["Material.013"]}
          position={[0.266, 2.761, 0.074]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.098}
          visible={giftVisible}
        />
        <mesh
          geometry={nodes.Cube_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[0, 0.871, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.Cube001_Material008_0.geometry}
          material={materials["Material.008"]}
          position={[0, 1.331, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.127}
        />
        <mesh
          geometry={nodes.Cube003_Material009_0.geometry}
          material={materials["Material.009"]}
          position={[0, 1.158, 0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.897, 1.19, 1.382]}
        />
        <mesh
          geometry={nodes.Cube002_Material010_0.geometry}
          material={materials["Material.010"]}
          position={[0, 1.15, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.897, 1.19, 1.382]}
        />
        <instancedMesh
          args={[
            nodes.Sphere_Material023_0.geometry,
            materials["Material.023"],
            11,
          ]}
          instanceMatrix={nodes.Sphere_Material023_0.instanceMatrix}
        />
      </group>
      {exploding && <ExplosionEffect position={giftPosition} />}
    </>
  );
}

useGLTF.preload("src/model/gift-one.glb");
