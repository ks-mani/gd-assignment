import { Link, useParams } from "react-router";
import WidgetContainer from "../WidgetContainer";
import { useFullRepoDataStore } from "../store/repoData";
import useFetchRepoData from "../hooks/useFetchRepoData";
import { useEffect, useState } from "react";
import { checkIfObjectIsEmpty, convertToLocaleDate } from "../utils";
import Layer from "../Layer";

import styles from "./index.module.scss";

const RepoDetail = () => {
  const { repoId } = useParams();

  const isLoading = useFetchRepoData();
  const { fullRepoData } = useFullRepoDataStore();

  const [detailsData, setDetailsData] = useState(null);

  useEffect(() => {
    const detailsData =
      fullRepoData?.find((item) => item.id.toString() === repoId) || {};
    console.log(detailsData);

    setDetailsData(detailsData);
  }, [repoId, fullRepoData]);

  if (isLoading || detailsData === null) {
    return (
      <WidgetContainer>
        <p>Loading ...</p>
      </WidgetContainer>
    );
  } else {
    return (
      <WidgetContainer customWrapperClass={styles.detailViewWrapper}>
        <Link to="/" className={styles.goBackLink}>
          Go to Main Page
        </Link>
        {checkIfObjectIsEmpty(detailsData) ? (
          <Layer>
            <p>Data pertaining to {repoId} does not exist</p>
          </Layer>
        ) : (
          <Layer>
            <div className={styles.detailsViewContent}>
              <div className={styles.repoMeta}>
                <div>
                  <h1>{detailsData.full_name}</h1>
                  <span className="tag">public</span>
                </div>
                <div className={styles.dates}>
                  <span>
                    Created at {convertToLocaleDate(detailsData.created_at)}
                  </span>
                  <span>
                    Updated at {convertToLocaleDate(detailsData.updated_at)}{" "}
                  </span>
                </div>
              </div>

              <hr />
              <p>{detailsData.description}</p>
            </div>
          </Layer>
        )}
      </WidgetContainer>
    );
  }
};

export default RepoDetail;
