import React from "react";
import { useHistory } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  globeOutline,
  ribbonOutline,
  heartOutline,
  chatbubbleEllipsesOutline,
  openOutline,
} from "ionicons/icons";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";

const DEMO_URL = "http://pandoconnect-c9991.web.app/";
const DEVPOST_URL = "https://devpost.com/software/pandoconnect";
const TOPICS = ["#recovery", "#hope", "#covid19", "#support", "#awareness"];

function handleFromUser(user) {
  if (user.email) return "@" + user.email.split("@")[0];
  return "@" + (user.displayName || "member").toLowerCase().replace(/\s+/g, "");
}

const ProfilePanel = () => {
  const { user } = React.useContext(UserContext);
  const history = useHistory();
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    if (!user) {
      setStats(null);
      return;
    }
    firebase.db
      .collection("blogs")
      .where("postedBy.id", "==", user.uid)
      .get()
      .then((snap) => {
        if (!active) return;
        let posts = snap.size;
        let likes = 0;
        let comments = 0;
        snap.forEach((doc) => {
          const b = doc.data();
          likes += b.voteCount || 0;
          comments += (b.comments || []).length;
        });
        setStats({ posts, likes, comments });
      })
      .catch(() => active && setStats({ posts: 0, likes: 0, comments: 0 }));
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <aside className="profile-panel">
      {user ? (
        <div className="pp-card">
          <div className="pp-avatar-wrap">
            <img className="pp-avatar" src={user.photoURL} alt="" />
            <span className="pp-online" aria-hidden="true" />
          </div>
          <h2 className="pp-name">{user.displayName}</h2>
          <p className="pp-handle">{handleFromUser(user)}</p>
          <p className="pp-sub">PandoConnect member</p>

          <div className="pp-stats">
            <div>
              <strong>{stats ? stats.posts : "—"}</strong>
              <span>Posts</span>
            </div>
            <div>
              <strong>{stats ? stats.likes : "—"}</strong>
              <span>Likes</span>
            </div>
            <div>
              <strong>{stats ? stats.comments : "—"}</strong>
              <span>Comments</span>
            </div>
          </div>

          <button
            type="button"
            className="pp-primary"
            onClick={() => history.push("/submit")}
          >
            Share a story
          </button>
        </div>
      ) : (
        <div className="pp-card">
          <img
            className="pp-logo"
            src="/assets/icon/PandoConnectLogo.png"
            alt="PandoConnect"
          />
          <h2 className="pp-name">Welcome to PandoConnect</h2>
          <p className="pp-sub">Stories of recovery, hope &amp; support</p>
          <button
            type="button"
            className="pp-primary"
            onClick={() => history.push("/login")}
          >
            Sign in
          </button>
        </div>
      )}

      <section className="pp-section">
        <h3 className="pp-section__title">About</h3>
        <p className="pp-about">
          A community platform where COVID-19 patients and survivors share
          recovery stories and positive experiences to support people around the
          world. Hackathon winner on DEVPOST.
        </p>
      </section>

      <section className="pp-section">
        <h3 className="pp-section__title">Popular topics</h3>
        <div className="pp-topics">
          {TOPICS.map((t) => (
            <span className="pp-chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="pp-section">
        <h3 className="pp-section__title">Links</h3>
        <a className="pp-link" href={DEMO_URL} target="_blank" rel="noopener noreferrer">
          <span className="pp-link__icon">
            <IonIcon icon={globeOutline} />
          </span>
          <span className="pp-link__body">
            <strong>Live app</strong>
            <span>pandoconnect-c9991.web.app</span>
          </span>
          <IonIcon icon={openOutline} className="pp-link__ext" />
        </a>
        <a
          className="pp-link"
          href={DEVPOST_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="pp-link__icon">
            <IonIcon icon={ribbonOutline} />
          </span>
          <span className="pp-link__body">
            <strong>DEVPOST</strong>
            <span>Award-winning project</span>
          </span>
          <IonIcon icon={openOutline} className="pp-link__ext" />
        </a>
      </section>

      <p className="pp-foot">
        <IonIcon icon={heartOutline} aria-hidden="true" /> Made with care ·{" "}
        <IonIcon icon={chatbubbleEllipsesOutline} aria-hidden="true" /> Be kind
      </p>
    </aside>
  );
};

export default ProfilePanel;
