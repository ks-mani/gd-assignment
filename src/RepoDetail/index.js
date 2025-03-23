import { useParams } from "react-router";
import WidgetContainer from "../WidgetContainer";
import { useFullRepoDataStore } from "../store/repoData";

const RepoDetail = () => {
  const { repoId } = useParams();
  const { fullRepoData } = useFullRepoDataStore();

  return (
    <WidgetContainer>
      <h1>Hello there.. This is the detail view of {repoId}</h1>

      {JSON.stringify(
        fullRepoData.filter((item) => item.id.toString() === repoId)
      )}
    </WidgetContainer>
  );
};

export default RepoDetail;
