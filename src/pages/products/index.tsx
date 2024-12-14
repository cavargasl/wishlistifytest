import { productService } from "@core/products/application/productService";
import { Product } from "@core/products/domain/product";
import { axiosProducts } from "@core/products/infrastructure/axiosProducts.repository";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { heart, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import "./index.css";

export default function Products() {
  const isLoading = true;
  const isFetching = false;
  const [data, setData] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    (async () => {
      try {
        const products = await productService(axiosProducts()).getProducts({
          pagination: { offset: page, limit: 2 },
        });
        setData(prev => [...prev, ...products]);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [page]);

  const nextPage = () => {
    setPage((e) => e + 5);
  };

  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const clearList = () => {
    showAlert({
      header: "Confirmar",
      message: "Estas seguro que deseas borrar todos los productos?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Borrar",
          handler: () => {
            setData([]);
            showToast({
              message: "Todos los productos han sido borrados",
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

      <IonContent fullscreen>
        {isLoading && (
          <h1>
            <IonLoading />
          </h1>
        )}
        <IonList>
          {data.map((item) => (
            <IonCard key={item.id}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonImg src={item.images[0]} className="container-image" />
                  <IonLabel>
                    {item.title}
                    <IonLabel>
                      {`Precio: $${item.price}`}
                    </IonLabel>
                    <p className="description">{item.description}</p>
                  </IonLabel>
                  <IonIcon icon={heart} slot="end" />
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        <IonButton onClick={nextPage} disabled={isFetching} expand="full" color={"tertiary"}>
          {isFetching ? "Cargando..." : "Cargar mas datos"}
        </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
