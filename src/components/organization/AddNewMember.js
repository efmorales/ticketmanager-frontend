import { useState } from "react";
import { FaArrowCircleLeft, FaSearch } from "react-icons/fa";

import api from "../../auth/api";


const AddNewMember = ({ isListSelected }) => {

  const handleUserSearchSubmit = async (e) => {
    e.preventDefault();

    const searchResults = await api.get("/")

  }

  const searchUsers = (
    <form className="search-members" onSubmit={handleUserSearchSubmit}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Find user..."
      />
      <FaSearch size={20} />
    </form>
  );

  return <>{searchUsers}</>;
};

export default AddNewMember;

// import { FaArrowCircleLeft, FaSearch } from "react-icons/fa";

// const AddNewMember = ({ isListSelected }) => {
//   return (
//     <>
//       <div className="search-members">
//         {/* <span>Search Users</span> */}
//         <input type="search" name="search" id="search" placeholder="Find user..." /><FaSearch size={20} />
//       </div>
//       <h1>Add New Member Page will go here!!</h1>
//       {message}
//     </>
//   );
// };

// export default AddNewMember;
