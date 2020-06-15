import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
// import LinkList from "../../components/Link/LinkList";

const Tips = (props) => {
  return (
    <IonPage>
    <SmallHeader title="Tips" />
      <IonContent fullscreen>
        <LargeHeader title="Tips" />
        {/* <LinkList location={props.location} /> */}
        hi
      </IonContent>
    </IonPage>
  );
};

export default Tips;
