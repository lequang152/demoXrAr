import { IProps } from "../../types/gift.props";
import { GiftOne } from "./GiftOne";
import { GiftThree } from "./GiftThree";
import { GiftTwo } from "./GiftTwo";

export function giftFactory(props: IProps) {
  const giftComponents = [GiftOne, GiftTwo, GiftThree];
  const index = Math.floor(Math.random() * giftComponents.length);
  const ChosenComponent = giftComponents[index];
  return <ChosenComponent {...props} />;
}
