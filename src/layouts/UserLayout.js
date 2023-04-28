import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";

import "./OrganizationLayout.css";

const UserLayout = () => {
  const { loggedInUser } = useAuth();

  const handleClick = (e) => {
    console.log(`${e.target.innerText} clicked!`);
  };

  return (
    <div className="organization-page">
      <nav className="organization-nav">
        <div className="profile-link" onClick={handleClick}>
          <NavLink to=".">
            <FaRegUserCircle size={40} />
            <div>
              {loggedInUser?.name}
              <br />
              <span className="display-type">Personal Projects</span>
            </div>
          </NavLink>
        </div>
        <ul>
          <li><NavLink to="organizations">Organizations</NavLink></li>
          <li>
            <NavLink to="projects">Projects</NavLink>
          </li>
          <li><NavLink to="#">Link 3</NavLink></li>
          <li><NavLink to="#">Link 4</NavLink></li>
          <li><NavLink to="#">Link 5</NavLink></li>
        </ul>
      </nav>
      <section className="organization-content">
        <Outlet />
      </section>
    </div>
  );
};

export default UserLayout;
