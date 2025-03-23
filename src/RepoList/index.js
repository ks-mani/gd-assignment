import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import WidgetContainer from "../WidgetContainer";
import { useNavigate } from "react-router";

const ListCard = ({
  navigateCb = () => {},
  cardData: {
    id = "",
    name = "",
    description = "",
    language = "",
    updatedAt = "",
    url = "",
    visibility = "",
  },
}) => {
  const containerRef = useRef(null);

  const localeDate = new Date(updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={styles.listCardWrapper}
      ref={containerRef}
      onClick={() => {
        navigateCb(`/repo-detail/${id}`);
      }}
    >
      <div className={styles.title}>
        <h2>{name}</h2>
        <span className={styles.tag}>{visibility}</span>
      </div>

      <hr />
      <p>{description}</p>
      <div className={styles.meta}>
        <span className={styles.lang}>{language}</span>
        <span className={styles.dot}></span>
        <span className={styles.updated}>Updated on {localeDate}</span>
      </div>
    </div>
  );
};

function RepoList() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.github.com/orgs/godaddy/repos")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            language: item.language,
            updatedAt: item.updated_at,
            url: item.url,
            visibility: item.visibility,
          };
        });

        setIsLoading(false);
        setData(formattedData);
      });
  }, []);
  return (
    <WidgetContainer>
      <h1>List of GoDaddy's Github Repo</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data &&
        data.map((item) => (
          <ListCard key={item.id} cardData={item} navigateCb={navigate} />
        ))
      )}
    </WidgetContainer>
  );
}

export default RepoList;
