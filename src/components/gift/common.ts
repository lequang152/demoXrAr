import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import useSound from "use-sound";
import { IProps } from "../../types/gift.props";
import { useProducts } from "../context/product.context";
import { GProps } from "./gift.factory";

export const calculateFallSpeed = (): number => {
  const speeds = [0.3, 0.4, 0.5, 0.8, 0.9, 1];
  const rSpeed = Math.ceil(Math.random() * speeds.length) - 1;

  return speeds[rSpeed];
};

export function useGift(
  { onClick, position, product, setIsSuccess, setProduct }: GProps,
  model: string
) {
  const ref = useRef<Group>(null) as RefObject<Group>;
  const camera = useThree().camera;
  const [, , service] = useProducts();
  const { nodes, materials, animations } = useGLTF(model) as any;

  const { actions } = useAnimations(animations, ref);

  const [exploding, setExploding] = useState(false);
  const [giftPosition, setGiftPosition] = useState(position);
  const [giftVisible, setGiftVisible] = useState(true);
  const [playSound] = useSound("/assets/audio/sound.wav");
  const [isLoading, setIsLoading] = useState(false);
  const onUserClickOnGift = async (_event: any) => {
    console.log("Click");
    setExploding(true);
    playSound();
    if (ref.current) {
      setGiftPosition(ref.current.position);
    }

    try {
      if (!isLoading) {
        console.log("RENDER");

        setIsLoading(true);
        const data = await service.userPickProduct(
          product?.id ? Number(product.id) : undefined
        );
        if (data) {
          setIsSuccess!(true);
        } else {
          setIsSuccess!(false);
        }
        setProduct(data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsSuccess!(false);
    } finally {
      setGiftVisible(false);
      onClick(true);
    }

    setTimeout(() => {
      setExploding(false);
    }, 1000);
  };

  useEffect(() => {
    if (actions.animation) {
      actions.animation.play();
    }
  }, [actions.animation]);

  useFrame(() => {
    if (ref.current) {
      const distance = ref.current.position.distanceTo(camera.position);
      const newSize = 1 + 75 / distance;

      ref.current.position.y -= calculateFallSpeed(); // Điều chỉnh tốc độ rơi
      ref.current.scale.set(newSize, newSize, newSize);
      ref.current.rotation.y += 0.1;
    }
  });
  return {
    ref,
    nodes,
    materials,
    animations,
    actions,
    exploding,
    setExploding,
    setGiftPosition,
    giftVisible,
    setGiftVisible,
    onUserClickOnGift,
    giftPosition,
  };
}
