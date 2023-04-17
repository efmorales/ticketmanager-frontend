import { Outlet, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import "./AppLayout.css";

const AppLayout = () => {
  return (
    <>
      <header className="app-header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <FaRegUserCircle />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
