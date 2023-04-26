import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../auth/api";

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const CreateTicket = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    projectId: projectId,
    title: "",
    description: "",
    priority: "low",
    assignedTo: "",
  });

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tickets", ticketData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  return (
    <div>
      <h1>Create Ticket</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={ticketData.title}
          onChange={handleChange}
          required
        />
        <br />
        <label>Description:</label>
        <textarea
          name="description"
          value={ticketData.description}
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <label>Priority:</label>
        <select name="priority" value={ticketData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <br />
        <label>Assigned To:</label>
        <input
          type="text"
          name="assignedTo"
          value={ticketData.assignedTo}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;