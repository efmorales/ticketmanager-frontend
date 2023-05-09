import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaPlusCircle, FaArrowCircleLeft } from "react-icons/fa";
import UserOrganizationsList from "./UserOrganizationsList";
import NewOrganization from "./NewOrganization";

import "./UserOrganizations.css";

import axios from "axios";

const UserOrganizations = () => {
  const userOrgsData = useLoaderData();

  const [userOrgs] = useState(userOrgsData);
  const [isListSelected, setIsListSelected] = useState(true);

  const handleToggle = () => {
    setIsListSelected(!isListSelected);
  };

  return (
    <div className="user-organizations-page">
      <div className="page-controls">
        <div onClick={handleToggle}>
          {isListSelected ? (
            <div className="member-control">
              <FaPlusCircle size={20} /> <span>Create New</span>
            </div>
          ) : (
            <div className="member-control">
              <FaArrowCircleLeft size={20} /> <span>Back to Organizations</span>
            </div>
          )}
        </div>
      </div>
      <div className="user-orgs-container">
        {isListSelected ? (
          <UserOrganizationsList userOrgs={userOrgs} />
        ) : (
          <NewOrganization />
        )}
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
