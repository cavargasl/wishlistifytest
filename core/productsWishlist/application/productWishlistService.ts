import { ProductWishlistRepository } from "../domain/productWishlistRepository";

export const productWishlistService = (
  repository: ProductWishlistRepository
): ProductWishlistRepository => ({
  createList(userId) {
    return repository.createList(userId);
  },
  getByUserId(userId) {
    return repository.getByUserId(userId);
  },
  toggleProduct(data) {
    return repository.toggleProduct(data);
  },
  clearList(userId) {
    return repository.clearList(userId);
  },
});
