import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  newspaperOutline,
  // searchOutline,
  personCircleOutline,
  createOutline,
  trendingUpOutline,
} from "ionicons/icons";
import PandoFeeds from "./pages/tabs/PandoFeeds";
import Trending from "./pages/tabs/Trending";
import Submit from "./pages/tabs/Submit";
// import Search from "./pages/tabs/Search";
import Profile from "./pages/tabs/Profile";
import EditProfile from "./pages/auth/EditProfile";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Forgot from "./pages/auth/Forgot";
import Link from "./pages/Link";
import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
import Sidebar from "./components/shell/Sidebar";
import ProfilePanel from "./components/shell/ProfilePanel";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables + global component rules */
import "./theme/variables.css";
import "./theme/global.css";
import Tips from "./pages/tips";

const App = () => {
  const [user, setUser] = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <div className="app-shell">
            <Sidebar />
            <div className="app-shell__main">
        <IonTabs>
            <IonRouterOutlet>
              <Route
                path="/"
                render={() => <Redirect to="/pandofeeds" />}
                exact={true}
              />
              <Route path="/pandofeeds" component={PandoFeeds} />
              <Route path="/trending" component={Trending} />
              <Route path="/submit" component={Submit} />
              <Route path="/profile" component={Profile} />
              <Route path="/edit-profile" component={EditProfile} />
              <Route path="/register" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/tips" component={Tips} />
              <Route path="/link/:linkId" component={Link} />
              <Route component={() => <Redirect to="/pandofeeds" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="app-tab-bar">
              <IonTabButton tab="pandofeeds" href="/pandofeeds">
                <IonIcon icon={newspaperOutline} />
                <IonLabel>PandoFeed</IonLabel>
              </IonTabButton>
              <IonTabButton tab="trending" href="/trending">
                <IonIcon icon={trendingUpOutline} />
                <IonLabel>Trending</IonLabel>
              </IonTabButton>
              <IonTabButton tab="submit" href="/submit">
                <IonIcon icon={createOutline} />
                <IonLabel>Submit</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
            </div>
            <ProfilePanel />
          </div>
        </UserContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
