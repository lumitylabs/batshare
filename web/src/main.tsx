import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./view/pages/Home.tsx";
import Projects from "./view/pages/Projects.tsx";
import ProjectDetails from "./view/pages/ProjectDetails.tsx";
import { MetaMaskContextProvider } from "./model/useMetaMask.tsx";
import NewProject from "./view/pages/NewProject.tsx";
import Profile from "./view/pages/Profile.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MetaMaskContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/project-details/:project_id"
          element={<ProjectDetails />}
        />
      </Routes>
    </Router>
  </MetaMaskContextProvider>
);
