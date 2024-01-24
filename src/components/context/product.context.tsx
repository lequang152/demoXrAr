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
} as {
  products: Product[];
  setProducts: (products: Product[]) => void;
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
    <productContext.Provider value={{ products, setProducts }}>
      {children}
    </productContext.Provider>
  );
}

export const useProducts = () => {
  const { products, setProducts } = useContext(productContext);

  return [products, setProducts] as [Product[], (products: Product[]) => void];
};
