import { Link } from "react-router-dom";

const UserOrganizationsList = ({ userOrgs }) => {
  return (
    <div className="orgs-list">
      {userOrgs.map((org) => {
        const { _id, name, description } = org.parentOrg;
        return (
          <Link
            className="organization-link"
            to={`/organization/${_id}`}
            key={_id}
          >
            <div className="organization-card" key={org._id}>
              <h2>{name}</h2>
              <p className="organization-description">{description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default UserOrganizationsList;
