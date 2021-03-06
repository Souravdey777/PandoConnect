import React from "react";
import firebase from "../../firebase";
import LinkItem from "./LinkItem";
import StackGrid from "react-stack-grid";

const LinkList = (props) => {
  const [blogs, setBlogs] = React.useState([]);
  const isTrending = props.location.pathname.includes("trending");

  React.useEffect(() => {
    const unsubscribe = getBlogs();
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [isTrending]);

  function getBlogs() {
    if (isTrending) {
      return firebase.db
        .collection("blogs")
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapshot);
    }
    return firebase.db
      .collection("blogs")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const blogs = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setBlogs(blogs);
  }

  return (
    <>
    <StackGrid
        columnWidth={(window.innerWidth>768?(window.innerWidth-60)/4:(window.innerWidth-20)/2)}
        duration={500}
        monitorImagesLoaded={true}
        appearDelay ={1000}
        >
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
      </StackGrid>
     
    </>
  );
};

export default LinkList;
