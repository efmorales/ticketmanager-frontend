import { Link } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";

const MembersList = ({ members }) => {
  return (
    <>
      <div className="member-list">
        {members.map((member) => {
          return (
            <Link to={`${member._id}`} key={member._id}>
              <div className="member-card" key={member._id}>
                <FaRegUserCircle size={40} />
                <div className="member-list-card-info">
                  <h3>{member.user.name}</h3>
                  <p className="member-title">{member.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default MembersList;
