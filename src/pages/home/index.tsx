import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { link, logoGithub, logoLinkedin } from "ionicons/icons";

export default function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>WishList App</IonTitle>
          <IonButtons slot="end">
            <IonButton href="https://github.com/cavargasl/wishlistifytest">
              <IonIcon slot="icon-only" icon={logoGithub} />
            </IonButton>
            <IonButton href="https://www.linkedin.com/in/cavargasl/">
              <IonIcon slot="icon-only" icon={logoLinkedin} />
            </IonButton>
            <IonButton href="https://portfolio-camilovargas123.vercel.app/">
              <IonIcon slot="icon-only" icon={link} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color={"primary"}>
          <IonTitle>React + Ionic, prueba técnica</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonLabel>
          <h1 className="text-center py-8">Documentación de decisiones de arquitectura y optimizaciones implementadas</h1>

        </IonLabel>
        {
          documentationData.map((item) => (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="text-primary-contrast">{item.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  {item.content.map((content) => (
                    <>
                    <strong className="font-bold text-[#e4e4e4]">{content.subtitle}</strong>
                    <p>{content.text}</p>
                    <br />
                    </>
                  ))}
                </IonText>
              </IonCardContent>
            </IonCard>
          ))
        }
      </IonContent>
    </IonPage>
  );
}


