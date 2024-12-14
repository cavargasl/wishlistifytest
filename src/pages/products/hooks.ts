import { productService } from '@core/products/application/productService';
import { axiosProducts } from '@core/products/infrastructure/axiosProducts.repository';
import { useInfiniteQuery } from '@tanstack/react-query';

const productsFetcher = async ({ pageParam = 0 }: { pageParam : number }) => {
  const products = await productService(axiosProducts()).getProducts({pagination: { offset: pageParam, limit: 10 }});
  return products;
};

export const useProducts = () => {
  return useInfiniteQuery(
    {
      queryKey: ['products'],
      queryFn: productsFetcher,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length < 10 ? undefined : pages.length * 10
      },
    }
  )
};