import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { useQueryClient } from "@tanstack/react-query";
import { heart, trash } from "ionicons/icons";
import { useState } from "react";
import { useProducts, useSearchProducts } from "./hooks";

export default function Products() {
  const { data: paginatedData, fetchNextPage, hasNextPage, isLoading, isFetching, refetch } =
    useProducts();
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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: searchData, refetch: refetchSearch } = useSearchProducts(searchTerm);
  const clearSearch = () => {
    setSearchTerm("");
    refetchSearch();
  };
  const data = searchTerm ? searchData : paginatedData?.pages.flatMap((page) => page);

  return (
    <>
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
        {isLoading && (
          <h1>
            <IonLoading />
          </h1>
        )}
        {
        !data ? <h1 className="py-4 text-center">Opss... algo salió mal</h1> :
        !data.length ? (
          searchTerm ? (
            <p className="py-4 text-center">No hay productos que coincidan con el término de búsqueda</p>
          ) : (
            <p className="py-4 text-center">No hay productos</p>
          )
        ) : (
          <IonList>
            {data.map((item) => (
                <IonCard key={item.id}>
                  <IonCardContent className="px-0 py-2">
                    <IonItem lines="none">
                      <IonImg
                        src={item.images[0]}
                        className="w-32 h-32 object-cover mr-4"
                      />
                      <IonLabel className="my-0">
                        {item.title}
                        <IonLabel>{`Precio: $${item.price}`}</IonLabel>
                        <p className="line-clamp-3">{item.description}</p>
                      </IonLabel>
                      <IonIcon icon={heart} slot="end" />
                    </IonItem>
                  </IonCardContent>
                </IonCard>
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
            {/* <IonButton
              onClick={() => fetchNextPage()}
              disabled={isFetching}
              hidden={!hasNextPage}
              expand="full"
              color={"tertiary"}
            >
              {isFetching ? "Cargando..." : "Cargar mas datos"}
            </IonButton> */}
          </IonList>
        )}
      </IonContent>
    </>
  );
}
