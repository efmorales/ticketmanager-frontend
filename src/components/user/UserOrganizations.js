import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./UserOrganizations.css";

import axios from "axios";

const UserOrganizations = () => {
  const userOrgsData = useLoaderData();

  const [userOrgs, setUserOrgs] = useState([]);

  useEffect(() => {
    setUserOrgs(userOrgsData);
  }, []);

  return (
    <div className="user-organizations-page">
      <div className="page-controls">
        Orgs Listing Page controls will go here
      </div>
      <div className="orgs-list">
        {userOrgs.map((org) => {
          const { _id, name, description } = org.parentOrg;
          return (
            <Link className="organization-link" to={`/organization/${_id}`}>
              <div className="organization-card" key={org._id}>
                <h2>{name}</h2>
                <p className="organization-description">{description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserOrganizations;

export const loader = async () => {
  const localToken = localStorage.getItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY
  );

  if (localToken) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/users/verify-user",
        {
          headers: { token: localToken },
        }
      );

      if (data) {
        const userOrgsData = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/user/organizations/${data.user._id}`
        );
        return userOrgsData.data.userOrganizations;
      }
    } catch (error) {
      return console.log(error);
    }
  }
};
