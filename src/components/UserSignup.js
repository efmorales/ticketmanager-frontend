import { useState } from "react";
import "./UserSignup.css";
import axios from "axios";

const TOKEN_KEY = process.env.REACT_APP_TOKEN_HEADER_KEY;

const UserSignup = () => {
  const resetForm = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [newUser, setNewUser] = useState(resetForm);

  const [error, setError] = useState("");

  if (error) console.log(error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const postNewUser = async () => {
    const { data } = await axios.post("http://localhost:8000/users/register", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });

    if ("error" in data) {
      setError(data.error);
    } else {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewUser();
    setNewUser(resetForm);
  };

  return (
    <div className="sign-up-card">
      <form className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="title">TICKET MANAGER</div>
        <p className="sign-up-title">Sign up</p>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newUser.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={newUser.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          value={newUser.repeatPassword}
          onChange={handleChange}
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
