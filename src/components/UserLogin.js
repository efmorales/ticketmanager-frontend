import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserSignupAndLogin.css";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

const UserSignup = () => {
  const valuesReset = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(valuesReset);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(valuesReset);

  const { setLoggedInUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage(valuesReset);
    setError("");
  };

  const postUser = async () => {
    const { data } = await axios.post(API_BASE_URL + "/users/login", {
      email: user.email,
      password: user.password,
    });

    if ("error" in data) {
      setError(data.error);
    } else {
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(valuesReset);
      setLoggedInUser(data.user);
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postUser();
  };

  return (
    <div className="sign-up-card">
      <form
        className="sign-up-form"
        onSubmit={(e) => handleSubmit(e)}
        autoComplete="off"
      >
        <div className="title">TICKET MANAGER</div>
        <p className="sign-up-title">Login</p>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password">
          Password
          <span className="password-message">{message.password}</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <div className="error-message">{error}</div>
        <button className="submit-button" type="submit">
          Login
        </button>
        <p className="login-signup-link">
          Not signed up yet? <Link to="../signup">SIGN UP</Link>
        </p>
      </form>
    </div>
  );
};

export default UserSignup;
