import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonIcon,
} from "@ionic/react";
import {
  logOutOutline,
  informationCircleOutline,
  heartOutline,
} from "ionicons/icons";
import { toast } from "../../helpers/toast";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import ThemeToggle from "../../components/shell/ThemeToggle";

const Profile = (props) => {
  const { user } = React.useContext(UserContext);

  async function logoutUser() {
    try {
      await firebase.logout();
      props.history.push("/");
      toast("You have logged out successfully.");
    } catch (err) {
      console.error("Logout Error", err);
      toast(err.message);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        {user ? (
          <div className="app-container">
            <div className="profile-header">
              <IonAvatar>
                <img src={user.photoURL} alt="" />
              </IonAvatar>
              <h2 className="profile-name">{user.displayName}</h2>
              {user.email && <p className="profile-role">{user.email}</p>}
            </div>

            <div style={{ padding: "0 16px 16px" }}>
              <ThemeToggle />
            </div>

            <IonList inset lines="full" style={{ borderRadius: "var(--app-radius)" }}>
              <IonItem button routerLink="/tips" detail>
                <IonIcon slot="start" icon={informationCircleOutline} color="primary" />
                <IonLabel>How it works</IonLabel>
              </IonItem>
              <IonItem
                button
                onClick={logoutUser}
                detail={false}
                lines="none"
              >
                <IonIcon slot="start" icon={logOutOutline} color="danger" />
                <IonLabel color="danger">Log out</IonLabel>
              </IonItem>
            </IonList>
          </div>
        ) : (
          <div className="auth-shell">
            <div className="auth-card">
              <img
                className="auth-card__logo"
                src="/assets/icon/PandoConnectLogo.png"
                alt="PandoConnect"
              />
              <IonIcon
                icon={heartOutline}
                color="secondary"
                style={{ fontSize: "24px", marginBottom: "8px" }}
              />
              <h2 className="auth-card__title">Welcome to PandoConnect</h2>
              <p className="auth-card__tagline">
                Join a global community sharing stories of recovery, hope, and
                support.
              </p>
              <IonButton
                expand="block"
                routerLink="/login"
                color="primary"
                style={{ marginBottom: "12px" }}
              >
                Sign in
              </IonButton>
              <IonButton expand="block" fill="clear" routerLink="/tips">
                How it works
              </IonButton>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
