import React from "react";
import { IonSearchbar, IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import firebase from "../../firebase";
import LinkItem from "../../components/Link/LinkItem";

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
        className="app-searchbar"
        placeholder="Search stories, people…"
        spellcheck="false"
        type="text"
        inputmode="search"
        value={filter}
        onKeyPress={handleChange}
        onIonClear={() => setFilter("")}
        animated
      />
      {filter.length > 0 &&
        (filteredBlogs.length > 0 ? (
          <div className="feed">
            <div className="feed-grid">
              {filteredBlogs.map((filteredLink, index) => (
                <LinkItem
                  key={filteredLink.id}
                  showCount={false}
                  link={filteredLink}
                  fullblog={false}
                  index={index}
                  url={`/link/${filteredLink.id}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <IonIcon icon={searchOutline} />
            <h3>No matches</h3>
            <p>Try a different word, name, or phrase.</p>
          </div>
        ))}
    </>
  );
};

export default Search;
