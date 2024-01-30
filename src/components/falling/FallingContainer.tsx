import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { Environment, OrbitControls } from "@react-three/drei";
import FallingManager from "./FallingManager";
import { useEffect, useState } from "react";
import { ApiGiftService } from "../service/api";
import { MOCK_PRODUCTS, Product } from "../../types/products";
import { ProductProvider } from "../context/product.context";
// import { User, UserLogin } from "../../types/user";
import styles from "./style.module.css";
import { User } from "../../types/user";
import PopUp from "../popup/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { Vector3 } from "three";
const backgroundImage =
  import.meta.env.BASE_URL + "assets/background/view3.hdr";

// class ApiThienSuGiftService extends ApiGiftService {
//   public getPromoteProducts(...args: any): Promise<Product[]> {
//     return new Promise((resolve, reject) => {
//       resolve(MOCK_PRODUCTS);
//     });
//   }
//   public userPickProduct(
//     productId: number,
//     user?: User | undefined,
//     ...args: any
//   ): Promise<any> {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   }
//   public authenticate(
//     credential?: UserLogin | undefined,
//     ...args: any
//   ): Promise<boolean | User> {
//     throw new Error("Method not implemented.");
//   }
// }

class ApiThienSuGiftService extends ApiGiftService {
  public getPromoteProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      resolve(MOCK_PRODUCTS);
    });
  }

  public userPickProduct(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  public authenticate(): Promise<boolean | User> {
    throw new Error("Method not implemented.");
  }
}

const FallingContainer = () => {
  const service: ApiGiftService = new ApiThienSuGiftService();
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [product, setProduct] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [quantity, setQuantity] = useState(0);

  // useEffect(() => {
  //   const backgroundLoader = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(backgroundLoader);
  // }, []);

  const handleStartClick = () => {
    setIsReady(true);
  };

  return (
    <>
      <ProductProvider service={service}>
        {!isReady &&
          (quantity > 0 ? (
            <div className={styles["button-start"]}>
              <div className={styles["textButton"]}>Are you ready?</div>
              <div className={styles["button"]}>
                <Button
                  sx={{ backgroundColor: "#5798b7" }}
                  variant="contained"
                  onClick={handleStartClick}
                >
                  Start
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles["notification"]}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                  textWrap: "wrap",
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                Số lượng quà đã hết, cảm ơn bạn đã tham gia!
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  sx={{ backgroundColor: "#5798b7" }}
                  variant="contained"
                  href="/"
                >
                  Trang Chủ
                </Button>
              </div>
            </div>
          ))}
        {/* {isLoading && isReady && (
          <div className={styles.loading}>
            <span>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                style={{ color: "#ffffff", marginRight: 5 }}
              />
            </span>
            <span className={styles.text}>Loading...</span>{" "}
          </div>
        )} */}
        {isUserClicked && (
          <PopUp setIsUserClicked={setIsUserClicked} product={product} />
        )}
        {isReady && (
          <div
            style={{
              width: "100vw",
              height: "100vh",
            }}
          >
            <Canvas
              camera={{ position: [-60, 10, 10], rotation: [200, 200, 200] }}
            >
              <Environment preset="city" />
              <XR>
                <FallingManager
                  isUserClicked={isUserClicked}
                  setIsUserClicked={setIsUserClicked}
                  setProduct={setProduct}
                />
              </XR>
            </Canvas>
          </div>
        )}
      </ProductProvider>
    </>
  );
};

export default FallingContainer;
