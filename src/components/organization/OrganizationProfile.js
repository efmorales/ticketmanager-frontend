import { useOutletContext } from "react-router-dom";

const OrganizationProfile = () => {
  const styles = {
    padding: "1em 4em",
  };

  const { organization, members } = useOutletContext();

  return (
    <div className="" style={styles}>
      <h1>{organization.name}</h1>
      <p>{organization.description}</p>
    </div>
  );
};

export default OrganizationProfile;
