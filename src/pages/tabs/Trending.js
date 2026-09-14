import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import LinkList from "../../components/Link/LinkList";
import FeedTopBar from "../../components/Feed/FeedTopBar";

const Trending = (props) => {
  return (
    <IonPage>
      <IonContent fullscreen className="feed-content">
        <FeedTopBar />
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Trending;
