import { Product } from "../../types/products";

export abstract class ApiGiftService {
  public abstract getPromoteProducts(): Promise<Product[]>;

  public abstract authenticate(): Promise<boolean>;
}
