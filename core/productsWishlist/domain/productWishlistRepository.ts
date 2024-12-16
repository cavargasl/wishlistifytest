import { Product } from "@core/products/domain/product";
import { ProductWishlist } from "./productWishlist";

export type ProductWishlistRepository = {
  createList: (userId?: number) => Promise<ProductWishlist>;
  getByUserId: (userId: number) => Promise<ProductWishlist | undefined>;
  toggleProduct: (data: {
    userId: number;
    product: Product;
  }) => Promise<ProductWishlist>;
  clearList: (userId: number) => void;
};
