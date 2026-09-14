import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import firebase from "../../firebase";
import { toast } from "../../helpers/toast";

const Login = (props) => {
  const [busy, setBusy] = React.useState(false);

  async function signInWithGoogle() {
    setBusy(true);
    try {
      await firebase.doSignInWithGoogle();
      toast("You have logged in successfully!");
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Sign in" />
      <IonLoading message={"Please wait…"} isOpen={busy} />
      <IonContent>
        <div className="auth-shell">
          <div className="auth-card">
            <img
              className="auth-card__logo"
              src="/assets/icon/PandoConnectLogo.png"
              alt="PandoConnect"
            />
            <h2 className="auth-card__title">Welcome back</h2>
            <p className="auth-card__tagline">
              Sign in to share your story and support others.
            </p>
            <IonButton
              className="google-btn"
              expand="block"
              onClick={signInWithGoogle}
              disabled={busy}
            >
              <img
                alt=""
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
              Sign in with Google
            </IonButton>
            <IonButton
              expand="block"
              fill="clear"
              routerLink="/tips"
              style={{ marginTop: "8px" }}
            >
              How it works
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
