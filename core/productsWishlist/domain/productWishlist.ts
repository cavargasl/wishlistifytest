import { Product } from "@core/products/domain/product";

export type ProductWishlist = {
  id: number;
  userId: number;
  totalPrice: number;
  products: Product[];
  createdAt: string;
}