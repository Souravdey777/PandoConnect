import React from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import CommentModal from "./CommentModal";
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import { getTimeAgoString } from "../../dayFormat/dateFormat";
import { createOutline, trashOutline } from "ionicons/icons";

const LinkComment = ({ comment, link, setLink }) => {
  const { user } = React.useContext(UserContext);
  const [showModal, setShowModal] = React.useState(false);

  const postedByAuthUser = user && user.uid === comment.postedBy.id;

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleEditComment(commentText) {
    const linkRef = firebase.db.collection("blogs").doc(link.id);
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
        const updatedComments = previousComments.map((item) =>
          item.created === comment.created ? newComment : item
        );
        linkRef.update({ comments: updatedComments });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
      }
    });
    setShowModal(false);
  }

  function handleDeleteComment() {
    const linkRef = firebase.db.collection("blogs").doc(link.id);
    linkRef.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data().comments;
        const updatedComments = previousComments.filter(
          (item) => item.created !== comment.created
        );
        linkRef.update({ comments: updatedComments });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
      }
    });
  }

  return (
    <>
      <CommentModal
        isOpen={showModal}
        title="Edit Comment"
        sendAction={handleEditComment}
        closeAction={handleCloseModal}
        comment={comment}
      />
      <IonList>
        <IonItem>
          <IonAvatar slot="start">
            <img
              src={comment.postedBy.photoURL}
              style={{
                verticalAlign: "middle",
              }}
              alt="profile"
              referrerPolicy="no-referrer"
            />
          </IonAvatar>
          <IonLabel className="ion-text-wrap">
            <h3 style={{ fontWeight: 700 }}>{comment.postedBy.name}</h3>
            <p className="app-body" style={{ whiteSpace: "normal" }}>
              {comment.text}
            </p>
            <p className="app-caption app-muted">
              {getTimeAgoString(comment.created)}
            </p>
            {postedByAuthUser && (
              <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                <IonButton
                  size="small"
                  fill="clear"
                  onClick={() => setShowModal(true)}
                  aria-label="Edit comment"
                >
                  <IonIcon slot="start" icon={createOutline} />
                  Edit
                </IonButton>
                <IonButton
                  size="small"
                  fill="clear"
                  color="danger"
                  onClick={() => handleDeleteComment(comment)}
                  aria-label="Delete comment"
                >
                  <IonIcon slot="start" icon={trashOutline} />
                  Delete
                </IonButton>
              </div>
            )}
          </IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default LinkComment;
