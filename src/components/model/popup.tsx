import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faGift,
  faHeart,
  faSquare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useProducts } from "../context/product.context";
import { useNavigate } from "react-router-dom";

interface IProps {
  setIsUserClicked: (value: any) => void;
  product: any;
}

function PopUp({ setIsUserClicked, product }: IProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts, service] = useProducts();
  const navigator = useNavigate();
  useEffect(() => {
    // Add a delay to the appearance for demonstration purposes
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsUserClicked(false);
  };

  const getRandomNumber = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const generateRandomElements = (
    icon: any,
    count: number,
    isSecondRange: boolean = false
  ) => {
    const elements = [];
    const minLeft = isSecondRange ? 60 : 3;
    const maxLeft = isSecondRange ? 99 : 40;

    for (let i = 0; i < count; i++) {
      const size = getRandomNumber(10, 20);
      const top = getRandomNumber(5, 90);
      const left = getRandomNumber(minLeft, maxLeft);
      const color = getRandomColor();
      elements.push(
        <FontAwesomeIcon
          key={i}
          icon={icon}
          style={{
            color,
            fontSize: size,
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
          }}
        />
      );
    }
    return elements;
  };

  return (
    <div className={`${styles.box} ${isVisible ? styles.show : ""}`}>
      <button className={styles.closeButton} onClick={handleClose}>
        &times;
      </button>
      <div style={{ position: "relative" }}>
        <FontAwesomeIcon
          icon={faGift}
          flip="horizontal"
          style={{ color: "#63E6BE", fontSize: 100, marginBottom: 10 }}
        />
        {generateRandomElements(faStar, 2, false)}
        {generateRandomElements(faStar, 2, true)}
        {generateRandomElements(faHeart, 2, true)}
        {generateRandomElements(faHeart, 2, false)}
        {generateRandomElements(faSquare, 2, false)}
        {generateRandomElements(faCircle, 2, true)}
        {/* <FontAwesomeIcon
          className={`${styles.star}`}
          icon={faStar}
          style={{ color: "#FFD43B", fontSize: 12, top: "12%", left: "13%" }}
        />
        <FontAwesomeIcon
          className={`${styles.heart}`}
          icon={faHeart}
          style={{ color: "#c12f2f", fontSize: 12, top: "20%", left: "80%" }}
        />
        <FontAwesomeIcon
          className={`${styles.heart}`}
          icon={faHeart}
          style={{ color: "#c12f2f", fontSize: 12, top: "24%", left: "20%" }}
        />
        <FontAwesomeIcon
          className={`${styles.square}`}
          icon={faSquare}
          style={{ color: "#74C0FC", fontSize: 12, top: "13%", left: "80%" }}
        />
        <FontAwesomeIcon
          className={`${styles.square}`}
          icon={faSquare}
          style={{ color: "#74C0FC", fontSize: 12, top: "6%", left: "20%" }}
        />
        <FontAwesomeIcon icon={faCircle} bounce style={{ color: "#B197FC" }} /> */}
      </div>
      <div className={styles.title}>CHÚC MỪNG</div>
      <div>
        Bạn đã nhận được phần thưởng là 1 sản phẩm:{" "}
        <span style={{ fontWeight: 600 }}>{product.title}</span>
      </div>
      <div style={{ marginBottom: 10 }}> {product.description}</div>
      <div>
        <Image src={product.imageURL} rounded width={100} />
      </div>
      <div style={{ marginTop: 10 }}>
        <Button
          href="/"
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            // chỗ này xử lý khi user click đổi quà
            if (service) {
              service
                .userPickProduct(product.id)
                .then(() => {
                  navigator("/");
                })
                .catch((err) => {
                  // handle error here
                });
            }
          }}
        >
          Đổi quà
        </Button>
      </div>
    </div>
  );
}

export default PopUp;
