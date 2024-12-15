import { Product } from '@core/products/domain/product';
import { productWishlistService } from '@core/productsWishlist/application/productWishlistService';
import { localStorageProductsWishlist } from '@core/productsWishlist/infrastructure/localStorageProductsWishlist.repository';
import { ANONYMOUS_USER_ID } from '@core/shared/const';
import { IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonLabel } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { useEffect, useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const wishlist = await productWishlistService(localStorageProductsWishlist()).getByUserId(ANONYMOUS_USER_ID);
      if (wishlist?.products.some((item) => item.id === product.id)) {
        setIsFavorite(true);
      }
    };
    checkIfFavorite();
  }, [product]);

  const handleToggle = async () => {
    await productWishlistService(localStorageProductsWishlist()).toggleProduct({ userId: ANONYMOUS_USER_ID, product });
    setIsFavorite((prev) => !prev);
  };

  return (
    <IonCard>
      <IonCardContent className="px-0 py-2">
        <IonItem lines="none">
          <IonImg src={product.images[0]} className="w-32 h-32 object-cover mr-4" />
          <IonLabel className="my-0">
            {product.title}
            <IonLabel>{`Precio: $${product.price}`}</IonLabel>
            <p className="line-clamp-3">{product.description}</p>
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
  )
}
