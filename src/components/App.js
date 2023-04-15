import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./App.css";

import AppLayout from "../layouts/AppLayout";
import Home from "./Home";
import UserSignup from "./UserSignup";
import UserLogin from "./UserLogin";
import Error from "./Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
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
