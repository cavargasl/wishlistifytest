import { productWishlistService } from "@core/productsWishlist/application/productWishlistService";
import { localStorageProductsWishlist } from "@core/productsWishlist/infrastructure/localStorageProductsWishlist.repository";
import { ANONYMOUS_USER_ID } from "@core/shared/const";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { heartDislike } from "ionicons/icons";
import ProductCard from "../products/ProductCard";

const fetchWishlist = productWishlistService(
  localStorageProductsWishlist()
).getByUserId;

export default function Wishlist() {
  const { data: wishlist, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => fetchWishlist(ANONYMOUS_USER_ID),
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();

  const resetWishlist = async () => {
    await productWishlistService(localStorageProductsWishlist()).clearList(
      ANONYMOUS_USER_ID
    );
    queryClient.resetQueries({ queryKey: ["wishlist"], exact: false });
  };

  useIonViewWillEnter(() => {
    refetch();
  });

  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const clearList = () => {
    showAlert({
      header: "Eliminar lista de deseados",
      message: "Estas seguro que deseas eliminar tu lista de deseados?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Eliminar",
          handler: () => {
            resetWishlist();
            showToast({
              message: "Tu lista de deseados ha sido eliminada",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Lista de Deseados</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={clearList}
              disabled={wishlist?.products.length === 0}
            >
              <IonIcon slot="icon-only" icon={heartDislike} color={"light"} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color={"danger"}>
          <IonTitle>Precio total: ${wishlist?.totalPrice}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!wishlist || wishlist.products.length === 0 ? (
          <p className="py-4 text-center">Tu lista de deseados está vacía</p>
        ) : (
          <IonList>
            {wishlist.products.map((product) => (
              <ProductCard key={product.id} product={product} isFavorite />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
