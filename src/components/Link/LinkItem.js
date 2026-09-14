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
import { coverImageFor, picsumFor, pinnedCoverFor } from "../../helpers/coverImage";

const LinkItem = ({ link, index, showCount, url, browser, fullblog }) => {
  const sentiment = resolveSentiment(link);
  const cover = pinnedCoverFor(link) || link?.pictureURL || coverImageFor(link);

  // If a post's own image is broken/missing, fall back to a decorative cover
  // once; only hide the media if that fallback also fails.
  function handleMediaError(e) {
    const img = e.currentTarget;
    const fallback = picsumFor(link);
    if (!img.dataset.fellBack && img.src !== fallback) {
      img.dataset.fellBack = "1";
      img.src = fallback;
      return;
    }
    const wrap = img.closest(".card-media");
    if (wrap) wrap.style.display = "none";
  }

  return (
    <IonCard routerLink={url} className="link-card">
      <IonCardContent className="ion-no-padding">
        {cover ? (
          <div className="card-media">
            <img src={cover} alt="" loading="lazy" onError={handleMediaError} />
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

          {!cover && sentiment && (
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
              <img
                src={link.postedBy.photoURL}
                alt=""
                referrerPolicy="no-referrer"
              />
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
