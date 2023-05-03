// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../auth/api";
import { FaEdit } from "react-icons/fa";
import './TicketDetails.css';

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const TicketDetails = (props) => {
    const { ticket, onUpdateTicket } = props
    const [editing, setEditing] = useState({ title: false, description: false, priority: false, status: false });
    const [editedData, setEditedData] = useState({ title: "", description: "", priority: "", status: "" });
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
        setEditedData((prevData) => ({ ...prevData, [field]: ticket[field] }));
        setEditing({ ...editing, [field]: true });
    };



    const handleChangeAndSave = async (field, value) => {
        try {
            const { data } = await api.put(
                `/tickets/${ticket._id}`,
                { [field]: field === "assignedTo" ? [value] : value },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                }
            );
            onUpdateTicket(data.ticket);
            if (field === "assignedTo") {
                const assignedMember = projectMembers.find((member) => member._id === value);
                setEditedData((prevData) => ({ ...prevData, [field]: assignedMember }));
            } else {
                setEditedData((prevData) => ({ ...prevData, [field]: value }));
            }
        } catch (error) {
            console.error("Failed to update ticket:", error);
        }
    };

    const handleBlur = async (field, value) => {
        setEditing({ ...editing, [field]: false });

        try {
            const { data } = await api.put(
                `/tickets/${ticket._id}`,
                { [field]: value },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                }
            );
            onUpdateTicket(data.ticket);
            setEditedData((prevData) => ({ ...prevData, [field]: value }));
        } catch (error) {
            console.error("Failed to update ticket:", error);
        }
    };



    const editableField = (fieldName) => {
        return (
            <input
                className="field-value-editable"
                type="text"
                name={fieldName}
                id={fieldName}
                defaultValue={editedData[fieldName]}
                onBlur={(e) => handleBlur(fieldName, e.target.value)}
                autoFocus
                onFocus={(e) => e.target.select()}
                placeholder="Your text here..."
                autoComplete="off"
            />
        );
    };




    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ticket-details-container">

            {editing.title ? (
                editableField("title")
            ) : (
                <div className="ticket-title-preview">
                    <h1>{editedData.title || ticket.title}</h1>
                    <FaEdit onClick={() => handleEdit("title")} size={20} />
                </div>
            )}


            <h3>Status:</h3>
            <label>
                <select
                    value={editedData.status || ticket.status}
                    onChange={(e) => handleChangeAndSave("status", e.target.value)}
                >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
            </label>


            <h3>Priority:</h3>
            <label>

                <select
                    value={editedData.priority || ticket.priority}
                    onChange={(e) => handleChangeAndSave("priority", e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>

            {editing.description ? (
                editableField("description")
            ) : (
                <>
                    <h3>Description:</h3>
                    <p>{editedData.description || ticket.description}</p>
                    <FaEdit onClick={() => handleEdit("description")} size={20} />
                </>
            )}


            <h3>Assigned to:</h3>
            <label>
                <select
                    value={(editedData.assignedTo && editedData.assignedTo._id) || (ticket.assignedTo.length > 0 ? ticket.assignedTo[0]._id : '')}
                    onChange={(e) => handleChangeAndSave("assignedTo", e.target.value)}
                >
                    {projectMembers.map((member) => (
                        <option key={member._id} value={member._id}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </label>


        </div>


    );
};

export default TicketDetails;
