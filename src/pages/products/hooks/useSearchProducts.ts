import { productService } from "@core/products/application/productService";
import { axiosProducts } from "@core/products/infrastructure/axiosProducts.repository";
import { useQuery } from "@tanstack/react-query";

const searchProductsFetcher = async (searchTerm: string) => {
  const products = await productService(axiosProducts()).getProductsFiltered({
    title: searchTerm,
  });
  return products;
};

export const useSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => searchProductsFetcher(searchTerm),
    enabled: !!searchTerm,
  });
};
