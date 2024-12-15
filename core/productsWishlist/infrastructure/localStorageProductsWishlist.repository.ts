import { ANONYMOUS_USER_ID } from "@core/shared/const";
import { ProductWishlist } from "../domain/productWishlist";
import { ProductWishlistRepository } from "../domain/productWishlistRepository";

const LOCAL_STORAGE_KEY = "productsWishlist";

export const localStorageProductsWishlist = (): ProductWishlistRepository => {
  const readFromLocalStorage = (): ProductWishlist | undefined => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : undefined;
  };

  const writeToLocalStorage = (wishlist: ProductWishlist): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlist));
  };

  return {
    async createList(userId) {
      const wishlist = readFromLocalStorage();
      if (wishlist) {
        return wishlist;
      }
      const date = new Date();
      const newWishlist: ProductWishlist = {
        id: Date.now() + Math.random(),
        userId: userId || ANONYMOUS_USER_ID,
        totalPrice: 0,
        products: [],
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      };
      writeToLocalStorage(newWishlist);
      return newWishlist;
    },
    async getByUserId(userId) {
      const wishlist = readFromLocalStorage();
      if (!wishlist) {
        return undefined;
      }
      return wishlist.userId === userId ? wishlist : undefined;
    },
    async toggleProduct({ userId, product }) {
      const wishlist = await this.getByUserId(userId);
      if (!wishlist) {
        const newWishlist = await this.createList(userId);
        newWishlist.products.push(product);
        newWishlist.totalPrice += product.price;
        newWishlist.updatedAt = new Date().toISOString();
        writeToLocalStorage(newWishlist);
        return newWishlist;
      }

      const productIndex = wishlist.products.findIndex(
        (existingProduct) => existingProduct.id === product.id
      );

      if (productIndex > -1) {
        const [removedProduct] = wishlist.products.splice(productIndex, 1);
        wishlist.totalPrice -= removedProduct.price;
      } else {
        wishlist.products.push(product);
        wishlist.totalPrice += product.price;
      }
      wishlist.updatedAt = new Date().toISOString();
      writeToLocalStorage(wishlist);
      return wishlist;
    },
  };
};
