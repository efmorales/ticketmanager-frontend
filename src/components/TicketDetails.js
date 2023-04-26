import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../auth/api";

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const TicketDetails = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [editing, setEditing] = useState({ title: false, description: false, priority: false, status: false });
    const [editedData, setEditedData] = useState({ title: "", description: "", priority: "low", status: "open" });

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const { data } = await api.get(`/tickets/${ticketId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                });

                console.log("Response data:", data);

                setTicket(data.ticket);
                setEditedData({
                    title: data.ticket.title,
                    description: data.ticket.description,
                    priority: data.ticket.priority
                });

            } catch (error) {
                console.error("Failed to fetch ticket:", error);
            }
        };

        fetchTicket();
        // console.log(ticket);
    }, [ticketId]);

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleSave = async (field) => {
        try {
            const { data } = await api.put(`/tickets/${ticketId}`, { [field]: editedData[field] }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                },
            });
            setTicket(data.ticket);
            setEditing({ ...editing, [field]: false });
        } catch (error) {
            console.error("Failed to update ticket:", error);
        }
    };

    const handleCancel = (field) => {
        setEditedData({ ...editedData, [field]: ticket[field] });
        setEditing({ ...editing, [field]: false });
    };


    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {editing.title ? (
                <>
                    <input
                        type="text"
                        value={editedData.title}
                        onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                    />
                    <button onClick={() => handleSave("title")}>Save</button>
                    <button onClick={() => handleCancel("title")}>Cancel</button>
                </>
            ) : (
                <>
                    <h1>{ticket.title}</h1>
                    <button onClick={() => handleEdit("title")}>Edit</button>
                </>
            )}

            {editing.status ? (
                <>
                    <select
                        value={editedData.status}
                        onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
                    >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                    <button onClick={() => handleSave("status")}>Save</button>
                    <button onClick={() => handleCancel("status")}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>Status: {ticket.status}</h3>
                    <button onClick={() => handleEdit("status")}>Edit</button>
                </>
            )}


            {editing.priority ? (
                <>
                    <select
                        name="priority"
                        value={editedData.priority}
                        onChange={(e) => setEditedData({ ...editedData, priority: e.target.value })}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={() => handleSave("priority")}>Save</button>
                    <button onClick={() => handleCancel("priority")}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>Priority: {ticket.priority}</h3>
                    <button onClick={() => handleEdit("priority")}> Edit</button>
                </>
            )}
            {editing.description ? (
                <>
                    <textarea
                        value={editedData.description}
                        onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                    ></textarea>
                    <button onClick={() => handleSave("description")}>Save</button>
                    <button onClick={() => handleCancel("description")}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>Description</h3>
                    <p>{ticket.description}</p>
                    <button onClick={() => handleEdit("description")}>Edit</button>
                </>
            )}
        </div>


    );
};

export default TicketDetails;
