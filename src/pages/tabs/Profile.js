import React from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonAvatar,
} from "@ionic/react";
import { toast } from "../../helpers/toast";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";

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
    <IonPage >
      {/* <SmallHeader title="Profile" /> */}
      <IonContent fullscreen >
        {/* <LargeHeader title="Profile" /> */}
        {user ? (
          <>
            <IonCard style={{
              background: `linear-gradient(90deg,#00000066,#00000066), url("${user.photoURL}") no-repeat 100% 100%`,
              backgroundSize: "100%",
              height: `${window.innerWidth>424?380:(window.innerWidth - 25)}px`,
              maxWidth: "425px",
              margin:"auto"
            }}>
              <IonCardContent style={{
                background: `transparent`
              }}>
                <IonList lines="none" style={{
                  background: `transparent`
                }}>
                  <IonItem style={{ borderRadius: "13px" }} color="primary">
                    <IonAvatar slot="start">
                      <img src={user.photoURL} alt="profile" />
                    </IonAvatar>
                    {/* <IonIcon icon={personCircleOutline} slot="start"></IonIcon> */}
                    <IonLabel>
                      <strong>{user.displayName}</strong>
                      <p>Motivator</p>
                    </IonLabel>
                  </IonItem>

                  {/* <IonItem>
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.email}</strong>
                      <p>Email</p>
                    </IonLabel>
                  </IonItem> */}
                </IonList>
                {/* <p>total post: 10</p> */}
              </IonCardContent>
            </IonCard>
            {/* <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/edit-profile"}
                  color="primary"
                  fill="outline"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow> */}
            <IonRow style={{
                  maxWidth: "425px",
                  margin:"auto"
                  }}>
              <IonCol>
                <IonButton expand="block" 
                onClick={logoutUser}
                fill="outline">
                  Log Out
                </IonButton>
              </IonCol>
            </IonRow>
              <IonRow style={{
                  maxWidth: "425px",
                  margin:"auto"
                  }}>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={"/tips"}
                    color="primary"
                  >How it works
                </IonButton>
                </IonCol>
              </IonRow>
              <IonRow style={{
                  maxWidth: "425px",
                  margin:"auto"
                  }}>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={"/tips"}
                    color="primary"
                  >Tips for Covid 19
                </IonButton>
                </IonCol>
              </IonRow>
          </>
        ) : (
            <IonGrid style={{
              margin:"auto",
              marginTop: "200px",
              maxWidth: "425px",
              }}>
              {/* <IonRow> */}
              {/* <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={"/register"}
                    color="primary"
                  >
                    Sign Up
                </IonButton>
                </IonCol> */}
              {/* </IonRow> */}
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={"/tips"}
                    color="primary"
                  >How it works
                </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={"/tips"}
                    color="primary"
                  >Tips for Covid 19
                </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    routerLink={"/login"}
                    color="primary"
                    fill="outline"
                  >
                    Sign In
                </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
