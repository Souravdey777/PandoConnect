import React from "react";
import firebase from "../firebase";
import { Plugins } from "@capacitor/core";
import UserContext from "../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  // IonButton,
  IonListHeader,
  IonLabel,
  IonAvatar,
  IonList,
  IonItem,
  // IonTextarea,
  IonIcon,
  IonInput,
  IonText,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import { closeCircleOutline, send, heart } from "ionicons/icons";
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
          <>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                  <LinkItem link={link} browser={openBrowser} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel style={{ margin: "10px" }} onClick={() => handleAddVote()} size="small">
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
                      upvote
                    </IonText>
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonListHeader>
                    <h3>{link.comments.length>0?"Comments":"No Comments"}</h3>
            </IonListHeader>
            {user && <IonList>
              <IonItem>
                <IonAvatar slot="start">
                  <img
                    src={user.photoURL}
                    style={{
                      verticalAlign: "middle",
                    }}
                    alt="profile"
                  />
                </IonAvatar>
                <IonInput
                  placeholder="Your comment"
                  value={commentText}
                  onIonChange={(e) => setCommentText(e.target.value)}
                />
                <IonIcon icon={send} color="primary" size="small" onClick={() => handleSendAction(commentText)}></IonIcon>
              </IonItem>
            </IonList>}
            <IonContent>
              {link.comments.map((comment, index) => (
                <LinkComment
                  key={index}
                  comment={comment}
                  link={link}
                  setLink={setLink}
                />
              ))}
            </IonContent>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Link;
