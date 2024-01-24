import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { Environment } from "@react-three/drei";
import FallingDogManager from "./FallingDogManager";
import { useEffect, useState } from "react";
import { ApiGiftService } from "../service/api";
import { MOCK_PRODUCTS, Product } from "../../types/products";
import { ProductProvider } from "../context/product.context";
import { User, UserLogin } from "../../types/user";
import PopUp from "../model/popup";

class ApiThienSuGiftService extends ApiGiftService {
  public getPromoteProducts(...args: any): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      resolve(MOCK_PRODUCTS);
    });
  }
  public userPickProduct(
    productId: number,
    user?: User | undefined,
    ...args: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
  public authenticate(
    credential?: UserLogin | undefined,
    ...args: any
  ): Promise<boolean | User> {
    throw new Error("Method not implemented.");
  }
}

const FallingDogContainer = () => {
  const service: ApiGiftService = new ApiThienSuGiftService();
  const [isUserClicked, setIsUserClicked] = useState(false);

  return (
    <>
      <ProductProvider service={service}>
        {isUserClicked && (
          <PopUp
            setIsUserClicked={setIsUserClicked}
            product={{
              imageURL: "src/assets/img/nuoc-lau-kinh-01.png",
              title: "Nước lau kính Elysa",
              description: "Nước lau kính cao cấp",
            }}
          />
        )}
        <Canvas>
          <Environment files="/src/components/dog/view.hdr" background />
          <XR>
            <FallingDogManager
              isUserClicked={isUserClicked}
              setIsUserClicked={setIsUserClicked}
            />
          </XR>
        </Canvas>
      </ProductProvider>
    </>
  );
};

export default FallingDogContainer;
