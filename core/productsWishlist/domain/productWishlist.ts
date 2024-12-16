import { Product } from "@core/products/domain/product";

export type ProductWithAddedAt = Product & {
  addedAt: string;
}

export type ProductWishlist = {
  id: number;
  userId: number;
  totalPrice: number;
  products: ProductWithAddedAt[];
  createdAt: string;
  updatedAt: string;
}

export type SortedProducts = {
  title: string;
  addedAt: string;
  price: number;
}