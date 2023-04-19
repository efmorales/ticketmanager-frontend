import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const { loggedInUser } = useAuth();

  return (
    <h1>
      Hello{loggedInUser && ` ${loggedInUser.name}`}, welcome to the Ticket
      Manager Home Page!
    </h1>
  );
};

export default Home;
