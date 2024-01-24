import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faFaceSadCry,
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
  let getProduct;
  const randomValue = Math.random();

  if (randomValue <= 0.7) {
    getProduct = undefined;
  } else {
    // Ở đây, bạn có thể set giá trị cho getProduct nếu muốn
    getProduct = product; // Thay yourValue bằng giá trị mong muốn
  }
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts, service] = useProducts();

  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = descriptionRef.current;
      if (element) {
        const lineHeight = parseInt(getComputedStyle(element).lineHeight);
        const maxHeight = lineHeight * 4; // 4 dòng
        const isOverflowed = element.scrollHeight > maxHeight;
        setIsExpanded(isOverflowed);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

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
          bounce
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
      {getProduct ? (
        <div>
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
          </div>
          <div className={styles.title}>CHÚC MỪNG</div>
          <div>
            Bạn đã nhận được phần thưởng là 1 sản phẩm:{" "}
            <span style={{ fontWeight: 600 }}>{product.name}</span>
          </div>
          <div ref={descriptionRef} className={`${styles.description}`}>
            {" "}
            {product.description}
          </div>
          {!isExpanded && (
            <div className={styles.readMore}>
              <a href={product.saleLink}>xem thêm</a>
            </div>
          )}
          <div>
            <Image src={product.image} rounded width={100} />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button
              href="/"
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#6daff1" }}
              onClick={() => {
                // chỗ này xử lý khi user click đổi quà
                if (service) {
                  service
                    .userPickProduct(Number(product.id))
                    .then(() => {
                      navigator("/");
                    })
                    .catch((err: any) => {
                      console.log(err);
                      // handle error here
                    });
                }
              }}
            >
              Đổi quà
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <FontAwesomeIcon
            icon={faFaceSadCry}
            beat
            style={{ color: "#74C0FC", fontSize: 100, marginBottom: 10 }}
          />{" "}
          <div className={styles.title}>CHÚC BẠN MAY MẮN LẦN SAU</div>
          <div style={{ textAlign: "justify", fontWeight: 500 }}>
            Cảm ơn bạn đã tham gia chương trình.
          </div>
          <div
            style={{ textAlign: "justify", fontWeight: 500, marginBottom: 10 }}
          >
            Chúc bạn may mắn hơn ở những sự kiện lần sau !
          </div>
          <Button
            href="/"
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#6daff1" }}
          >
            Trang Chủ
          </Button>
        </div>
      )}
    </div>
  );
}

export default PopUp;
