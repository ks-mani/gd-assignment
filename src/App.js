import { BrowserRouter, Route, Routes } from "react-router";
import RepoList from "./RepoList";
import RepoDetail from "./RepoDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/repo-detail/:repoId" element={<RepoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
