import { productWishlistService } from "@core/productsWishlist/application/productWishlistService";
import { localStorageProductsWishlist } from "@core/productsWishlist/infrastructure/localStorageProductsWishlist.repository";
import { ANONYMOUS_USER_ID } from "@core/shared/const";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type FavoriteStates = {
  [key: string]: boolean;
};
const fetchWishlist = productWishlistService(
  localStorageProductsWishlist()
).getByUserId;

export const useWishlist = (userId = ANONYMOUS_USER_ID) => {
  const { data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => fetchWishlist(userId),
    staleTime: Infinity,
  });

  const [favoriteStates, setFavoriteStates] = useState<FavoriteStates>({});

  useEffect(() => {
    if (wishlist) {
      const initialFavorites = wishlist.products.reduce(
        (acc: FavoriteStates, product) => {
          acc[String(product.id)] = true;
          return acc;
        },
        {}
      );
      setFavoriteStates(initialFavorites);
    }
  }, [wishlist]);

  return {
    wishlist,
    favoriteStates,
  };
};
