import React, { useEffect, useState } from "react";
import api from "../../auth/api";
import { Link, useOutletContext } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import "../Projects.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const headerToken = process.env.REACT_APP_TOKEN_HEADER_KEY;

const OrganizationProjects = () => {
  const { organization, members } = useOutletContext();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem(headerToken);
        if (token) {
          const response = await api.get(
            `${API_BASE_URL}/organizations/${organization._id}/projects`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProjects(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-container">
      <Link to="new" className="new-project">
        <h3>ADD NEW PROJECT</h3>
        <FaPlusCircle size={30} className="circle-icon" />
      </Link>
      <h1>Projects</h1>
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

export default OrganizationProjects;
