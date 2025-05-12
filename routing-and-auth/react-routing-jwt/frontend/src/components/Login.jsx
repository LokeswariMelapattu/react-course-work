import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actionCreators/authActions"; // Ensure this action creator is implemented
import { showNotification } from "../redux/actionCreators/notificationActions";

const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Validation
    if (email === "" || password === "") {
      dispatch(
        showNotification("Email and password must be provided", "auth", "error")
      );
      return;
    }

    if (!validEmailRegex.test(email)) {
      dispatch(
        showNotification("Please enter a valid email address", "auth", "error")
      );
      return;
    }

    if (password.length < 10) {
      dispatch(
        showNotification(
          "Password must be at least 10 characters long",
          "auth",
          "error"
        )
      );
      return;
    }

    // Dispatch the login action
    dispatch(loginUser({ email, password }, navigate));
  };

  return (
    <div>
       <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
