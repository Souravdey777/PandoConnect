import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  trendingUpOutline,
  createOutline,
  personCircleOutline,
  informationCircleOutline,
  searchOutline,
  logOutOutline,
  closeOutline,
  heartOutline,
} from "ionicons/icons";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import { toast } from "../../helpers/toast";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { label: "Home", path: "/pandofeeds", icon: homeOutline },
  { label: "Trending", path: "/trending", icon: trendingUpOutline },
  { label: "Share", path: "/submit", icon: createOutline },
  { label: "Profile", path: "/profile", icon: personCircleOutline },
  { label: "How it works", path: "/tips", icon: informationCircleOutline },
];

const Sidebar = () => {
  const { user } = React.useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const [term, setTerm] = React.useState("");
  const [showPromo, setShowPromo] = React.useState(true);

  function isActive(path) {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  }

  function onSearchKey(e) {
    if (e.key === "Enter") history.push("/pandofeeds");
  }

  async function logoutUser() {
    try {
      await firebase.logout();
      history.push("/pandofeeds");
      toast("You have logged out successfully.");
    } catch (err) {
      toast(err.message);
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src="/assets/icon/PandoConnectLogo.png" alt="" />
        <span>PandoConnect</span>
      </div>

      <div className="sidebar__search">
        <IonIcon icon={searchOutline} aria-hidden="true" />
        <input
          type="text"
          placeholder="Search…"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyPress={onSearchKey}
          aria-label="Search stories"
        />
      </div>

      <nav className="sidebar__nav">
        {NAV.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`sidebar__link ${isActive(item.path) ? "is-active" : ""}`}
            onClick={() => history.push(item.path)}
            aria-current={isActive(item.path) ? "page" : undefined}
          >
            <IonIcon icon={item.icon} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        {showPromo && (
          <div className="promo-card">
            <button
              type="button"
              className="promo-card__close"
              onClick={() => setShowPromo(false)}
              aria-label="Dismiss"
            >
              <IonIcon icon={closeOutline} />
            </button>
            <span className="promo-card__icon">
              <IonIcon icon={heartOutline} />
            </span>
            <p className="promo-card__text">
              {user
                ? "Share a story of recovery and lift someone's day."
                : "Join the community and share your story of hope."}
            </p>
            <button
              type="button"
              className="promo-card__cta"
              onClick={() => history.push(user ? "/submit" : "/login")}
            >
              {user ? "Share a story" : "Get started"}
            </button>
          </div>
        )}

        <ThemeToggle />

        <div className="sidebar__user">
          {user ? (
            <>
              <img
                className="sidebar__avatar"
                src={user.photoURL}
                alt=""
                referrerPolicy="no-referrer"
              />
              <div className="sidebar__user-meta">
                <strong>{user.displayName}</strong>
                <span>Member</span>
              </div>
              <button
                type="button"
                className="sidebar__logout"
                onClick={logoutUser}
                aria-label="Log out"
                title="Log out"
              >
                <IonIcon icon={logOutOutline} />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="sidebar__signin"
              onClick={() => history.push("/login")}
            >
              <IonIcon icon={personCircleOutline} />
              Sign in
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
