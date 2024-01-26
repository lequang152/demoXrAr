import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import useSound from "use-sound";
import { IProps } from "../../types/gift.props";

export const calculateFallSpeed = (probability: number | undefined): number => {
  let defaultFallSpeed = probability ? probability * 2 : 0.5;

  let x = Math.random() * defaultFallSpeed;
  if (x == 0) {
    x = 0.1;
  }
  return x;
};

export function useGift({ onClick, position, product }: IProps, model: string) {
  const ref = useRef<Group>(null) as RefObject<Group>;

  const { nodes, materials, animations } = useGLTF(model) as any;

  const { actions } = useAnimations(animations, ref);

  const [exploding, setExploding] = useState(false);
  const [giftPosition, setGiftPosition] = useState(position);
  const [giftVisible, setGiftVisible] = useState(true);

  const [playSound] = useSound("/assets/audio/sound.wav");

  const onUserClickOnGift = (_event: any) => {
    // Xử lý sự kiện khi chú chó được click
    setExploding(true);
    setGiftVisible(false);
    playSound();
    onClick(true);
    if (ref.current) {
      setGiftPosition(ref.current.position);
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
    if (ref.current) {
      // const x = ref.current.position.x;
      // const y = ref.current.position.y;

      // const { clientWidth, clientHeight } = document.documentElement;

      // const worldPosition = new Vector3();

      // ref.current.getWorldPosition(worldPosition);

      // const isOutOfScreen =
      //   worldPosition.x < 0 ||
      //   worldPosition.x > clientWidth ||
      //   worldPosition.y < 0 ||
      //   worldPosition.y > clientHeight;

      ref.current.position.y -= calculateFallSpeed(product?.probability); // Điều chỉnh tốc độ rơi
      ref.current.scale.set(0.5, 0.5, 0.5);
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
