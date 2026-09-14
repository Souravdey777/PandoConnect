import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonTextarea,
  IonLoading,
} from "@ionic/react";
import { imageOutline, closeCircle, sendOutline } from "ionicons/icons";
import UserContext from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import validateCreateLink from "../../validators/validateCreateLink";
import { toast } from "../../helpers/toast";

const INITIAL_STATE = {
  description: "",
  url: "",
};

const Submit = (props) => {
  const [picture, setPicture] = React.useState(null);
  const [isUploading, setisUploading] = React.useState(false);
  const [pictureURL, setpictureURL] = React.useState(null);
  const { user } = React.useContext(UserContext);
  const { handleSubmit, handleChange, values } = useForm(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  // Choosing a photo uploads it immediately and shows a preview — no separate
  // "Upload" step. Posting a story with no photo stays allowed.
  async function handlePhotoSelected(event) {
    if (!user) {
      props.history.push("/login");
      return;
    }
    const file = event.target.files[0];
    if (!file) return;
    setPicture(file);
    setpictureURL(null);
    setisUploading(true);
    try {
      const url = await firebase.uploadPicture(file);
      setpictureURL(url);
    } catch (err) {
      console.error("Upload Error", err);
      toast("Sorry, that photo could not be uploaded. Please try again.");
      setPicture(null);
    }
    setisUploading(false);
  }

  function removePhoto() {
    setPicture(null);
    setpictureURL(null);
  }

  function handleCreateLink() {
    if (!user) {
      props.history.push("/login");
      return;
    }
    const { url, description } = values;
    const newLink = {
      url,
      description,
      pictureURL: pictureURL,
      postedBy: {
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
      },
      voteCount: 0,
      votes: [],
      comments: [],
      created: Date.now(),
    };
    setpictureURL(null);
    setPicture(null);
    firebase.db.collection("blogs").add(newLink);
    toast("Your story has been shared. Thank you 💚");
    props.history.push("/");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Share</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message={"Uploading your photo…"} isOpen={isUploading} />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Share your story</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="app-container app-stack" style={{ paddingTop: "8px" }}>
          <p className="app-subtitle">
            A few honest words can lift someone having a hard day.
          </p>

          <IonItem className="app-field" lines="none">
            <IonLabel position="floating">Title</IonLabel>
            <IonInput
              name="url"
              value={values.url}
              type="text"
              onIonChange={handleChange}
              placeholder="Give your story a headline"
              required
            ></IonInput>
          </IonItem>

          <IonItem className="app-field" lines="none">
            <IonLabel position="floating">Your story</IonLabel>
            <IonTextarea
              name="description"
              value={values.description}
              onIonChange={handleChange}
              placeholder="Share your experience, recovery, or encouragement…"
              required
              rows={7}
            ></IonTextarea>
          </IonItem>

          {/* Photo picker with inline preview */}
          {pictureURL ? (
            <div style={{ position: "relative", textAlign: "center" }}>
              <img
                src={pictureURL}
                alt="preview"
                style={{ width: "100%", borderRadius: "var(--app-radius-sm)" }}
              />
              <IonButton
                fill="clear"
                size="small"
                onClick={removePhoto}
                aria-label="Remove photo"
                style={{ position: "absolute", top: "4px", right: "4px" }}
              >
                <IonIcon slot="icon-only" icon={closeCircle} />
              </IonButton>
            </div>
          ) : (
            <IonButton expand="block" fill="outline" style={{ position: "relative" }}>
              <IonIcon slot="start" icon={imageOutline} />
              {picture ? picture.name : "Add a photo (optional)"}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoSelected}
                aria-label="Add a photo to your story"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </IonButton>
          )}

          <IonButton
            expand="block"
            color="primary"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            <IonIcon slot="start" icon={sendOutline} />
            Post story
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Submit;
