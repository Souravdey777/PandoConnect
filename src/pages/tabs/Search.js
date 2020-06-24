import React from "react";
import { IonSearchbar } from "@ionic/react";
import firebase from "../../firebase";
import LinkItem from "../../components/Link/LinkItem";
import StackGrid from "react-stack-grid";

const Search = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [filteredBlogs, setFilteredBlogs] = React.useState([]);

  React.useEffect(() => {
    getInitialBlogs();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [filter]);

  function getInitialBlogs() {
    firebase.db
      .collection("blogs")
      .get()
      .then((snapshot) => {
        const blogs = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setBlogs(blogs);
      });
  }

  function handleChange(evt) {
    if (evt.key === "Enter") {
      setFilter(evt.target.value);
    }
  }

  function handleSearch() {
    const query = filter.toLowerCase();
    const matchedBlogs = blogs.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredBlogs(matchedBlogs);
  }

  return (
    <>
      <IonSearchbar
        placeholder="Search"
        spellcheck="false"
        type="url"
        value={filter}
        onKeyPress={handleChange}
        animated
        style={{
          maxWidth: "425px",
          margin: "auto"
        }}
      />
      {filter.length > 0 ? (
        <StackGrid
          columnWidth={(window.innerWidth > 768 ? (window.innerWidth - 60) / 4 : (window.innerWidth - 20) / 2)}
          duration={500}
          monitorImagesLoaded={true}
          appearDelay={1000}
        >
          {filteredBlogs.map((filteredLink, index) => (
            <LinkItem
              key={filteredLink.id}
              showCount={false}
              link={filteredLink}
              index={index}
              url={`/link/${filteredLink.id}`}
            />
          ))}
        </StackGrid>)
        : null}
    </>
  );
};

export default Search;
