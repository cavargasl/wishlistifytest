import { ProductWishlist } from "./productWishlist";

export type ProductWishlistRepository = {
  createList: (userId?: number) => Promise<ProductWishlist>;
  getByUserId: (userId: number) => Promise<ProductWishlist | undefined>;
  toggleProduct: (data: {
    userId: number;
    product: ProductWishlist["products"][0];
  }) => Promise<ProductWishlist>;
  clearList: (userId: number) => void;
};
