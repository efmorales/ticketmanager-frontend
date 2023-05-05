import { useState } from "react";
import api from "../../auth/api";
import { useAuth } from "../../auth/AuthContext"

const NewOrganization = () => {

  const { loggedInUser } = useAuth();

  const formReset = {
    name: "",
    owner: loggedInUser._id,
    description: "",
  };

  const [newOrg, setNewOrg] = useState(formReset);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewOrg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/organizations", JSON.stringify(newOrg));
      console.log(data)
    } catch (error) {
      console.log(error.message);
    }

    setNewOrg(formReset);
    window.location.reload(false);
  };

  return (
    <form className="new-org-form" onSubmit={handleSubmit}>

      <label htmlFor="name">
        Name: <br />
        <input
          required
          type="text"
          name="name"
          id="name"
          value={newOrg.name}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
        />
      </label>

      <label htmlFor="description">
        Description: <br />
        <textarea
          required
          name="description"
          id="description"
          value={newOrg.description}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </label>

      <button type="submit" className="new-org-submit">Create</button>

    </form>
  );
};

export default NewOrganization;


//  const mockOrgData = {
//     name: {
//       type: String,
//       required: [true, "Your new organization must have a name."],
//       unique: true,
//       trim: true,
//       maxLength: [100, "Exceeded character limit of 100."],
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "Your organization must have an assigned owner."],
//     },
//     description: {
//       type: String,
//       trim: true,
//       maxLength: [1000, "Exceeded character limit of 1,000."],
//     },
//     members: [{ type: Schema.Types.ObjectId, ref: "OrgMember" }], // TODO: Make this a virtual
//   }