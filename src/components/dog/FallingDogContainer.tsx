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
  const [modalShow, setModalShow] = React.useState(false);

  const service: ApiGiftService = new ApiThienSuGiftService();
  return (
    <>
      <ProductProvider service={service}>
        <Canvas>
          <Environment files="/src/components/dog/view.hdr" background />
          <XR>
            <FallingDogManager setModalShow={setModalShow} />
            {/* <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            1
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Centered Modal</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                onClick={() => setModalShow(false)}
              ></Button>
            </Modal.Footer>
          </Modal> */}
          </XR>
        </Canvas>
      </ProductProvider>
    </>
  );
};

export default FallingDogContainer;
