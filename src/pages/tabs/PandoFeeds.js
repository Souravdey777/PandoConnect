import React from "react";
import { IonPage, IonContent,  IonImg } from "@ionic/react";
// import SmallHeader from "../../components/Header/SmallHeader";
// import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";
import Search from "./Search";
// import Submit from "./Submit";
import pandoFeeds from "./PandoFeeds.png"
import pandoFeeds2 from "./PandoFeeds2.png"

const PandoFeeds = (props) => {
  return (
    <IonPage>
    {/* <SmallHeader title="PandoFeeds" /> */}
    <IonContent fullscreen>
      {/* <LargeHeader title="PandoFeeds" /> */}
        {/* <IonText>
          <h1 style={{
            padding: "10px 20px",
            fontWeight: "bold"
          }}>PandoConnect</h1>
        </IonText> */}
        
        <img alt="pandofeedheader" src={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches?pandoFeeds:pandoFeeds2}>
          </img>
        <Search />
        <LinkList location={props.location} />
        {/* </div> */}
      </IonContent>
    </IonPage>
  );
};

export default PandoFeeds;
