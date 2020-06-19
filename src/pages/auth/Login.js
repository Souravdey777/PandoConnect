import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonRouterLink,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import validateLogin from "../../validators/validateLogin";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import { toast } from "../../helpers/toast";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );
  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { email, password } = values;
    try {
      await firebase.doSignInWithGoogle().then((data) => {
        console.log(data);
      });
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
      <NavHeader title="Log In" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full"  style={{
                  maxWidth: "425px",
                  margin:"auto"
                  }}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full"  style={{
                  maxWidth: "425px",
                  margin:"auto"
                  }}>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            value={values.password}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonRow  style={{
                  maxWidth: "425px",
                  margin:"auto"
                  }}>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              // onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Sign In
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
              routerLink={"/login"}
              color="primary"
              fill="outline"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <img alt="logo" style={{
                marginRight: "10px",
                width: "18px",
                height: "18px"
              }} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                  Sign in with Google
                </IonButton>
          </IonCol>
        </IonRow>
        <IonRow  style={{
                  maxWidth: "425px",
                  margin:"auto"
                  }}>
          <IonCol class="ion-text-center ion-padding-vertical">
            <IonRouterLink routerLink={"/forgot"}>
              Forgot Password?
            </IonRouterLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
