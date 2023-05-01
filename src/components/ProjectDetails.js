import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../auth/api";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import TicketDetails from './TicketDetails';
import './ProjectDetails.css';
import './modal.css';



const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const ProjectDetails = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [editing, setEditing] = useState({ name: false, description: false, members: false });
    const [editedData, setEditedData] = useState({ name: "", description: "", members: [] });
    const [memberData, setMemberData] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showTicketDetails, setShowTicketDetails] = useState(false);



    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await api.get(`/tickets/project/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                });
                setTickets(response.data.tickets);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        const fetchProject = async () => {
            try {
                const { data } = await api.get(`/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                });
                setProject(data);
                fetchTickets();
                setEditedData({ name: data.name, description: data.description, members: data.members });
                const fetchMemberData = async (memberIds) => {
                    const memberPromises = memberIds.map(async (id) => {
                        const { data } = await api.get(`/users/${id}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}}` },
                        });
                        return data;
                    });

                    const memberData = await Promise.all(memberPromises);
                    setMemberData(memberData);
                };
                fetchMemberData(data.members);
            } catch (error) {
                console.error("Failed to fetch project:", error);
            }
        };


        fetchProject();
    }, [projectId]);

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleBlur = async (field, value) => {
        setEditing({ ...editing, [field]: false });

        try {
            const { data } = await api.put(`/projects/${projectId}`, { [field]: value }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                },
            });
            setProject(data);
            setEditedData((prevData) => ({ ...prevData, [field]: value }));
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    };


    const updateTicket = (updatedTicket) => {
        setTickets((prevTickets) =>
            prevTickets.map((ticket) => (ticket._id === updatedTicket._id ? updatedTicket : ticket))
        );
    };

    const openTicketDetails = (ticket) => {
        setSelectedTicket(ticket);
        setShowTicketDetails(true);
    };

    const closeTicketDetails = () => {
        setSelectedTicket(null);
        setShowTicketDetails(false);
    };

    const handleClickOutside = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            closeTicketDetails();
        }
    };


    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="project-details-container">

            {editing.name ? (
                <div className="title-edit">
                    <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        onBlur={(e) => handleBlur("name", e.target.value)}
                        autoFocus
                        onFocus={(e) => e.target.select()}
                    />

                </div>
            ) : (
                <div className="title-preview">
                    <h1>{editedData.name || project.name}</h1>
                    <FaEdit onClick={() => handleEdit("name")} size={30} className="edit-icon" />
                </div>
            )}

            <Link to={"create-ticket"} className="new-ticket">

                <h2>ADD NEW TICKET</h2>
                <FaPlusCircle size={23} className="circle-icon" />

            </Link>
            <h3>Ticket Backlog</h3>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket._id}>
                        <button className="text-style-button" onClick={() => openTicketDetails(ticket)}>
                            {ticket.title} - {ticket.status}
                        </button>
                    </li>
                ))}
            </ul>

            {showTicketDetails && (
                <div className="modal-overlay" onClick={handleClickOutside}>
                    <div className="modal">
                        <FaWindowClose onClick={closeTicketDetails} size={30} className="close-icon" />
                        <TicketDetails ticket={selectedTicket} onUpdateTicket={updateTicket} />
                    </div>
                </div>
            )}

            <h3>Description</h3>

            {editing.description ? (
                <div className="description-edit">
                    <textarea
                        value={editedData.description}
                        onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                        onBlur={(e) => handleBlur("description", e.target.value)}
                        autoFocus
                        onFocus={(e) => e.target.select()}
                    />

                </div>
            ) : (
                <>
                    <FaEdit onClick={() => handleEdit("description")} size={20} className="edit-icon" />

                    <div className="description-preview">
                        <p>{editedData.description || project.description}</p>
                    </div>

                </>
            )}

            <h3>Members</h3>
            <ul>
                {memberData.map((member) => (
                    <li key={member._id}>{member.name}</li>
                ))}
            </ul>



        </div>
    );
};

export default ProjectDetails;
