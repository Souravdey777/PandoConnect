import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import { toast } from "../../helpers/toast";
import useForm from "../../hooks/useForm";
import validateSignup from "../../validators/validateSignup";
import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const Signup = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateSignup,
    authenticateUser
  );
  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { name, email, password } = values;
    try {
      await firebase.register(name, email, password);
      toast("You have signed up successfully!");
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Sign up" />
      <IonLoading message={"Please wait…"} isOpen={busy} />
      <IonContent>
        <div className="app-container app-stack" style={{ paddingTop: "24px" }}>
          <h2 className="app-h1">Create your account</h2>
          <IonItem className="app-field" lines="none">
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              name="name"
              type="text"
              value={values.name}
              onIonChange={handleChange}
              required
            ></IonInput>
          </IonItem>
          <IonItem className="app-field" lines="none">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              name="email"
              type="email"
              inputmode="email"
              value={values.email}
              onIonChange={handleChange}
              required
            ></IonInput>
          </IonItem>
          <IonItem className="app-field" lines="none">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              name="password"
              type="password"
              value={values.password}
              onIonChange={handleChange}
              required
            ></IonInput>
          </IonItem>
          <IonButton
            expand="block"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Sign up
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
