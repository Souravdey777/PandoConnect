import React from "react";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import Linkify from "react-linkify";
import {
  chatbubbleEllipsesOutline,
  heart,
  heartOutline,
  leafOutline,
} from "ionicons/icons";
import { getTimeAgoString } from "../../dayFormat/dateFormat";
import { resolveSentiment } from "../../helpers/sentiment";

const LinkItem = ({ link, index, showCount, url, browser, fullblog }) => {
  const sentiment = resolveSentiment(link);

  return (
    <IonCard routerLink={url} className="link-card">
      <IonCardContent className="ion-no-padding">
        {link?.pictureURL ? (
          <div className="card-media">
            <img src={link.pictureURL} alt="" />
            {sentiment && (
              <span
                className={`sentiment-badge ${sentiment.cls}`}
                aria-label={`Sentiment: ${sentiment.label}`}
              >
                <IonIcon icon={leafOutline} aria-hidden="true" />
                {sentiment.label}
              </span>
            )}
          </div>
        ) : null}

        <div style={{ padding: "16px" }}>
          <h2 className="link-card__title">
            <Linkify>{link.url}</Linkify>
          </h2>

          {fullblog && (
            <p className="link-card__desc">
              <Linkify>{link.description}</Linkify>
            </p>
          )}

          {!link?.pictureURL && sentiment && (
            <div style={{ marginBottom: "8px" }}>
              <span
                className={`sentiment-badge ${sentiment.cls}`}
                aria-label={`Sentiment: ${sentiment.label}`}
              >
                <IonIcon icon={leafOutline} aria-hidden="true" />
                {sentiment.label}
              </span>
            </div>
          )}

          <div className="link-card__meta">
            <IonAvatar style={{ width: "28px", height: "28px" }}>
              <img src={link.postedBy.photoURL} alt="" />
            </IonAvatar>
            <span className="meta-name">{link.postedBy.name}</span>
            <span className="meta-sep">·</span>
            <span>{getTimeAgoString(link.created)}</span>

            <span className="link-card__stats">
              <span
                className="link-card__stat"
                aria-label={`${link.voteCount || 0} upvotes`}
              >
                <IonIcon
                  icon={link.voteCount > 0 ? heart : heartOutline}
                  color={link.voteCount > 0 ? "secondary" : undefined}
                  aria-hidden="true"
                />
                {link.voteCount > 0 ? link.voteCount : null}
              </span>
              {link.comments.length > 0 && (
                <span
                  className="link-card__stat"
                  aria-label={`${link.comments.length} comments`}
                >
                  <IonIcon icon={chatbubbleEllipsesOutline} aria-hidden="true" />
                  {link.comments.length}
                </span>
              )}
            </span>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default LinkItem;
