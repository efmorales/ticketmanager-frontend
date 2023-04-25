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
import UserProfile, { loader as userProfileLoader } from "./UserProfile";
import Error from "./Error";

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
        <Route
          path="profile"
          element={<UserProfile />}
          loader={userProfileLoader}
        />
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
