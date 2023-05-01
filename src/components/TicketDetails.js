// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../auth/api";
import { FaEdit } from "react-icons/fa";
import './TicketDetails.css';

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const TicketDetails = (props) => {
    const { ticket, onUpdateTicket } = props
    const [editing, setEditing] = useState({ title: false, description: false, priority: false, status: false });
    const [editedData, setEditedData] = useState({ title: "", description: "", priority: "low", status: "open" });
    const [projectMembers, setProjectMembers] = useState([]);


    useEffect(() => {
        const fetchProjectMembers = async () => {
            try {
                const { data } = await api.get(`/projects/${ticket.projectId}/members`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                });
                setProjectMembers(data.members);
            } catch (error) {
                console.error("Failed to fetch project members:", error);
            }
        };

        if (ticket) {
            fetchProjectMembers();
        }
    }, [ticket]);

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleSave = async (field) => {
        try {
            const { data } = await api.put(`/tickets/${ticket._id}`, { [field]: editedData[field] }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                },
            });
            onUpdateTicket(data.ticket);
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
        <div className="ticket-details-container">
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
                <div className="ticket-title-preview">
                    <h1>{ticket.title}</h1>
                    < FaEdit onClick={() => handleEdit("title")} size={30} />
                </div>
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

            {editing.assignedTo ? (
                <>
                    <select
                        name="assignedTo"
                        value={editedData.assignedTo}
                        onChange={(e) => setEditedData({ ...editedData, assignedTo: e.target.value })}
                    >
                        {projectMembers.map((member) => (
                            <option key={member._id} value={member._id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => handleSave("assignedTo")}>Save</button>
                    <button onClick={() => handleCancel("assignedTo")}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>
                        Assigned To: {ticket.assignedTo.length > 0 ? ticket.assignedTo[0].name : "Not assigned"}
                    </h3>
                    <button onClick={() => handleEdit("assignedTo")}>Edit</button>
                </>
            )}
        </div>


    );
};

export default TicketDetails;
