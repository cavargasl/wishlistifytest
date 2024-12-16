import { formatPriceToUSD } from "@/utils/format";
import { productWishlistService } from "@core/productsWishlist/application/productWishlistService";
import { SortedProducts } from "@core/productsWishlist/domain/productWishlist";
import { useSortedWishlist } from "@core/productsWishlist/domain/useSortedWishlist";
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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { heartDislike } from "ionicons/icons";
import { useState } from "react";
import ProductCard from "../products/ProductCard";

const fetchWishlist = productWishlistService(
  localStorageProductsWishlist()
).getByUserId;

const filterFields: (keyof SortedProducts)[] = ["title", "addedAt", "price"];
const filterLabels: Record<keyof SortedProducts, string> = {
  title: "Título",
  addedAt: "Añadido",
  price: "Precio",
};

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

  const [sortField, setSortField] = useState<keyof SortedProducts | "">("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const sortedWishlist = useSortedWishlist({ wishlist, sortField, order });

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

        <IonToolbar
          color={"danger"}
          className="flex items-center justify-between"
        >
          {wishlist && wishlist.totalPrice > 0 && (
            <IonTitle>
              Total: {formatPriceToUSD(wishlist.totalPrice)}
            </IonTitle>
          )}
          <IonSelect
            slot="end"
            className="mr-4"
            aria-label="Filtro"
            placeholder="Filtro"
            onIonChange={(e) => setSortField(e.detail.value!)}
          >
            {filterFields.map((field) => {
              return (
                <IonSelectOption key={field} value={field}>
                  {filterLabels[field]}
                </IonSelectOption>
              );
            })}
          </IonSelect>
          <IonSelect
            slot="end"
            className="ion-padding-end"
            value={order}
            onIonChange={(e) => setOrder(e.detail.value)}
          >
            <IonSelectOption value="asc">Asc</IonSelectOption>
            <IonSelectOption value="desc">Desc</IonSelectOption>
          </IonSelect>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!wishlist || wishlist.products.length === 0 ? (
          <p className="py-4 text-center">Tu lista de deseados está vacía</p>
        ) : (
          <IonList>
            {sortedWishlist?.map((product) => (
              <ProductCard key={product.id} product={product} isFavorite />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
