import React from "react";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonLabel,
  IonIcon,
  IonText,
  IonItem,
  IonAvatar,
} from "@ionic/react";
import Linkify from 'react-linkify';
import {
  chatbubbleEllipsesOutline,
  heart,
  heartOutline,
} from "ionicons/icons";
import { getTimeAgoString } from "../../dayFormat/dateFormat";

const LinkItem = ({ link, index, showCount, url, browser, fullblog }) => {
  return (
    <IonCard routerLink={url} style={{
      margin: "5px",
      boxShadow: "rgba(2, 2, 2, 0.2) 0px 2px 10px",
      borderRadius: "13px",
    }}>
      <IonCardContent class="ion-no-padding">
        {link?.pictureURL ? <img style={{ margin: "auto" }} src={link?.pictureURL} alt="pic"></img> : null}
        <IonList lines="none">
          <IonItem lines="none">
            <IonLabel>
              <p style={{
                fontSize: "0.9rem",
                fontWeight: "bold",
                paddingBottom: "6px"
              }}><IonText className="ion-text-wrap">
                  {link.url}
                </IonText>
              </p>
              {fullblog && <p
                style={{
                  alignItems: "center",
                  fontSize: "0.8rem",
                  fontWeight: "normal",
                }}
              >
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                  className="ion-text-wrap"
                >
                  <Linkify>{link.description}</Linkify>
                </IonText>
              </p>}
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonLabel style={{ padding: "0px" }}>
              <div
                style={{
                  alignItems: "center",
                  fontSize: "0.7 rem",
                  fontWeight: "normal",
                }}
              >
                <IonText
                  style={{
                    verticalAlign: "middle",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                  }}
                >
                  <p>{link.postedBy.name}</p>
                  <p style={{
                    verticalAlign: "middle",
                    fontSize: "0.7rem",
                    color: "#999",
                    fontWeight: "normal"
                  }}
                  >
                    {getTimeAgoString(link.created)}</p>

                </IonText>

                {link.voteCount > 0 ?
                  <>
                    <IonIcon
                      icon={heart}
                      style={{
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    <IonText
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {link.voteCount}
                    </IonText>
                  </> :
                  <IonIcon
                    icon={heartOutline}
                    style={{
                      verticalAlign: "middle",
                    }}
                  />}
                {" "}
                {link.comments.length > 0 && (
                  <>

                    <IonIcon
                      icon={chatbubbleEllipsesOutline}
                      style={{
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    <IonText
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {link.comments.length}
                    </IonText>
                  </>
                )}
              </div>
            </IonLabel>
            <IonAvatar slot="end">
              <img
                src={link.postedBy.photoURL}
                style={{
                  verticalAlign: "middle",
                }}
                alt="profile"
              />
            </IonAvatar>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default LinkItem;
