import { useState } from "react";
import "./UserProfile.css";
import { useAuth } from "../auth/AuthContext";

const UserProfile = () => {
  const { loggedInUser } = useAuth();

  const userInfoReset = {
    name: loggedInUser.name,
    email: loggedInUser.email,
    bio: loggedInUser.bio,
  };

  const [userInfo, setUserInfo] = useState(userInfoReset);

  const [changesMade, setChangesMade] = useState(false);

  const [editField, setEditField] = useState({
    name: false,
    email: false,
    bio: false,
  });

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
    
    if (userInfo[name] !== loggedInUser[name]) {
      setChangesMade(true);
    }
  };

  const discardChanges = () => {
    setUserInfo(userInfoReset);
    setChangesMade(false);
  }

  const submitChanges = () => {
    console.log("Changes Submitted!");
  }


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
      />
    );
  };

  const profileCard = (
    <>
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
          {editField.name ? editableField("name") : userInfo?.name}
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
          {editField.email ? editableField("email") : userInfo?.email}
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
          {editField.bio ? editableField("bio") : userInfo?.bio}
        </span>
      </p>
      {changesMade && (
        <>
          <button onClick={submitChanges}>Save</button>
          <button onClick={discardChanges}>Discard</button>
        </>
      )}
    </>
  );

  return <section className="profile-card">{profileCard}</section>;
};

export default UserProfile;
