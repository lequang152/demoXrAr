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
import { Group } from "three";
import { RefObject, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { useFrame, useThree } from "@react-three/fiber";
import ExplosionEffect from "../effect/ExplosionEffect";
import { IProps } from "../../types/gift.props";
import { calculateFallSpeed, useGift } from "./common";
const modelGiftThree = import.meta.env.BASE_URL + "assets/model/gift-three.glb";

export function GiftThree({ position, product, onClick }: IProps) {
  const {
    ref,
    onUserClickOnGift,
    giftVisible,
    nodes,
    materials,
    exploding,
    giftPosition,
  } = useGift({ position, product, onClick }, modelGiftThree);

  return (
    <>
      <group
        ref={ref}
        position={position}
        dispose={null}
        onClick={onUserClickOnGift}
        visible={giftVisible}
        scale={1.3}
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

useGLTF.preload(modelGiftThree);
