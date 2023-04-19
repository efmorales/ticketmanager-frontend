import { useAuth } from "../auth/AuthContext";

const UserProfile = () => {
  const { loggedInUser } = useAuth();

  return (
    <>
      <h1>{loggedInUser.name}</h1>
      <h1>{loggedInUser.email}</h1>
    </>
  );
};

export default UserProfile;
