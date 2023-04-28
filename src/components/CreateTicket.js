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
            navigate(`../projects/${projectId}`);
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
            
            <br />
            <button type="submit">Create Ticket</button>
          </form>
        </div>
      );      
};

export default CreateTicket;