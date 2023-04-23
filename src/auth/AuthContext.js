import { createContext, useContext, useState } from "react";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const logout = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
    setLoggedInUser(null);
  };

  const verifyToken = async () => {
    const localToken = localStorage.getItem(
      process.env.REACT_APP_TOKEN_HEADER_KEY
    );

    if (localToken) {
      const { data } = await axios.get(api + "/users/verify-user", {
        headers: { token: localToken },
      });

      if (data.error) {
        console.log(data.error);
        logout();
      } else {
        setLoggedInUser(data.user)
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser, verifyToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuth };
