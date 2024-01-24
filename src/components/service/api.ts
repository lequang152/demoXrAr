import { Product } from "../../types/products";
import { User, UserLogin } from "../../types/user";

export abstract class ApiGiftService {
  /**
   * Lấy tất cả các sản phẩm được dùng để làm sự kiện
   * @param args
   */
  public abstract getPromoteProducts(...args: any): Promise<Product[]>;

  /**
   * Gọi hàm này khi user nhấn vào hộp quà
   * @param productId
   * @param user
   * @param args
   */
  public abstract userPickProduct(
    productId: number,
    user?: User,
    ...args: any
  ): Promise<Product | boolean | any>;

  /**
   * Dùng để đăng nhập trước khi tham gia trò chơi, cái này còn tùy yêu cầu của khách hàng
   * Mình có thể dùng username & password để đăng nhập, hoặc dùng một mã code duy nhất để login vào trò chơi (dùng thuộc tính authToken)
   * @param credential
   * @param args
   */
  public abstract authenticate(
    credential?: UserLogin,
    ...args: any
  ): Promise<User | boolean>;
}
