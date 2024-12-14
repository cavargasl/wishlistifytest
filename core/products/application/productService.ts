import { ProductRepository } from "../domain/productRepository";

export const productService = (repository: ProductRepository): ProductRepository => ({
  getProducts: async (params) => {
    return await repository.getProducts(params);
  },
  getProductById: async (id) => {
    return await repository.getProductById(id);
  },
})