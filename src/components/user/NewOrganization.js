import { useState } from "react";
import api from "../../auth/api";

const NewOrganization = ( { userData } ) => {
  
  const formReset = {
    name: "",
    owner: userData._id,
    description: "",
  };
  
  const [newOrg, setNewOrg] = useState(formReset);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrorMessage("");

    setNewOrg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/organizations", JSON.stringify(newOrg));
      if (data.error) {
        setErrorMessage(data.error)
        return;
      }
    } catch (error) {
      console.log(error.message);
    }

    setNewOrg(formReset);
    window.location.reload(false);
  };

  return (
    <form className="new-org-form" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name: 
        <br />
        <input
          required
          type="text"
          name="name"
          id="name"
          value={newOrg.name}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
        />
        <div className="new-org-error-message">{errorMessage}</div>
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

      <button type="submit" className="new-org-submit">
        Create
      </button>
    </form>
  );
};

export default NewOrganization;
