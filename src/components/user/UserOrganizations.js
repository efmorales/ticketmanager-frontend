import { Link } from "react-router-dom";

const UserOrganizations = () => {
  const styles = {
    padding: "1em 4em",
  };
  return (
    <div className="" style={styles}>
      <h1>This is my User Organizations listings page!</h1>
      <p>
        List of organizations will go here. Each organization displayed will
        link to a portal to that organizations's dashboard
      </p>
      <div>Example: </div>
      <ul>
        <li>
          <Link to="/organization">Organization Name</Link>
        </li>
        <li>
          <Link to="/organization">Another Organization Name</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserOrganizations;
