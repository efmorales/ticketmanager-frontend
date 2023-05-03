import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

import "./UserAndOrganizationLayout.css";

const OrganizationLayout = () => {
  const orgData = useLoaderData();
  const { organization, members } = orgData;

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
          <NavLink to={`/organization/${organization._id}`}>
            <FaRegUserCircle size={40} />
            <div>
              <span className="entity-name">{organization.name}</span>
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
        <Outlet context={orgData} />
      </section>
    </div>
  );
};

export default OrganizationLayout;

export const loader = async ({ params }) => {
  try {
    const orgData = await axios.get(
      `${process.env.REACT_APP_API_URL}/organizations/${params.orgId}`
    );

    const memberData = await axios.get(
      `${process.env.REACT_APP_API_URL}/organizations/${params.orgId}/members`
    );
    return {
      organization: orgData.data.organization,
      members: memberData.data.members,
    };
  } catch (error) {
    return console.log(error);
  }
};
