

import axiosInstance from "@core/shared/api/axiosConfig";
import { ProductRepository } from "../domain/productRepository";
import { productsAdapter, productAdapter } from "./adapter";
import { ProductDTO } from "./dto";

export const axiosProducts = (): ProductRepository => ({
  getProducts: async (params) => {
    const products = await axiosInstance.get<ProductDTO[]>('/products', {
      params: {
        offset: params?.pagination?.offset || 0,
        limit: params?.pagination?.limit || 5,
      },
    });
    return productsAdapter(products.data);
  },

  getProductById: async (productId: number) => {
    const product = await axiosInstance.get<ProductDTO>(`/products/${productId}`);
    return productAdapter(product.data);
  },

  getProductsFiltered: async (params) => {
    delete params?.pagination;
    const products = await axiosInstance.get<ProductDTO[]>('/products', {
      params: {
        ...params,
      },
    });
    return productsAdapter(products.data);
  },
})
    
