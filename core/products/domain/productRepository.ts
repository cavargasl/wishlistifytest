import { Params } from "../../shared/domain/params";
import { Product } from "./product";

export type ProductRepository = {
  getProducts: (params?: Params) => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product>;
  getProductsFiltered: (params?: Params) => Promise<Product[]>;
};