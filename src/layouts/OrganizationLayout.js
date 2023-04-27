import { Outlet, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import "./OrganizationLayout.css";

const OrganizationLayout = () => {

  const handleClick = (e) => {
    console.log(`${e.target.innerText} clicked!`);
  };

  return (
    <div className="organization-page">
      <nav className="organization-nav">
        <div className="profile-link" onClick={handleClick}>
          <NavLink to="/organization">
            <FaRegUserCircle size={40} />
            <div>
              Organization Name
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
          <li>
            <NavLink to="#">Link 3</NavLink>
          </li>
          <li>
            <NavLink to="#">Link 4</NavLink>
          </li>
          <li>
            <NavLink to="#">Link 5</NavLink>
          </li>
        </ul>
      </nav>
      <section className="organization-content">
        <Outlet />
      </section>
    </div>
  );
};

export default OrganizationLayout;
