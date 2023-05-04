import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { FaPlusCircle, FaArrowCircleLeft, FaSearch } from "react-icons/fa";

import MembersList from "./MembersList";
import AddNewMember from "./AddNewMember";

import "./OrganizationMembers.css";

const OrganizationMembers = ({ children }) => {
  const [isListSelected, setIsListSelected] = useState(true);

  const { organization, members } = useOutletContext();

  const handleToggle = () => {
    setIsListSelected(!isListSelected);
  };

  return (
    <div className="members-page">
      <div className="member-list-controls">
        <div onClick={handleToggle}>
          {isListSelected ? (
            <div className="member-control">
              <FaPlusCircle size={20} /> <span>Add New Member</span>
            </div>
          ) : (
            <div className="member-control">
              <FaArrowCircleLeft size={20} /> <span>Back to Members</span>
            </div>
          )}
        </div>
      </div>
      {/* <div className="member-control search-members">
        <FaSearch size={20} /> <span>Search Members</span>
      </div> */}
      {/* <Link to="new" className="add-new-member">
        
        <span>ADD NEW MEMBER</span>
      </Link> */}
      {isListSelected ? (
        <MembersList members={members} />
      ) : (
        <AddNewMember setIsListSelected={setIsListSelected} />
      )}
    </div>
  );
};

export default OrganizationMembers;
