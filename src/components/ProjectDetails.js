import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../auth/api";
import { FaPlusCircle, FaEdit, FaWindowClose, FaCircle } from "react-icons/fa";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsToShow, setTicketsToShow] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showTicketDetails, setShowTicketDetails] = useState(false);
    const [isCreatingTicket, setIsCreatingTicket] = useState(false);
    const [ticketData, setTicketData] = useState({
        title: "",
        description: "",
    });
    const [sortCriteria, setSortCriteria] = useState("latest"); // default sort by latest changes
    const [filterCriteria, setFilterCriteria] = useState(""); // no filter by default


    const itemsPerPage = 10;


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

    const sortAndFilterTickets = (tickets) => {
        let sortedTickets = [...tickets];

        if (sortCriteria === "latest") {
            sortedTickets.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        } else if (sortCriteria === "highPriority") {
            sortedTickets = sortedTickets.filter((ticket) => ticket.priority.toLowerCase() === "high");
        } else if (sortCriteria === "mediumPriority") {
            sortedTickets = sortedTickets.filter((ticket) => ticket.priority.toLowerCase() === "medium");
        } else if (sortCriteria === "lowPriority") {
            sortedTickets = sortedTickets.filter((ticket) => ticket.priority.toLowerCase() === "low");
        }

        // Sort filtered tickets by latest changes
        sortedTickets.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        if (filterCriteria) {
            sortedTickets = sortedTickets.filter((ticket) => ticket.status === filterCriteria);
        }

        return sortedTickets;
    };



    useEffect(() => {


        const fetchProject = async () => {
            try {
                const { data } = await api.get(`/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                });
                setProject(data);
                setEditedData({ name: data.name, description: data.description, members: data.members });
                const fetchMemberData = async (memberIds) => {
                    const memberPromises = memberIds.map(async (id) => {
                        const { data } = await api.get(`/users/${id}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` },
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

    useEffect(() => {
        fetchTickets();
    }, [projectId]);

    useEffect(() => {
        const lastItemIndex = currentPage * itemsPerPage;
        const firstItemIndex = lastItemIndex - itemsPerPage;
        const sortedAndFilteredTickets = sortAndFilterTickets(tickets);
        setTicketsToShow(sortedAndFilteredTickets.slice(firstItemIndex, lastItemIndex));
    }, [tickets, currentPage, sortCriteria, filterCriteria]);


    const handleEdit = (field) => {
        setEditing((prevEditing) => ({ ...prevEditing, [field]: true }));
    };


    const sortedAndFilteredTickets = sortAndFilterTickets(tickets);
    const totalPages = Math.ceil(sortedAndFilteredTickets.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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

    const handleChange = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/tickets", { ...ticketData, projectId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                },
            });
            setIsCreatingTicket(false);
            fetchTickets();
        } catch (error) {
            console.error("Failed to create ticket:", error);
        }
    };




    const updateTicket = (updatedTicket, removedTicketId) => {
        if (removedTicketId) {
          setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== removedTicketId));
        } else {
          setTickets((prevTickets) =>
            prevTickets.map((ticket) => (ticket._id === updatedTicket._id ? updatedTicket : ticket))
          );
        }
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

    const getStatusInfo = (status) => {
        switch (status) {
            case "open":
                return { color: "green", icon: <FaCircle size={12} /> };
            case "in_progress":
                return { color: "orange", icon: <FaCircle size={12} /> };
            case "closed":
                return { color: "red", icon: <FaCircle size={12} /> };
            default:
                return { color: "gray", icon: <FaCircle size={12} /> };
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

            {isCreatingTicket ? (
                <>
                    <input
                        type="text"
                        name="title"
                        value={ticketData.title}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" onClick={handleSubmit}>Create Ticket</button>
                </>
            ) : (
                <div className="new-ticket" onClick={() => setIsCreatingTicket(true)}>
                    <h2>ADD NEW TICKET</h2>
                    <FaPlusCircle size={23} className="circle-icon" />
                </div>
            )}

            <h3>Ticket Backlog:</h3>

            <div className="sort-filter-container">
                <div>
                    <label htmlFor="sort">Sort by: </label>
                    <select
                        name="sort"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                    >
                        <option value="latest">Latest Changes</option>
                        <option value="highPriority">High Priority</option>
                        <option value="mediumPriority">Medium Priority</option>
                        <option value="lowPriority">Low Priority</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="filter">Filter by status: </label>
                    <select
                        name="filter"
                        value={filterCriteria || ""}
                        onChange={(e) => setFilterCriteria(e.target.value || null)}
                    >
                        <option value="">All</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            <ul>
                {ticketsToShow.map((ticket) => {
                    const { color, icon } = getStatusInfo(ticket.status);
                    return (
                        <li key={ticket._id}>
                            <button className="text-style-button" onClick={() => openTicketDetails(ticket)}>
                                {ticket.title}{' '}
                                <span style={{ color }}>
                                    {icon} {ticket.status.replace('_', ' ')}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ◀
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    ▶
                </button>
            </div>

            {showTicketDetails && (
                <div className="modal-overlay" onClick={handleClickOutside}>
                    <div className="modal">
                        <FaWindowClose onClick={closeTicketDetails} size={30} className="close-icon" />
                        <TicketDetails ticket={selectedTicket} onUpdateTicket={updateTicket} closeTicketDetails={closeTicketDetails} />
                    </div>
                </div>
            )}

            <div className="project-description-div">

                <div className="project-description-edit">
                    <h3> Project description:</h3>

                    <FaEdit onClick={() => handleEdit("description")} size={20} className="edit-icon" />
                </div>

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

                        <div className="description-preview">
                            <p>{editedData.description || project.description}</p>
                        </div>

                    </>
                )}
            </div>

            <div className="project-members-div">

                <h3>Members:</h3>
                <ul>
                    {memberData.map((member) => (
                        <li key={member._id}>{member.name}</li>
                    ))}
                </ul>
            </div>



        </div>
    );
};

export default ProjectDetails;
