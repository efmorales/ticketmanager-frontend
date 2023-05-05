import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";

import api from "../../auth/api";

const AddNewMember = () => {
  const [searchText, setSearchText] = useState({ search: "" });
  const [returnedUsers, setReturnedUsers] = useState([]);

  const { orgId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchText((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserSearchSubmit = async (e) => {
    e.preventDefault();

    const { data } = await api.get(`/users/search?name=${searchText.search}`);
    setReturnedUsers(data);
    setSearchText({ search: "" });
  };

  const addNewMember = async (userId) => {
    await api.post(`/organizations/${orgId}/members/${userId}`);
    window.location.reload(false);
  };

  const searchUsers = (
    <form className="search-members" onSubmit={handleUserSearchSubmit}>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Find user..."
        autoComplete="off"
        value={searchText.search}
        onChange={handleChange}
      />
      <FaSearch size={20} onClick={handleUserSearchSubmit} />
    </form>
  );

  const returnedUsersList = returnedUsers.map((user) => {
    return (
      <div
        className="member-card new-user-card"
        key={user._id}
        onClick={() => addNewMember(user._id)}
      >
        <FaRegUserCircle size={30} />
        <div className="member-list-card-info new-user-info">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <>
      {searchUsers}
      {returnedUsersList}
    </>
  );
};

export default AddNewMember;
