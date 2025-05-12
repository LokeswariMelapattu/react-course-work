import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/actionCreators/authActions";
import { showNotification } from "../redux/actionCreators/notificationActions";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 10; // Ensure password is 10 or more characters
  };

  const isValidName = (name) => {
    return name.length >= 3; // Ensure name is 3 or more characters
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Perform client-side validation first
    if (!isValidEmail(email)) {
      return dispatch(
        showNotification("Invalid email format", "auth", "error")
      );
    }
    if (!isValidPassword(password)) {
      return dispatch(
        showNotification(
          "Password must be at least 10 characters",
          "auth",
          "error"
        )
      );
    }
    if (!isValidName(name)) {
      return dispatch(
        showNotification("Name must be at least 3 characters", "auth", "error")
      );
    }
    if (password !== passwordConfirmation) {
      return dispatch(
        showNotification("Passwords do not match", "auth", "error")
      );
    }

    // If all validations pass, dispatch the registration action
    dispatch(registerUser({ name, email, password }, navigate));
  };

  return (
    <div>
      <h1>Register a new user</h1>
      <br />
      <br />
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          style={{ margin: 5 }}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          style={{ margin: 5 }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          style={{ margin: 5 }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label htmlFor="passwordConfirmation">Password confirmation</label>
        <input
          type="password"
          placeholder="Password confirmation"
          id="passwordConfirmation"
          value={passwordConfirmation}
          style={{ margin: 5 }}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
