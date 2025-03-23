import { BrowserRouter, Route, Routes } from "react-router";
import RepoList from "./RepoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RepoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
