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
import Projects from "./Projects";
import UserProfile, { loader as userProfileLoader } from "./UserProfile";
import Error from "./Error";
import CreateProject from "./CreateProject";
import ProjectDetails from "./ProjectDetails";
import TicketDetails from "./TicketDetails";
import CreateTicket from "./CreateTicket";
import UserLayout from "../layouts/UserLayout";
import OrganizationLayout from "../layouts/OrganizationLayout";
import Organization from "./organization/Organization";

function App() {
  const { verifyToken } = useAuth();

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
        <Route path="user" element={<UserLayout />}>
          <Route index path="projects" element={<Projects />} />
          <Route path="projects/new" element={<CreateProject />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="tickets/:ticketId" element={<TicketDetails />} />
          <Route
            path="projects/:projectId/create-ticket"
            element={<CreateTicket />}
            />
          <Route />
          <Route
            path="profile"
            element={<UserProfile />}
            loader={userProfileLoader}
          />
        </Route>

        <Route path="organization" element={<OrganizationLayout />}>
          <Route index element={<Organization />} />
        </Route>

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
