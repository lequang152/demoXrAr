import { useState, useRef } from "react";
import { Vector3 } from "three";
import { useProducts } from "../context/product.context";
import { MOCK_UNDEFINED_PRODUCT, Product } from "../../types/products";
import { OrbitControls } from "@react-three/drei";
import { giftFactory } from "../gift/gift.factory";
import * as React from "react";

interface IProps {
  isUserClicked: boolean;
  setIsUserClicked: (value: any) => void;
  setProduct: (value: any) => void;
}
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function getFactor(x: number) {
  if (x >= 1) {
    return 10;
  }

  let c = 1;
  while (x < 10) {
    x = x * 10;
    c++;
  }

  return 0.01 * Math.pow(10, c);
}

function randomProducts(products: Product[]) {
  if (products.length === 0) {
    return undefined;
  }

  let productsCopy: Product[] = [MOCK_UNDEFINED_PRODUCT];
  const x = Array.from(products);
  productsCopy.push(...x);

  let prods = [];

  let min = 99999;

  for (let p of products) {
    if (p.probability < min) {
      min = p.probability;
    }
  }

  let factor = getFactor(min);
  for (let p of productsCopy) {
    let prob = Math.round(p.probability * factor);

    if (prob < 0) {
      prob = 1;
    }

    while (prob > 0) {
      prods.push(p);
      prob--;
    }
  }

  prods = shuffleArray(prods);

  let randomValue = Math.ceil(Math.random() * prods.length) - 1;

  const rand = prods[randomValue];

  if (rand.id == undefined) {
    return undefined;
  }

  return rand;
}

const FallingManager = ({
  isUserClicked,
  setIsUserClicked,
  setProduct,
}: IProps) => {
  const [fallingComponents, setFallingComponents] = useState<JSX.Element[]>([]);
  const numberOfGifts = Number(process.env.REACT_APP_MAX_GIFT) || 30;
  const [products, ,] = useProducts();

  // const [showModal, setShowModal] = useState(false);
  //giới hạn lượt chơi
  const count = useRef(99);

  const randomGiftComponent = () => {
    const randomX = Math.random() * 80 - 40;
    const randomZ = Math.random() * 120 - 60;
    const randomY = Math.random() * 200;
    const randomProduct = randomProducts(products);

    if (!isUserClicked) {
      setProduct(randomProduct);
    }
    const position = new Vector3(randomX, randomY, randomZ);
    let fallingDog = giftFactory({
      product: randomProduct,
      onClick: setIsUserClicked,
      position: position,
    });
    return fallingDog;
  };

  React.useEffect(() => {
    if (fallingComponents.length > numberOfGifts) {
      setFallingComponents((pre) => {
        return pre.slice(pre.length / 2);
      });
    }

    let x = setTimeout(() => {
      let timeout: NodeJS.Timeout;
      setFallingComponents((pre) => {
        const c = randomGiftComponent();

        return [...pre, c];
      });
    }, 500);
    return () => {
      clearTimeout(x);
    };
  }, [fallingComponents.length]);

  return count.current > 0 ? (
    <>
      {fallingComponents.map((c, index) => (
        // Thêm thuộc tính key với giá trị index
        <React.Fragment key={index}>{c}</React.Fragment>
      ))}
    </>
  ) : (
    <></>
  );
};

export default FallingManager;
