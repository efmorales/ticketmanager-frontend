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
          <NavLink to="/organization/profile">
            <FaRegUserCircle size={40} />
            <div>
              Organization Name
              <br />
              <span className="display-type">Organization</span>
            </div>
          </NavLink>
        </div>
        <ul>
          <li onClick={handleClick}>Projects</li>
          <li onClick={handleClick}>Members</li>
          <li onClick={handleClick}>Link 3</li>
          <li onClick={handleClick}>Link 4</li>
          <li onClick={handleClick}>Link 5</li>
        </ul>
      </nav>
      <section className="organization-content">
        <Outlet />
      </section>
    </div>
  );
};

export default OrganizationLayout;
