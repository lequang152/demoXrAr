import { Vector3 as ThreeVector3 } from "three";
import { Product } from "./products";
export interface IProps {
  position: ThreeVector3;
  product?: Product;
  onClick: (bool: boolean) => void;
  setIsSuccess?: (bool: boolean) => void;
}
