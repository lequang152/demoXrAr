import { useState, useEffect } from "react";
import { Vector3 } from "three";
import { Dog } from "./Dog";
import { useProducts } from "../context/product.context";
import { Product } from "../../types/products";

function randomProducts(products: Product[]) {
  return Math.ceil(Math.random() * products.length) - 1;
}

const FallingDogManager = () => {
  const [fallingDogs, setFallingDogs] = useState<JSX.Element[]>([]); // Use JSX.Element[] as the type

  const [products, setProducts] = useProducts();

  useEffect(() => {
    const spawnFallingDog = () => {
      const randomX = Math.random() * 20 - 10;
      const randomZ = Math.random() * 20 - 10;

      const productIndex = randomProducts(products);

      const position = new Vector3(randomX, 10, randomZ);
      const fallingDog = (
        <Dog
          key={Date.now()}
          product={products[productIndex]}
          position={position}
        />
      );

      setFallingDogs((prevDogs) => [...prevDogs, fallingDog]);

      // Biến mất sau một khoảng thời gian (ví dụ: 5 giây)
      setTimeout(() => {
        setFallingDogs((prevDogs) =>
          prevDogs.filter((dog) => dog !== fallingDog)
        );
      }, 5000);
    };

    const spawnInterval = setInterval(spawnFallingDog, 2000); // Xuất hiện một con chó mỗi 2 giây

    return () => clearInterval(spawnInterval); // Xóa interval khi component bị hủy
  }, []); // Chỉ chạy một lần khi component được tạo

  return <>{fallingDogs}</>;
};

export default FallingDogManager;
