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

  const productsCopy = Array.from(products);

  productsCopy.push(MOCK_UNDEFINED_PRODUCT);

  const totalProbability = productsCopy.reduce(
    (sum, product) => sum + product.probability,
    0
  );
  const randomValue = Math.random() * totalProbability;

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
  const [fallingDogs, setFallingDogs] = useState<JSX.Element[]>([]); // Use JSX.Element[] as the type

  const [products, ,] = useProducts();

  // const [showModal, setShowModal] = useState(false);
  //giới hạn lượt chơi
  const count = useRef(99);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    if (isUserClicked) {
      count.current--;
    }

    const spawnFallingDog = () => {
      const numberOfGifts = 30; // Số lượng hộp quà muốn xuất hiện cùng một lúc

      for (let i = 0; i < numberOfGifts; i++) {
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
        setFallingDogs((prevDogs) => [...prevDogs, fallingDog]);

        timeoutId = setTimeout(() => {
          setFallingDogs((prevDogs) =>
            prevDogs.filter((dog) => dog !== fallingDog)
          );
        }, 5000);
      }
    };

    let spawnInterval: NodeJS.Timeout | undefined = undefined;
    if (!isUserClicked) {
      spawnInterval = setInterval(spawnFallingDog, 5000);
    }
    return () => {
      if (spawnInterval) {
        clearInterval(spawnInterval);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isUserClicked]);

  return count.current > 0 ? (
    <>
      <OrbitControls enableZoom={false} />
      {fallingDogs.map((dog, index) => (
        // Thêm thuộc tính key với giá trị index
        <React.Fragment key={index}>{dog}</React.Fragment>
      ))}
    </>
  ) : (
    <></>
  );
};

export default FallingManager;
