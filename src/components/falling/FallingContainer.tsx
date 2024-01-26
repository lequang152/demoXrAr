import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { Environment } from "@react-three/drei";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const backgroundLoader = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(backgroundLoader);
  }, []);

  return (
    <>
      <ProductProvider service={service}>
        {isLoading && (
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
        )}
        {isUserClicked && (
          <PopUp setIsUserClicked={setIsUserClicked} product={product} />
        )}
        <Canvas camera={{ position: [-60, 10, 10], rotation: [200, 200, 200] }}>
          <Environment files={backgroundImage} background />
          <XR>
            <FallingManager
              isUserClicked={isUserClicked}
              setIsUserClicked={setIsUserClicked}
              setProduct={setProduct}
            />
          </XR>
        </Canvas>
      </ProductProvider>
    </>
  );
};

export default FallingContainer;
