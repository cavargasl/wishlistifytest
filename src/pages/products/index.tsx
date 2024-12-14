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
import { useProducts } from "./hooks";

export default function Products() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, refetch } =
    useProducts();
  const queryClient = useQueryClient();

  const clearProducts = () => {
    queryClient.resetQueries({ queryKey: ["products"], exact: false });
  };

  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const clearList = () => {
    showAlert({
      header: "Confirmar",
      message: "Estas seguro que deseas restablecer los productos?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Restablecer",
          handler: () => {
            clearProducts();
            showToast({
              message: "La lista de productos ha sido restablecida",
              duration: 2000,
              color: "success",
            });
          },
        },
      ],
    });
  };

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
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>

      <IonContent className="h-[calc(100vh-112px-56px)]">
        {isLoading && (
          <h1>
            <IonLoading />
          </h1>
        )}
        {!data ? (
          <p className="py-4 text-center">No hay productos</p>
        ) : (
          <IonList>
            {data.pages
              .flatMap((page) => page)
              .map((item) => (
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
