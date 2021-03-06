import React from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import CommentModal from "./CommentModal";
import {
  // IonCard,
  // IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  // IonListHeader,
  IonAvatar,
  // IonIcon,
} from "@ionic/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { getTimeAgoString } from "../../dayFormat/dateFormat";
// import { personCircleOutline } from "ionicons/icons";

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
            />
          </IonAvatar>
          <IonLabel>
            <h3>{comment.postedBy.name}</h3>
            <p>{comment.text}</p>
            <p style={{
              verticalAlign: "middle",
              fontSize: "0.7rem",
              color: "#999",
              fontWeight: "normal"
            }}
            >
              {getTimeAgoString(comment.created)}</p>
            {postedByAuthUser && (
              <IonButton size="small" onClick={() => setShowModal(true)}>
                Edit
              </IonButton>
            )}
            {postedByAuthUser && (
              <IonButton
                size="small"
                onClick={() => handleDeleteComment(comment)}
              >
                Delete
              </IonButton>
            )}

          </IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default LinkComment;
