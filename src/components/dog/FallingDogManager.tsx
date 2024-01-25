import { useState, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useProducts } from "../context/product.context";
import { MOCK_UNDEFINED_PRODUCT, Product } from "../../types/products";
import { OrbitControls } from "@react-three/drei";

import { giftFactory } from "../gift/gift.factory";

interface IProps {
  isUserClicked: boolean;
  setIsUserClicked: (value: any) => void;
}

function randomProducts(products: Product[]) {
  if (products.length === 0) {
    return undefined;
  }

  products.push(MOCK_UNDEFINED_PRODUCT);

  console.log(MOCK_UNDEFINED_PRODUCT);

  const totalProbability = products.reduce(
    (sum, product) => sum + product.probability,
    0
  );
  const randomValue = Math.random() * totalProbability;

  let cumulativeProbability = 0;
  for (const product of products) {
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

const FallingDogManager = ({ isUserClicked, setIsUserClicked }: IProps) => {
  const [fallingDogs, setFallingDogs] = useState<JSX.Element[]>([]); // Use JSX.Element[] as the type

  const [products, ,] = useProducts();

  // const [showModal, setShowModal] = useState(false);
  //giới hạn lượt chơi
  const count = useRef(1);

  useEffect(() => {
    const spawnFallingDog = () => {
      const randomX = Math.random() * 20 - 10;
      const randomZ = Math.random() * 20 - 10;
      const randomProduct = randomProducts(products);
      const position = new Vector3(randomX, 10, randomZ);

      const randomValue = Math.random();
      let fallingDog = giftFactory({
        product: randomProduct,
        onClick: setIsUserClicked,
        position: position,
      });
      setFallingDogs((prevDogs) => [...prevDogs, fallingDog]);

      setTimeout(() => {
        setFallingDogs((prevDogs) =>
          prevDogs.filter((dog) => dog !== fallingDog)
        );
      }, 5000);
    };
    let spawnInterval: NodeJS.Timeout | undefined = undefined;
    if (!isUserClicked) {
      spawnInterval = setInterval(spawnFallingDog, 2000);
    }

    return () => clearInterval(spawnInterval);
  }, []);

  useEffect(() => {
    if (isUserClicked) {
      count.current--;
    }
  }, [isUserClicked]);

  return count.current > 0 ? (
    <>
      <OrbitControls enableZoom={false} />
      {fallingDogs}
    </>
  ) : (
    <></>
  );
};

export default FallingDogManager;
