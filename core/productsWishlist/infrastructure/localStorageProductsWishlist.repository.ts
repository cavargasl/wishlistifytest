import { ANONYMOUS_USER_ID } from "@core/shared/const";
import { ProductWishlist } from "../domain/productWishlist";
import { ProductWishlistRepository } from "../domain/productWishlistRepository";

const LOCAL_STORAGE_KEY = "productsWishlist_";

export const localStorageProductsWishlist = (): ProductWishlistRepository => {
  const readFromLocalStorage = (userId: number): ProductWishlist | undefined => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY+userId);
    return data ? JSON.parse(data) : undefined;
  };

  const writeToLocalStorage = (wishlist: ProductWishlist, userId: number): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY+userId, JSON.stringify(wishlist));
  };
  const clearWishlist = (userId: number): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEY+userId);
  };

  return {
    async createList(userId = ANONYMOUS_USER_ID) {
      const wishlist = readFromLocalStorage(userId);
      if (wishlist) {
        return wishlist;
      }
      const date = new Date();
      const newWishlist: ProductWishlist = {
        id: Date.now() + Math.random(),
        userId: userId,
        totalPrice: 0,
        products: [],
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      };
      writeToLocalStorage(newWishlist, userId);
      return newWishlist;
    },
    async getByUserId(userId) {
      const wishlist = readFromLocalStorage(userId);
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
        writeToLocalStorage(newWishlist, userId);
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
      writeToLocalStorage(wishlist, userId);
      return wishlist;
    },
    async clearList(userId) {
      const wishlist = await this.getByUserId(userId);
      if (!wishlist) {
        return;
      }
      clearWishlist(userId);
    },
  };
};
