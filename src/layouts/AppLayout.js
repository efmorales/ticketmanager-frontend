import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";

import "./AppLayout.css";

const AppLayout = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();

  const logout = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
    setLoggedInUser(null);
  };

  return (
    <>
      <header className="app-header">
        <NavLink to="/">Home</NavLink>
        {loggedInUser ? (
          <>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
            <NavLink to="/profile">
              <FaRegUserCircle size={50} />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
