import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import useSound from "use-sound";
import { IProps } from "../../types/gift.props";

export const calculateFallSpeed = (): number => {
  const speeds = [0.3, 0.4, 0.5, 0.8, 0.9, 1];
  const rSpeed = Math.ceil(Math.random() * speeds.length) - 1;

  return speeds[rSpeed];
};

export function useGift({ onClick, position, product }: IProps, model: string) {
  const ref = useRef<Group>(null) as RefObject<Group>;
  const camera = useThree().camera;

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
      const distance = ref.current.position.distanceTo(camera.position);
      const newSize = 1 + 40 / distance;

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
