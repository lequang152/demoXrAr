import { useState, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { Dog } from "./Dog";
import { useProducts } from "../context/product.context";
import { Product } from "../../types/products";

interface IProps {
  isUserClicked: boolean;
  setIsUserClicked: (value: any) => void;
}

function randomProducts(products: Product[]) {
  return Math.ceil(Math.random() * products.length) - 1;
}

const FallingDogManager = ({ isUserClicked, setIsUserClicked }: IProps) => {
  const [fallingDogs, setFallingDogs] = useState<JSX.Element[]>([]); // Use JSX.Element[] as the type

  const [products, setProducts, service] = useProducts();

  // const [showModal, setShowModal] = useState(false);
  //giới hạn lượt chơi
  const count = useRef(1);

  useEffect(() => {
    const spawnFallingDog = () => {
      const randomX = Math.random() * 20 - 10;
      const randomZ = Math.random() * 20 - 10;
      const productIndex = randomProducts(products);
      const position = new Vector3(randomX, 10, randomZ);
      const fallingDog = (
        <Dog
          key={Date.now()}
          onClick={setIsUserClicked}
          product={products[productIndex]}
          position={position}
        />
      );
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

  return count.current > 0 ? <>{fallingDogs}</> : <></>;
};

export default FallingDogManager;
