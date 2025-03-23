import { Link, useParams } from "react-router";
import WidgetContainer from "../WidgetContainer";
import { useFullRepoDataStore } from "../store/repoData";
import useFetchRepoData from "../hooks/useFetchRepoData";
import { useEffect, useState } from "react";
import { checkIfObjectIsEmpty } from "../utils";
import Layer from "../Layer";

const RepoDetail = () => {
  const { repoId } = useParams();

  const isLoading = useFetchRepoData();
  const { fullRepoData } = useFullRepoDataStore();

  const [detailsData, setDetailsData] = useState(null);

  useEffect(() => {
    const detailsData =
      fullRepoData?.find((item) => item.id.toString() === repoId) || {};

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
      <WidgetContainer>
        <Link to="/">Go to Main Page</Link>
        {checkIfObjectIsEmpty(detailsData) ? (
          <Layer>
            <p>Data pertaining to {repoId} does not exist</p>
          </Layer>
        ) : (
          <Layer>
            <h1>Hello there.. This is the detail view of {repoId}</h1>
          </Layer>
        )}
      </WidgetContainer>
    );
  }
};

export default RepoDetail;
