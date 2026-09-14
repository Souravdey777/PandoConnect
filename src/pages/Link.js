import React from "react";
import firebase from "../firebase";
import { Plugins } from "@capacitor/core";
import UserContext from "../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonButton,
  IonAvatar,
  IonIcon,
  IonInput,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import {
  closeCircleOutline,
  send,
  heart,
  heartOutline,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import LinkItem from "../components/Link/LinkItem";
import CommentModal from "../components/Link/CommentModal";
import LinkComment from "../components/Link/LinkComment";

const { Browser } = Plugins;

const Link = (props) => {
  const { user } = React.useContext(UserContext);
  const [link, setLink] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection("blogs").doc(linkId);
  const [commentText, setCommentText] = React.useState();

  function handleSendAction(item) {
    handleAddComment(item);
    setCommentText("");
  }

  React.useEffect(() => {
    getLink();
    // eslint-disable-next-line
  }, [linkId]);

  function getLink() {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  // function handleOpenModal() {
  //   if (!user) {
  //     props.history.push("/login");
  //   } else {
  //     setShowModal(true);
  //   }
  // }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleAddComment(commentText) {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const newComment = {
            postedBy: {
              id: user.uid,
              name: user.displayName,
              photoURL: user.photoURL
            },
            created: Date.now(),
            text: commentText,
          };
          const updatedComments = [...previousComments, newComment];
          linkRef.update({ comments: updatedComments });
          setLink((prevState) => ({
            ...prevState,
            comments: updatedComments,
          }));
        }
      });
      setShowModal(false);
    }
  }

  function handleAddVote() {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          const voteCount = updatedVotes.length;
          linkRef.update({ votes: updatedVotes, voteCount });
          setLink((prevState) => ({
            ...prevState,
            votes: updatedVotes,
            voteCount: voteCount,
          }));
        }
      });
    }
  }

  function handleDeleteLink() {
    linkRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${link.id} deleted`);
      })
      .catch((err) => {
        console.error("Error deleting document", err);
      });
    props.history.push("/");
  }

  function postedByAuthUser(link) {
    return user && user.uid === link.postedBy.id;
  }

  async function openBrowser() {
    await Browser.open({
      url: link.url,
    });
  }

  const hasVoted =
    link &&
    user &&
    Array.isArray(link.votes) &&
    link.votes.some((v) => v.votedBy && v.votedBy.id === user.uid);

  return (
    <IonPage>
      <NavHeader
        title={link && link.url}
        option={link && postedByAuthUser(link)}
        icon={closeCircleOutline}
        action={handleDeleteLink}
      />
      <IonContent>
        <CommentModal
          isOpen={showModal}
          title="New Comment"
          sendAction={handleAddComment}
          closeAction={handleCloseModal}
        />
        {link && (
          <div className="story-detail">
            <LinkItem link={link} fullblog={true} browser={openBrowser} />

            <div className="story-detail__actions">
              <IonButton
                className="upvote-pill"
                fill={hasVoted ? "solid" : "outline"}
                color="secondary"
                onClick={() => handleAddVote()}
                aria-label={`Upvote this story. ${link.voteCount || 0} upvotes`}
              >
                <IonIcon
                  slot="start"
                  icon={hasVoted ? heart : heartOutline}
                  aria-hidden="true"
                />
                {link.voteCount > 0 ? `${link.voteCount} upvotes` : "Upvote"}
              </IonButton>
            </div>

            <h3 className="app-h2 story-detail__section">
              {link.comments.length > 0
                ? `Comments (${link.comments.length})`
                : "Comments"}
            </h3>

            {user && (
              <div className="comment-box">
                <IonAvatar className="comment-box__avatar">
                  <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                </IonAvatar>
                <IonInput
                  className="comment-box__input"
                  placeholder="Add a comment…"
                  value={commentText}
                  onIonChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="button"
                  className="comment-box__send"
                  onClick={() => handleSendAction(commentText)}
                  aria-label="Send comment"
                >
                  <IonIcon icon={send} aria-hidden="true" />
                </button>
              </div>
            )}

            {link.comments.length > 0 ? (
              link.comments.map((comment, index) => (
                <LinkComment
                  key={index}
                  comment={comment}
                  link={link}
                  setLink={setLink}
                />
              ))
            ) : (
              <div className="empty-state">
                <IonIcon icon={chatbubbleEllipsesOutline} />
                <h3>No comments yet</h3>
                <p>Share a kind word or your own experience.</p>
              </div>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Link;
