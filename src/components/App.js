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

import UserSignup from "./user/UserSignup";
import UserLogin from "./user/UserLogin";
import UserDashboard from "./user/UserDashboard";
import UserProfile, { loader as userProfileLoader } from "./user/UserProfile";
import UserOrganizations, {
  loader as userOrgsLoader,
} from "./user/UserOrganizations";

import OrganizationProfile from "./organization/OrganizationProfile";
import OrgMemberProfile, { loader as orgMemberProfileLoader} from "./organization/OrgMemberProfile";
import OrganizationMembers from "./organization/OrganizationMembers";
import OrganizationProjects from "./organization/OrganizationProjects";

import Error from "./Error";
import Projects from "./Projects";
import CreateProject from "./CreateProject";
import ProjectDetails from "./ProjectDetails";
import TicketDetails from "./TicketDetails";
import CreateTicket from "./CreateTicket";

import UserLayout from "../layouts/UserLayout";
import OrganizationLayout, { loader as orgLoader} from "../layouts/OrganizationLayout";

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
          <Route index element={<UserDashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<CreateProject />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="tickets/:ticketId" element={<TicketDetails />} />
          <Route
            path="projects/:projectId/create-ticket"
            element={<CreateTicket />}
          />
          <Route
            path="profile"
            element={<UserProfile />}
            loader={userProfileLoader}
          />
          <Route
            path="organizations"
            element={<UserOrganizations />}
            loader={userOrgsLoader}
          />
        </Route>

        <Route
          path="organization/:orgId"
          element={<OrganizationLayout />}
          loader={(params) => orgLoader(params)}
        >
          <Route index element={<OrganizationProfile />} />
          <Route path="members" element={<OrganizationMembers />} />
          <Route
            exact
            path="members/:memberId"
            element={<OrgMemberProfile />}
            loader={(params) => orgMemberProfileLoader(params)}
          />
          <Route path="projects" element={<OrganizationProjects />} />
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
