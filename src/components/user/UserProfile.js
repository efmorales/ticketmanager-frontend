import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./UserProfile.css";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../auth/AuthContext";

import axios from "axios";

const UserProfile = () => {
  const userData = useLoaderData();

  const userInfoReset = {
    name: userData.name,
    email: userData.email,
    bio: userData.bio,
  };

  const [userInfo, setUserInfo] = useState(userInfoReset);
  const [changesMade, setChangesMade] = useState(false);
  const [editField, setEditField] = useState({
    name: false,
    email: false,
    bio: false,
  });

  const { setLoggedInUser } = useAuth();

  const handleBlur = (e) => {
    const { name } = e.target;

    setEditField((prev) => ({ ...prev, [name]: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    setChangesMade(true);
  };

  const discardChanges = () => {
    setUserInfo(userInfoReset);
    setChangesMade(false);
  };

  const submitChanges = async () => {
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "/users/user",
        {
          id: userData._id,
          updates: userInfo,
        }
      );

      if (data.error) {
        throw Error(JSON.stringify(data.error));
      }

      console.log("updated User: " + JSON.stringify(data.updatedUser));
      setLoggedInUser(data.updatedUser);
      setChangesMade(false);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const editableField = (fieldName) => {
    return (
      <input
        className="field-value-editable"
        type="text"
        name={fieldName}
        id={fieldName}
        value={userInfo[fieldName]}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        onFocus={(e) => e.target.select()}
        placeholder="Your text here..."
        autoComplete="off"
      />
    );
  };

  const profileCard = (
    <>
      <FaRegUserCircle size={50} />
      <p className="field">
        <span className="field-name">Name:</span>
        <span
          className="field-value"
          onClick={() =>
            setEditField((prev) => ({
              ...prev,
              name: true,
            }))
          }
        >
          {editField.name ? (
            editableField("name")
          ) : (
            <span className="field-value-text">
              {userInfo?.name || (
                <span className="field-value-placeholder">Your name here</span>
              )}
            </span>
          )}
        </span>
      </p>
      <p className="field">
        <span className="field-name">Email: </span>
        <span
          className="field-value"
          onClick={() =>
            setEditField((prev) => ({
              ...prev,
              email: true,
            }))
          }
        >
          {editField.email ? (
            editableField("email")
          ) : (
            <span className="field-value-text">{userInfo?.email}</span>
          )}
        </span>
      </p>
      <p className="field">
        <span className="field-name">Bio: </span>
        <span
          className="field-value"
          onClick={() =>
            setEditField((prev) => ({
              ...prev,
              bio: true,
            }))
          }
        >
          {editField.bio ? (
            editableField("bio")
          ) : (
            <span className="field-value-text">
              {userInfo?.bio || (
                <span className="field-value-placeholder">
                  A bit about yourself
                </span>
              )}
            </span>
          )}
        </span>
      </p>
      {changesMade && (
        <div className="btn-container">
          <button className="btn save" onClick={submitChanges}>
            Save
          </button>
          <button className="btn discard" onClick={discardChanges}>
            Discard
          </button>
        </div>
      )}
    </>
  );

  return <section className="profile-card">{profileCard}</section>;
};

export default UserProfile;

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

      return data.user;
    } catch (error) {
      return console.log(error);
    }
  }
};
