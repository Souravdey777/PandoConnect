import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { sendOutline, imageOutline, happyOutline } from "ionicons/icons";
import UserContext from "../../contexts/UserContext";
import ThemeToggle from "../shell/ThemeToggle";

/**
 * Center-column header: a two-tab segment (For you / Trending) and a composer
 * that opens the Submit page. Mirrors the reference dashboard's feed header.
 */
const FeedTopBar = () => {
  const { user } = React.useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const onTrending = location.pathname.includes("trending");

  function compose() {
    history.push(user ? "/submit" : "/login");
  }

  return (
    <div className="feed-topbar">
      <div className="feed-topbar__row">
        <div className="segment" role="tablist" aria-label="Feed">
          <button
            role="tab"
            aria-selected={!onTrending}
            className={`segment__btn ${!onTrending ? "is-active" : ""}`}
            onClick={() => history.push("/pandofeeds")}
          >
            For you
          </button>
          <button
            role="tab"
            aria-selected={onTrending}
            className={`segment__btn ${onTrending ? "is-active" : ""}`}
            onClick={() => history.push("/trending")}
          >
            Trending
          </button>
        </div>
        <ThemeToggle variant="icon" />
      </div>

      <div className="composer" onClick={compose}>
        {user ? (
          <img
            className="composer__avatar"
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="composer__avatar composer__avatar--empty" aria-hidden="true" />
        )}
        <span className="composer__placeholder">
          Share a story of hope…
        </span>
        <span className="composer__actions" aria-hidden="true">
          <IonIcon icon={happyOutline} />
          <IonIcon icon={imageOutline} />
        </span>
        <button
          type="button"
          className="composer__post"
          onClick={(e) => {
            e.stopPropagation();
            compose();
          }}
        >
          Post <IonIcon icon={sendOutline} />
        </button>
      </div>
    </div>
  );
};

export default FeedTopBar;
