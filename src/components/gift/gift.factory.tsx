import { IProps } from "../../types/gift.props";
import { Product } from "../../types/products";
import { GiftOne } from "./GiftOne";
import { GiftThree } from "./GiftThree";
import { GiftTwo } from "./GiftTwo";

export type GProps = IProps & {
  setProduct: (product: Product | undefined) => void;
};

export function giftFactory(props: GProps) {
  const giftComponents = [GiftOne, GiftTwo, GiftThree];
  const index = Math.floor(Math.random() * giftComponents.length);
  const ChosenComponent = giftComponents[index];
  return <ChosenComponent {...props} />;
}
