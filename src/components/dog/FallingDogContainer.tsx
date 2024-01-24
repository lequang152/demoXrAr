import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { Environment, View } from "@react-three/drei";
import FallingDogManager from "./FallingDogManager";
import { useEffect, useState } from "react";
import { ApiGiftService } from "../service/api";
import { MOCK_PRODUCTS, Product } from "../../types/products";
import { ProductProvider } from "../context/product.context";
import { User, UserLogin } from "../../types/user";
import Modal from "react-bootstrap/Modal";
import * as React from "react";
import Button from "@mui/material/Button";

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
    throw new Error("Method not implemented.");
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
  return (
    <>
      <ProductProvider service={service}>
        <Canvas>
          <Environment files="/src/components/dog/view.hdr" background />
          <XR>
            <FallingDogManager />
          </XR>
        </Canvas>
      </ProductProvider>
    </>
  );
};

export default FallingDogContainer;
