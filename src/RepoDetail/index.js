import { useParams } from "react-router";
import WidgetContainer from "../WidgetContainer";
import { useFullRepoDataStore } from "../store/repoData";
import useFetchRepoData from "../hooks/useFetchRepoData";

const RepoDetail = () => {
  const { repoId } = useParams();
  const { fullRepoData } = useFullRepoDataStore();

  const isLoading = useFetchRepoData();

  return (
    <WidgetContainer>
      <h1>Hello there.. This is the detail view of {repoId}</h1>

      <p>{isLoading ? "Yes.. Loading" : "Completed"}</p>

      {fullRepoData &&
        JSON.stringify(
          fullRepoData.filter((item) => item.id.toString() === repoId)
        )}
    </WidgetContainer>
  );
};

export default RepoDetail;
