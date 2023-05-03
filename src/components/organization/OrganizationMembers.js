import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import "./OrganizationMembers.css";

const OrganizationMembers = () => {
  const { organization, members } = useOutletContext();

  return (
    <div className="members-page">
      <div className="member-list-controls">
        <div>Controls go here</div>
      </div>
      <div className="add-new-member">+ Add New Member</div>
      {members.map((member) => {
        return (
          <Link to={`${member._id}`}>
            <div className="member-list-card" key={member._id}>
              <FaRegUserCircle size={40} />
              <div className="member-list-card-info">
                <h3>{member.user.name}</h3>
                <p>{member.permissions}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default OrganizationMembers;
