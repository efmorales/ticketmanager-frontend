import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../auth/api";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const headerToken = process.env.REACT_APP_TOKEN_HEADER_KEY;

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem(headerToken);
        if (token) {

          const response = await api.get(`${API_BASE_URL}/projects`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProjects(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
        {/* {After this line, create a Link to the route /projects/new}, the h3 should be names "Create a new project" */}
        <Link to="new"><h3>Create a new project</h3></Link>
      <h1>Your Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={project._id}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
