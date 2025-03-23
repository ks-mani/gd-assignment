import { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import WidgetContainer from "../WidgetContainer";
import { useNavigate } from "react-router";

import ArrowRight from "../images/arrow-right.png";
import { useMinRepoDataStore } from "../store/repoData";
import useFetchRepoData from "../hooks/useFetchRepoData";

const ListCard = ({
  navigateCb = () => {},
  cardData: {
    id = "",
    name = "",
    description = "",
    language = "",
    updatedAt = "",
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

      <div className={styles.footer}>
        <div className={styles.meta}>
          <span className={styles.lang}>{language}</span>
          <span className={styles.dot}></span>
          <span className={styles.updated}>Updated on {localeDate}</span>
        </div>

        <img className={styles.arrow} src={ArrowRight} alt="Arrow Right" />
      </div>
    </div>
  );
};

function RepoList() {
  const { minRepoData } = useMinRepoDataStore();

  const navigate = useNavigate();

  const isLoading = useFetchRepoData();

  return (
    <WidgetContainer>
      <h1>List of GoDaddy's Github Repo</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        minRepoData &&
        Array.isArray(minRepoData) &&
        minRepoData.map((item) => (
          <ListCard key={item.id} cardData={item} navigateCb={navigate} />
        ))
      )}
    </WidgetContainer>
  );
}

export default RepoList;
