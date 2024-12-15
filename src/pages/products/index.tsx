import { productWishlistService } from "@core/productsWishlist/application/productWishlistService";
import { localStorageProductsWishlist } from "@core/productsWishlist/infrastructure/localStorageProductsWishlist.repository";
import { ANONYMOUS_USER_ID } from "@core/shared/const";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { trash } from "ionicons/icons";
import { useState } from "react";
import { useProducts, useSearchProducts } from "./hooks";
import ProductCard from "./ProductCard";

const fetchWishlist = productWishlistService(
  localStorageProductsWishlist()
).getByUserId;

export default function Products() {
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useProducts();
  const queryClient = useQueryClient();
  
  const resetList = () => {
    queryClient.resetQueries({ queryKey: ["products"], exact: false });
  };
  
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const clearList = () => {
    showAlert({
      header: "Restablecer lista",
      message: "Estas seguro que deseas restablecer la lista de productos?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Restablecer",
          handler: () => {
            resetList();
            clearSearch();
            showToast({
              message: "Los productos han sido restablecidos",
              duration: 2000,
              color: "success",
            });
          },
        },
      ],
    });
  };
  
  const { data: wishlist, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => fetchWishlist(ANONYMOUS_USER_ID),
    staleTime: Infinity,
  });
  
  useIonViewWillEnter(() => {
    refetch();
  });
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: searchData, refetch: refetchSearch } =
  useSearchProducts(searchTerm);
  const clearSearch = () => {
    setSearchTerm("");
    refetchSearch();
  };
  const data = searchTerm
  ? searchData
  : paginatedData?.pages.flatMap((page) => page);
  
  console.log("🚀 ~ Products ~ paginatedData:", data,isLoading ,isFetching ,isFetchingNextPage);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Productos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon slot="icon-only" icon={trash} color={"light"} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color={"success"}>
          <IonSearchbar
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value!)}
            debounce={500}
            placeholder="Buscar"
            onIonClear={clearSearch}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent className="h-[calc(100vh-112px-56px)]">
        <IonList>
          {(isLoading || isFetching || isFetchingNextPage) && !data?.length && (
            <p className="py-4 text-center">Cargando...</p>
          )}
          {!isLoading && !isFetching && !isFetchingNextPage && searchTerm && !data?.length && (
            <p className="py-4 text-center">
              No hay productos que coincidan con el término de búsqueda
            </p>
          )}
          {!isLoading && !isFetching && !isFetchingNextPage && !searchTerm && !data?.length && (
            <p className="py-4 text-center">
              Lista de productos vacía
            </p>
          )}
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isFavorite={
                  wishlist?.products.some(
                    (product) => product.id === item.id
                  ) || false
                }
              />
            ))}
          <IonInfiniteScroll
            disabled={!!searchTerm}
            onIonInfinite={(ev) => {
              fetchNextPage();
              setTimeout(() => ev.target.complete(), 300);
            }}
          >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
