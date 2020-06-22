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
  IonTextarea,
  IonLoading,
} from "@ionic/react";
// import SmallHeader from "../../components/Header/SmallHeader";
// import LargeHeader from "../../components/Header/LargeHeader";
import UserContext from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import validateCreateLink from "../../validators/validateCreateLink";
import { toast } from "../../helpers/toast";

const INITIAL_STATE = {
  description: "",
  url: ""
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

  function handleUploadStart(event) {
    if (!user) {
      props.history.push("/login");
    } else {
      setpictureURL(null);
      setPicture(event.target.files[0]);
    }
  }

  async function handleUploadSuccess() {
    if (!user) {
      props.history.push("/login");
    } 
    else if(!picture){
      toast("choose a image to upload first")
    }
    else {
      setisUploading(true);
      try {
        const url = await firebase.uploadPicture(picture);
        setpictureURL(url);
        setisUploading(false);
      } catch (err) {
        console.error("Upload Error", err);
      }
    }
  };

  function handleCreateLink() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        pictureURL: pictureURL,
        postedBy: {
          id: user.uid,
          name: user.displayName,
          photoURL: user.photoURL
        },
        voteCount: 0,
        votes: [],
        comments: [],
        created: Date.now(),
      };
      setpictureURL(null);
      setPicture(null);
      firebase.db.collection("blogs").add(newLink);
      props.history.push("/");
    }
  }

  return (
    <IonPage>
      {/* <SmallHeader title="Submit" /> */}
      <IonLoading message={"Please wait..."} isOpen={isUploading} />
      <IonContent fullscreen>
        {/* <LargeHeader title="Submit" /> */}

        <IonItem lines="full" style={{
          maxWidth: "425px",
          margin: "auto"
        }}>
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
            name="url"
            value={values.url}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full" style={{
          maxWidth: "425px",
          margin: "auto"
        }}>
          <IonLabel position="floating">Description</IonLabel>
          <IonTextarea
            name="description"
            value={values.description}
            type="text"
            onIonChange={handleChange}
            required
            rows={6}
          ></IonTextarea>
        </IonItem>
        <IonRow style={{
          maxWidth: "425px",
          margin: "auto"
        }}>
          <IonCol style={{
            textAlign: "center"
          }}>
            {pictureURL ? <img src={pictureURL} style={{ width: "200px", margin: "auto" }} alt="preview"></img> : null}
          </IonCol>
        </IonRow>
        <IonRow style={{
          maxWidth: "425px",
          margin: "auto"
        }}>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              fill="outline"
            >
              <IonLabel style={{ textAlign: "center", maxWidth: "400px" }}>{picture ? picture.name : "Choose file"}</IonLabel>
              <input style={{ height: "100%", width: "2400px", position: "absolute" }} accept="image/*" onChange={handleUploadStart} type="file" />
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow style={{
          maxWidth: "425px",
          margin: "auto"
        }}>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleUploadSuccess}
            >
              Upload
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow style={{
          maxWidth: "425px",
          margin: "auto"
        }}>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Submit;
