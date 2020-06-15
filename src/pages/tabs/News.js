import React from "react";
import { IonPage, IonContent, IonText } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";
import Search from "./Search";
// import Submit from "./Submit";

const News = (props) => {
  return (
    <IonPage>
    {/* <SmallHeader title="News" /> */}
    <IonContent fullscreen>
      {/* <LargeHeader title="News" /> */}
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

export default News;
