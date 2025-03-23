import { useParams } from "react-router";
import WidgetContainer from "../WidgetContainer";

const RepoDetail = () => {
  let { repoId } = useParams();

  return (
    <WidgetContainer>
      <h1>Hello there.. This is the detail view of {repoId}</h1>
    </WidgetContainer>
  );
};

export default RepoDetail;