const documentationData = [
  {
    title: "1. Arquitectura Hexagonal",
    content: [
      {
        subtitle: "Decisión:",
        text: "Se eligió implementar una arquitectura hexagonal para garantizar una separación clara entre las capas de dominio, aplicación, infraestructura y compartidos (shared). Esto permite mayor mantenibilidad, escalabilidad y testeabilidad del código."
      },
      {
        subtitle: "Implementación:",
        text: "Core: Contiene la lógica de negocio y entidades (como products y whitelist)."
      },
      {
        subtitle: "Domain:",
        text: "Define los modelos (Product, WhitelistItem) y reglas del dominio."
      },
      {
        subtitle: "Application:",
        text: "Contiene los servicios (productService) que construye las reglas de negocio."
      },
      {
        subtitle: "Infrastructure:",
        text: "Define los adaptadores y repositorios necesarios para interactuar con APIs externas o persistencia local."
      },
      {
        subtitle: "Shared:",
        text: "Proporciona configuraciones comunes (axiosConfig, utilidades) reutilizable por todas las entidades."
      }
    ]
  },
  {
    title: "2. Uso de TanStack Query para el manejo de datos asíncronos",
    content: [
      {
        subtitle: "Decisión:",
        text: "Se optó por TanStack Query en lugar de Redux o Zustand para el manejo de datos asíncronos, ya que ofrece una solución más eficiente y simplificada para manejar el fetching, cacheo y sincronización de datos."
      },
      {
        subtitle: "Razones:",
        text: "Caché automático para evitar llamadas redundantes a la API."
      },
      {
        subtitle: "Lógica integrada para scroll infinito:",
        text: "Se implementó utilizando useInfiniteQuery, que incluye lógica para paginación y cacheo automático."
      },
      {
        subtitle: "Revalidación automática para mantener la lista de productos actualizada:",
        text: "Reducción de código boilerplate comparado con Redux."
      },
      {
        subtitle: "Optimización implementada:",
        text: "Scroll infinito: Se implementó utilizando useInfiniteQuery, que incluye lógica para paginación y cacheo automático."
      },
      {
        subtitle: "Localización de estado:",
        text: "Cada entidad mantiene su propio estado relacionado con datos asíncronos sin necesidad de un state global centralizado."
      }
    ]
  },
  {
    title: "3. Persistencia de datos favoritos en LocalStorage",
    content: [
      {
        subtitle: "Decisión:",
        text: "Para manejar la lista de productos favoritos (whitelist), se decidió persistir los datos en LocalStorage, asegurando que los favoritos sean accesibles incluso después de cerrar o reiniciar la aplicación."
      },
      {
        subtitle: "Implementación:",
        text: "Se creó una nueva entidad llamada whitelist en el directorio core."
      },
      {
        subtitle: "Domain:",
        text: "Define el modelo WhitelistItem y las reglas del dominio."
      },
      {
        subtitle: "Application:",
        text: "Incluye servicios para agregar, quitar y recuperar elementos de favoritos."
      },
      {
        subtitle: "Infrastructure:",
        text: "Implementa un repositorio para interactuar con LocalStorage, existe la posibilidad de comunicarse fácilmente con un storage en remoto."
      },
      {
        subtitle: "Optimización implementada:",
        text: "Uso de middlewares y hooks de React Query para sincronizar automáticamente el estado de favoritos con LocalStorage."
      },
      {
        subtitle: "Separación de lógica en servicios reutilizable para evitar duplicación de código.",
        text: ""
      }
    ]
  },
  {
    title: "4. Configuración y uso de Axios",
    content: [
      {
        subtitle: "Decisión:",
        text: "Se decidió centralizar la configuración de Axios en un único archivo (axiosConfig.ts) dentro de shared/api para reutilizar esta configuración en todos los repositorios."
      },
      {
        subtitle: "Implementación:",
        text: "Configuración de baseURL, headers comunes y manejo global de errores."
      },
      {
        subtitle: "Uso de interceptores para agregar lógica previa a las solicitudes y respuestas.",
        text: "Implementación de cualquier repositorio que reutiliza esta configuración para interactuar con la API de prueba."
      },
      {
        subtitle: "Optimización implementada:",
        text: "Eliminación de duplicación en las configuraciones de peticiones HTTP."
      },
      {
        subtitle: "Simplificación de la interacción con la API pública.",
        text: ""
      },
      {
        subtitle: "Incorporación de logs para depuración (eliminados antes de producción).",
        text: ""
      }
    ]
  },
  {
    title: "5. Gestión de estado de scroll infinito",
    content: [
      {
        subtitle: "Decisión:",
        text: "El estado y la lógica de scroll infinito fueron manejados usando TanStack Query, evitando la necesidad de crear un estado global o local manualmente."
      },
      {
        subtitle: "Implementación:",
        text: "Se utilizó useInfiniteQuery para cargar datos por página."
      },
      {
        subtitle: "Lógica de paginación integrada en el cliente HTTP (axiosInstance).",
        text: "Optimización implementada: Eliminar duplicación de código para manejar paginación."
      },
      {
        subtitle: "Mejora del rendimiento gracias al cacheo automático de datos cargados.",
        text: ""
      }
    ]
  },
  {
    title: "6. Patrones de diseño y principios SOLID",
    content: [
      {
        subtitle: "Decisión:",
        text: "Se siguieron los principios SOLID y patrones de diseño para mantener un código limpio y escalable."
      },
      {
        subtitle: "Implementación:",
        text: "Single Responsibility Principle: Cada capa tiene una única responsabilidad claramente definida."
      },
      {
        subtitle: "Dependency Inversion Principle:",
        text: "Los repositorios e infraestructura dependen de abstracciones, no de implementaciones concretas."
      },
      {
        subtitle: "Adaptadores y puertos:",
        text: "Implementados en la capa de infraestructura para desacoplar las dependencias externas del núcleo de la aplicación."
      }
    ]
  },
  {
    title: "7. Configuración de herramientas de desarrollo (Pendiente)",
    content: [
      {
        subtitle: "Decisión:",
        text: "Aunque se había planeado la implementación de herramientas para mantener el código limpio y consistente durante el desarrollo, como Prettier, ESLint, Lint-staged y Husky, por cuestiones de tiempo no se completó su configuración."
      },
      {
        subtitle: "Implementación pendiente:",
        text: "Prettier, ESLint, Lint-staged y Husky para la validación del código y mantener la calidad en el pipeline de desarrollo."
      },
    ]
  }
];