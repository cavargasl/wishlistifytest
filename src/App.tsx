import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { home, pricetags, heart } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
/* import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css'; */

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Products from '@/pages/products';

setupIonicReact();

const routes = {
  home: '/home',
  products: '/products',
  wishlist: '/wishlist',
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

    <IonTabs>
        <IonRouterOutlet>
          <Route exact path={routes.home}>
            <h1>Home</h1>
          </Route>
          <Route exact path={routes.products}>
            <Products />
          </Route>
          <Route path={routes.wishlist}>
            <h1>Wishlist</h1>
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href={routes.home}>
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href={routes.products}>
            <IonIcon aria-hidden="true" icon={pricetags} />
            <IonLabel>Productos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href={routes.wishlist}>
            <IonIcon aria-hidden="true" icon={heart} />
            <IonLabel>Deseados</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
