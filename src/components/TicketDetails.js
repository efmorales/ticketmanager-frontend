import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../auth/api";

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const {data} = await api.get(`/tickets/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        });

      console.log("Response data:", data);

        setTicket(data.ticket);
      } catch (error) {
        console.error("Failed to fetch ticket:", error);
      }
    };

    fetchTicket();
    // console.log(ticket);
  }, [ticketId]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h3>Status: {ticket.status}</h3>
      <h3>Priority: {ticket.priority}</h3>
      <h3>Description</h3>
      <p>{ticket.description}</p>
    </div>
  );
};

export default TicketDetails;
