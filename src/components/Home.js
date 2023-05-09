import { useAuth } from "../auth/AuthContext";

import "./Home.css";

const Home = () => {
  const { loggedInUser } = useAuth();

  return (
    // <h1>
    //   Hello{loggedInUser && ` ${loggedInUser?.name}`}, welcome to the Ticket
    //   Manager Home Page!
    // </h1>
    <div className="home-page-content">
      <h1 className="home-page-title">TICKET MANAGER</h1>
    </div>
  );
};

export default Home;
