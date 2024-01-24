import { useState, useEffect } from "react";
import { Vector3 } from "three";
import { Dog } from "./Dog";

interface IProps {
  setModalShow: (value: any) => void;
}

const FallingDogManager = ({ setModalShow }: IProps) => {
  const [fallingDogs, setFallingDogs] = useState<JSX.Element[]>([]); // Use JSX.Element[] as the type

  useEffect(() => {
    const spawnFallingDog = () => {
      const randomX = Math.random() * 20 - 10; // Vị trí x ngẫu nhiên trong khoảng từ -10 đến 10
      const randomZ = Math.random() * 20 - 10; // Vị trí z ngẫu nhiên trong khoảng từ -10 đến 10
      const position = new Vector3(randomX, 10, randomZ); // Vị trí ban đầu ở độ cao 10
      const fallingDog = (
        <Dog key={Date.now()} position={position} setModalShow={setModalShow} />
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
