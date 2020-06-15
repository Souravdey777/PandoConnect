import React from "react";
import { IonPage, IonContent, IonText } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";

const Trending = (props) => {
  return (
    <IonPage>
      {/* <SmallHeader title="Trending" /> */}
      <IonContent fullscreen>
        {/* <LargeHeader title="Trending" /> */}
        <IonText>
          <h1 style={{
            padding: "10px 20px",
            fontWeight: "bold"
          }}>Check out the most motivating story</h1>
        </IonText>
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Trending;
