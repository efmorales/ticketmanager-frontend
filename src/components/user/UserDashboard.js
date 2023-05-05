import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../auth/api";
import "./UserDashboard.css";

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const UserDashboard = () => {
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);

  useEffect(() => {
    const fetchAssignedTickets = async () => {
      try {
        const response = await api.get("/tickets/assigned", {
          headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
        });

        setAssignedTickets(response.data.tickets);
      } catch (error) {
        console.error("Failed to fetch assigned tickets:", error);
      }
    };

    const fetchLatestProjects = async () => {
      try {
        const response = await api.get("/projects/latest", {
          headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
        });

        setLatestProjects(response.data.projects);
      } catch (error) {
        console.error("Failed to fetch latest projects:", error);
      }
    };

    fetchAssignedTickets();
    fetchLatestProjects();
  }, []);

  return (
    <div className="user-dashboard-container">
      <h1> User Dashboard </h1>
      <h2>Assigned Tickets</h2>
      <ul>

        {assignedTickets.filter(ticket => ticket.projectId).map((ticket) => (
          <li key={ticket._id}>
            {ticket.title} ({ticket.projectId.name})
          </li>
        ))}
      </ul>
      <h2>Latest Projects</h2>
      <ul>
        {latestProjects.map((project) => (
          <li key={project._id}>
            <Link to={`/user/projects/${project._id}`}>
            {project.name} - Last Updated: {new Date(project.updatedAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
