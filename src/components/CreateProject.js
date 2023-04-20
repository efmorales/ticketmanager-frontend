import { useState } from "react";
// import axios from "axios";
import api from "../auth/api";
const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

// const API_BASE_URL = process.env.REACT_APP_API_URL;

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const response = await api.post(
        "/projects",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Redirect to the new project or the projects list page
      console.log("Project created:", response.data);
    } catch (err) {
      setError(err.message || "An error occurred while creating the project.");
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Project Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
