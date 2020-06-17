import React from "react";
import { IonPage, IonContent, IonText } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";
import Search from "./Search";
// import Submit from "./Submit";

const PandoFeeds = (props) => {
  return (
    <IonPage>
    {/* <SmallHeader title="PandoFeeds" /> */}
    <IonContent fullscreen>
      {/* <LargeHeader title="PandoFeeds" /> */}
        <IonText>
          <h1 style={{
            padding: "10px 20px",
            fontWeight: "bold"
          }}>PandoConnect</h1>
        </IonText>
        <Search />
        <LinkList location={props.location} />
        {/* </div> */}
      </IonContent>
    </IonPage>
  );
};

export default PandoFeeds;
