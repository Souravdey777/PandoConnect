import React from "react";
import { IonPage, IonContent, IonText, IonImg } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";
import trending from "./trending.png";

const Trending = (props) => {
  return (
    <IonPage>
      {/* <SmallHeader title="Trending" /> */}
      <IonContent fullscreen>
        {/* <LargeHeader title="Trending" /> */}
        {/* <IonText>
          <h1 style={{
            padding: "10px 20px",
            fontWeight: "bold"
          }}>Most<br/><span>Motivating</span><br/>Stories</h1>
        </IonText> */}
        <IonImg src={trending}>
          {/* <h1 style={{
            padding: "10px 20px",
            fontWeight: "bold"
          }}>Most<br/><span>Motivating</span><br/>Stories</h1> */}
          </IonImg>
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Trending;
