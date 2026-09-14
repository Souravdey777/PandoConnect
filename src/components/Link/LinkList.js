import React from "react";
import { IonIcon, IonSkeletonText } from "@ionic/react";
import { sunnyOutline } from "ionicons/icons";
import firebase from "../../firebase";
import LinkItem from "./LinkItem";

const SkeletonFeed = () => (
  <div className="feed">
    <div className="feed-grid">
      {[0, 1, 2, 3].map((i) => (
        <div className="skeleton-card" key={i}>
          <IonSkeletonText animated className="sk-media" />
          <div className="sk-body">
            <IonSkeletonText animated style={{ width: "80%", height: "18px" }} />
            <IonSkeletonText animated style={{ width: "45%", height: "14px" }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LinkList = (props) => {
  const [blogs, setBlogs] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const isTrending = props.location.pathname.includes("trending");

  React.useEffect(() => {
    const unsubscribe = getBlogs();
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [isTrending]);

  function getBlogs() {
    const query = isTrending
      ? firebase.db.collection("blogs").orderBy("voteCount", "desc")
      : firebase.db.collection("blogs").orderBy("created", "desc");
    return query.onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBlogs(blogs);
    setLoaded(true);
  }

  if (!loaded) return <SkeletonFeed />;

  if (blogs.length === 0) {
    return (
      <div className="empty-state">
        <IonIcon icon={sunnyOutline} />
        <h3>No stories yet</h3>
        <p>Be the first to share a story of recovery and hope.</p>
      </div>
    );
  }

  return (
    <div className="feed">
      <div className="feed-grid">
        {blogs.map((link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            url={`/link/${link.id}`}
            link={link}
            index={index + 1}
            fullblog={false}
          />
        ))}
      </div>
    </div>
  );
};

export default LinkList;
