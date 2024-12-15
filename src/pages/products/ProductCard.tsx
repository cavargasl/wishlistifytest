import { Product } from "@core/products/domain/product";
import { productWishlistService } from "@core/productsWishlist/application/productWishlistService";
import { localStorageProductsWishlist } from "@core/productsWishlist/infrastructure/localStorageProductsWishlist.repository";
import { ANONYMOUS_USER_ID } from "@core/shared/const";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { heart } from "ionicons/icons";

export default function ProductCard({
  product,
  isFavorite,
}: {
  product: Product;
  isFavorite: boolean;
}) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: productWishlistService(localStorageProductsWishlist())
      .toggleProduct,
    onSuccess: (data) => {
      queryClient.setQueryData(["wishlist"], data);
    },
  });

  const handleToggle = async () => {
    mutate({ userId: ANONYMOUS_USER_ID, product });
  };

  return (
    <IonCard>
      <IonCardContent className="px-0 py-2">
        <IonItem lines="none">
          <IonImg
            src={product.images[0]}
            className="w-32 h-32 object-cover mr-4"
          />
          <IonLabel className="my-0">
            <IonLabel className="!line-clamp-2">{product.title}</IonLabel>
            <IonLabel className="!line-clamp-1">{`Precio: $${product.price}`}</IonLabel>
            <p className="!line-clamp-3">{product.description}</p>
          </IonLabel>
          <IonIcon
            className="cursor-pointer"
            icon={heart}
            slot="end"
            color={isFavorite ? "danger" : "medium"}
            onClick={handleToggle}
          />
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
}
