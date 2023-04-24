import { useState } from "react";
import "./UserProfile.css";
import { useAuth } from "../auth/AuthContext";

const UserProfile = () => {
  const { loggedInUser } = useAuth();

  const [userInfo, setUserInfo] = useState({
    name: loggedInUser.name,
    editable: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userName = (
    <input
      className="field-value-editable"
      type="text"
      name="name"
      id="name"
      value={userInfo.name}
      onChange={handleChange}
      onBlur={() => setUserInfo((prev) => ({ ...prev, editable: false }))}
      autoFocus
      onFocus={(e) => e.target.select()}
    />
  );

  const profileCard = (
    <>
      <p className="field">
        <span className="field-name">Name:</span>
        <span
          className="field-value"
          onClick={() => setUserInfo((prev) => ({ ...prev, editable: true }))}
        >
          {userInfo.editable ? userName : userInfo?.name}
        </span>
      </p>
      <p className="field">
        <span className="field-name">Email: </span>
        <span className="field-value">{loggedInUser?.email}</span>
      </p>
      <p className="field">
        <span className="field-name">Bio: </span>
        <span className="field-value">{loggedInUser?.bio}</span>
      </p>
    </>
  );

  return <section className="profile-card">{profileCard}</section>;
};

export default UserProfile;
