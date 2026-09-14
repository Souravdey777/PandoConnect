import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import LinkList from "../../components/Link/LinkList";
import Search from "./Search";
import FeedTopBar from "../../components/Feed/FeedTopBar";

const PandoFeeds = (props) => {
  return (
    <IonPage>
      <IonContent fullscreen className="feed-content">
        <FeedTopBar />
        <div className="feed-header">
          <Search />
        </div>
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default PandoFeeds;
