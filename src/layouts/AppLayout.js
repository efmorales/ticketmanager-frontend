import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";

import "./AppLayout.css";

const AppLayout = () => {
  const { loggedInUser, logout } = useAuth();

  return (
    <>
      <header className="app-header">
        {loggedInUser ? (
          <>
        <NavLink to="/" className="home-link">TICKET MANAGER</NavLink>
            <NavLink to="/user/organizations">Organizations</NavLink>
            <NavLink to="/user">Personal</NavLink>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
            <NavLink to="user/profile">
              <FaRegUserCircle size={30} />
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
