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
import validatePasswordReset from "../../validators/validatePasswordReset";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import { toast } from "../../helpers/toast";

const INITIAL_STATE = {
  email: "",
};

const Forgot = () => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validatePasswordReset,
    handleResetPassword
  );
  const [busy, setBusy] = React.useState(false);

  async function handleResetPassword() {
    setBusy(true);
    const { email } = values;
    try {
      await firebase.resetPassword(email);
      toast("Check your email to reset your password.");
    } catch (err) {
      console.error("Password Reset Error", err);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Password reset" />
      <IonLoading message={"Please wait…"} isOpen={busy} />
      <IonContent>
        <div className="app-container app-stack" style={{ paddingTop: "24px" }}>
          <h2 className="app-h1">Reset your password</h2>
          <p className="app-subtitle">
            We&apos;ll email you a link to set a new password.
          </p>
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
          <IonButton
            expand="block"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Get reset link
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Forgot;
