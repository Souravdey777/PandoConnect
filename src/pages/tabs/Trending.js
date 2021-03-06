import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import LinkList from "../../components/Link/LinkList";
import trending1 from "./trending1.png";
import trending2 from "./trending2.png";

const Trending = (props) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <img alt="trendingheader" src={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? trending1 : trending2}>
          {/* <h1 style={{
            padding: "10px 20px",
            fontWeight: "bold"
          }}>Most<br/><span>Motivating</span><br/>Stories</h1> */}
        </img>
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Trending;
