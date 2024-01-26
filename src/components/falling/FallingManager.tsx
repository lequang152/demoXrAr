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

function randomProducts(products: Product[]) {
  if (products.length === 0) {
    return undefined;
  }

  const productsCopy: Product[] = [
    MOCK_UNDEFINED_PRODUCT,
    MOCK_UNDEFINED_PRODUCT,
    MOCK_UNDEFINED_PRODUCT,
    MOCK_UNDEFINED_PRODUCT,
    MOCK_UNDEFINED_PRODUCT,
    MOCK_UNDEFINED_PRODUCT,
    MOCK_UNDEFINED_PRODUCT,
  ];
  const x = Array.from(products);
  productsCopy.push(...x);

  const totalProbability = productsCopy.reduce(
    (sum, product) => sum + product.probability,
    0
  );
  let randomValue = Math.random() * totalProbability;

  let cumulativeProbability = 0;
  for (const product of productsCopy) {
    cumulativeProbability += product.probability;
    if (randomValue <= cumulativeProbability) {
      if (product.id == undefined) {
        return undefined;
      }
      return product;
    }
  }
  return undefined;
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
    const randomY = Math.random() * 100;
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
  // React.useEffect(() => {
  //   let timeoutId: NodeJS.Timeout | undefined = undefined;
  //   if (isUserClicked) {
  //     count.current--;
  //   }

  //   const spawnFallingComponent = () => {
  //     for (let i = 0; i < numberOfGifts; i++) {
  //       const fallingDog = randomGiftComponent();

  //       setFallingComponents((prevDogs) => [...prevDogs, fallingDog]);

  //       timeoutId = setTimeout(() => {
  //         setFallingComponents((prevDogs) =>
  //           prevDogs.filter((dog) => dog !== fallingDog)
  //         );
  //       }, 5000);
  //     }
  //   };

  //   let spawnInterval: NodeJS.Timeout | undefined = undefined;
  //   if (!isUserClicked) {
  //     spawnInterval = setInterval(spawnFallingComponent, 10000);
  //   }
  //   return () => {
  //     if (spawnInterval) {
  //       clearInterval(spawnInterval);
  //     }
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [isUserClicked]);

  return count.current > 0 ? (
    <>
      <OrbitControls enableZoom={false} />
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
