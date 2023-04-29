import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";

import "./UserAndOrganizationLayout.css";

const OrganizationLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (e) => {
    setOpenMenu(false);
  };

  return (
    <div className="organization-page">
      <div className="side-nav-toggle" onClick={() => setOpenMenu(true)}>
        <FaBars size={20} />
      </div>
      <nav className={`side-nav ${openMenu ? "open" : "close"}`}>
        <div
          className="side-nav-toggle"
          href="#side-nav"
          onClick={() => setOpenMenu(false)}
        >
          <FaTimes size={20} />
        </div>
        <div className="profile-link" onClick={handleClick}>
          <NavLink to="/organization">
            <FaRegUserCircle size={40} />
            <div>
              <span className="entity-name">Organization Name</span>
              <br />
              <span className="display-type">Organization</span>
            </div>
          </NavLink>
        </div>
        <ul>
          <li onClick={handleClick}>
            <NavLink to="projects">Projects</NavLink>
          </li>
          <li onClick={handleClick}>
            <NavLink to="members">Members</NavLink>
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

export default OrganizationLayout;
