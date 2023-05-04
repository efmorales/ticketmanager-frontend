import { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import api from "../auth/api";
import { Link } from "react-router-dom";
const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const UserDashboard = () => {
  // const { loggedInUser } = useAuth();
  // const [assignedTickets, setAssignedTickets] = useState([]);

  //   useEffect(() => {
  //   const fetchAssignedTickets = async () => {
  //     try {
  //       // Fetch user's projects
  //       const { data: projectsData } = await api.get("/projects", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  //         },
  //       });

  //       // Fetch tickets for each project and filter by assigned user
  //       const assignedTicketsPromises = projectsData.map(async (project) => {
  //         const { data: ticketsData } = await api.get(`/projects/${project._id}`, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  //           },
  //         });
  //         console.log(ticketsData)
  //         return ticketsData.tickets.filter(
  //           (ticket) => ticket.assignedTo[0] && ticket.assignedTo[0]._id === projectsData.user._id
  //         );
  //       });

  //       const assignedTicketsArrays = await Promise.all(assignedTicketsPromises);
  //       const flattenedAssignedTickets = assignedTicketsArrays.flat();
  //       setAssignedTickets(flattenedAssignedTickets);
  //     } catch (error) {
  //       console.error("Failed to fetch assigned tickets:", error);
  //     }
  //   };

  //   fetchAssignedTickets();
  // }, []);

  return (
        <div className="home-container">
          {/* <h1>
            Hello{loggedInUser && ` ${loggedInUser?.name}`}, welcome to the Ticket
            Manager Home Page!
          </h1> */}
    
          <div>
            <h1>Your Assigned Tickets</h1>
            {/* <ul>
              {assignedTickets.map((ticket) => (
                <li key={ticket._id}>
                  <Link to={`/user/projects/${ticket.projectId}/tickets/${ticket._id}`}>
                    {ticket.title}
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      );
}
 
export default UserDashboard;