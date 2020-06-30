import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import LinkList from "../../components/Link/LinkList";
import Search from "./Search";
import pandoFeeds1 from "./PandoFeeds1.png"
import pandoFeeds2 from "./PandoFeeds2.png"

const PandoFeeds = (props) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <img alt="pandofeedheader" src={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? pandoFeeds1 : pandoFeeds2}>
        </img>
        <Search />
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default PandoFeeds;
