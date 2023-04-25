import { useEffect } from "react";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

import "./App.css";

import AppLayout from "../layouts/AppLayout";
import Home from "./Home";
import UserSignup from "./UserSignup";
import UserLogin from "./UserLogin";
import UserProfile from "./UserProfile";
import Projects from "./Projects";
import Error from "./Error";
import CreateProject from "./CreateProject";
import ProjectDetails from "./ProjectDetails";
import TicketDetails from "./TicketDetails";


function App() {
  const { verifyToken } = useAuth();

  useEffect(() => {
    verifyToken();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<CreateProject />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
        <Route path="tickets/:ticketId" element={<TicketDetails />} />

        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
