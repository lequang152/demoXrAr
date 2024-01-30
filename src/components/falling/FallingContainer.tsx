import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { Environment, OrbitControls } from "@react-three/drei";
import FallingManager from "./FallingManager";
import { useEffect, useState } from "react";
import { ApiGiftService } from "../service/api";
import { MOCK_PRODUCT, Product } from "../../types/products";
import { ProductProvider } from "../context/product.context";
// import { User, UserLogin } from "../../types/user";
import styles from "./style.module.css";
import { User } from "../../types/user";
import PopUp from "../popup/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { Vector3 } from "three";
import { rejects } from "assert";
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
  public getPromoteProducts(...args: any): Promise<Product[]> {
    return new Promise((resolve) => {
      resolve(MOCK_PRODUCT.products);
    });
  }

  public userPickProduct(
    productId: number | undefined,
    user?: User,
    ...args: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      // kiểm tra xem id có tồn tại trong danh sách hay không, thực ra chỗ này chỉ
      // mô tả cách hoạt động của backend.
      try {
        if (productId) {
          const found = MOCK_PRODUCT.products.find(
            (pro) => pro.id == productId && pro.number && pro.number > 0
          );
          if (found) {
            // xóa sản phẩm đó đi.
            let ps = MOCK_PRODUCT.products;
            console.log("Before");
            console.log(found);
            if (found && found?.number) {
              found.number -= 1;
            }
            console.log("After");
            console.log(found);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      } catch (err) {
        reject(false);
      }
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

  const handleStartClick = () => {
    setIsReady(true);
  };

  return (
    <>
      <ProductProvider service={service}>
        {
          !isReady && (
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
          )

          // <div className={styles["notification"]}>
          //   <div
          //     style={{
          //       fontWeight: 600,
          //       fontSize: 20,
          //       textWrap: "wrap",
          //       textAlign: "center",
          //       marginBottom: 12,
          //     }}
          //   >
          //     Số lượng quà đã hết, cảm ơn bạn đã tham gia!
          //   </div>
          //   <div style={{ textAlign: "center" }}>
          //     <Button
          //       sx={{ backgroundColor: "#5798b7" }}
          //       variant="contained"
          //       href="/"
          //     >
          //       Trang Chủ
          //     </Button>
          //   </div>
          // </div>
        }
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
