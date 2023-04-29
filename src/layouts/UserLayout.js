import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";

import "./UserAndOrganizationLayout.css";

const UserLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { loggedInUser } = useAuth();

  const handleClick = (e) => {
    setOpenMenu(false);
  };

  return (
    <div className="organization-page">
      <div className="side-nav-toggle" onClick={() => setOpenMenu(true)}>
        <FaBars size={20} />
      </div>
      <nav className={`side-nav ${openMenu ? "open" : "close"}`}>
        <div className="side-nav-toggle" onClick={() => setOpenMenu(false)}>
          <FaTimes size={20} />
        </div>
        <div className="profile-link" onClick={handleClick}>
          <NavLink to=".">
            <FaRegUserCircle size={40} />
            <div>
              <span className="entity-name">{loggedInUser?.name}</span>
              <br />
              <span className="display-type">Personal</span>
            </div>
          </NavLink>
        </div>
        <ul>
          <li onClick={handleClick}>
            <NavLink to="organizations">Organizations</NavLink>
          </li>
          <li onClick={handleClick}>
            <NavLink to="projects">Projects</NavLink>
          </li>
          <li onClick={handleClick}>
            <NavLink to="#">Link 3</NavLink>
          </li>
          <li onClick={handleClick}>
            <NavLink to="#">Link 4</NavLink>
          </li>
          <li onClick={handleClick}>
            <NavLink to="#">Link 5</NavLink>
          </li>
        </ul>
      </nav>
      <section className="page-content">
        <Outlet />
      </section>
    </div>
  );
};

export default UserLayout;
