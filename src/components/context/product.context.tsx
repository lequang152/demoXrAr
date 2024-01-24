import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../../types/products";
import { ApiGiftService } from "../service/api";

const productContext = createContext({
  products: [],
  setProducts: () => {},
  service: undefined,
} as {
  products: Product[];
  setProducts: (products: Product[]) => void;
  service: ApiGiftService | undefined;
});

export function ProductProvider({
  children,
  service,
}: {
  children: any;
  service: ApiGiftService;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    service
      .getPromoteProducts()
      .then((ps: Product[]) => {
        setProducts(ps);
      })
      .catch((err: any) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  return isError ? (
    <h1>Error</h1>
  ) : (
    <productContext.Provider value={{ products, setProducts, service }}>
      {children}
    </productContext.Provider>
  );
}

export const useProducts = () => {
  const { products, setProducts, service } = useContext(productContext);

  return [products, setProducts, service] as [
    Product[],
    (products: Product[]) => void,
    ApiGiftService
  ];
};
