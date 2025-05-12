// actionCreators/authActions.js
import axios from "axios";
import {
  SET_USER_AUTH,
  LOGOUT_USER,
  AUTH_ERROR
} from "../actionTypes";
import { showNotification } from "./notificationActions";
import { Routes, Route, useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001";

// Action for setting user auth from cookie on app load/mount
export const checkAuthStatus = () => {
  return async (dispatch) => {
    // dispatch(showNotification("Checking authentication status...", "auth", "loading"));
    try {
      // https://axios-http.com/docs/req_config
      // `withCredentials` indicates whether or not cross-site Access-Control requests
      // should be made using credentials
      const response = await axios.get("/api/check-status", {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.user) {
        // dispatch(showNotification("User authenticated", "auth", "success"));
        dispatch({
          type: SET_USER_AUTH,
          payload: response.data.user,
        });
      } else {
        dispatch({
          type: SET_USER_AUTH,
          payload: { role: "guest" },
        });
      }
    } catch (error) {
      dispatch(authError("Failed to check authentication status"));    }
  };
};

export const setUserAuth = (user) => ({
  type: SET_USER_AUTH,
  payload: user,
});

export const logoutUser = (navigate, returnPath, userRole) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: CLEAR_ORDERS }); // Add this line to clear orders when logging out
        dispatch({ type: CLEAR_USERS });
        dispatch(showNotification("Logout successful", "auth", "success"));
        if (userRole === "admin" && returnPath === 'localhost:3001/products') {
          window.location.href = returnPath;
        } else {
          navigate("/login");
        }
        // Redirect to login page after successful logout
      } else {
        dispatch(showNotification("Logout failed.", "auth", "error"));
      }
    } catch (error) {
      let message = "Logout failed. Please try again.";
      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      }
      dispatch(showNotification(message, "auth", "error"));
    }
  };
};

export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error,
});

export const registerUser = (userData, navigate) => {
  return async (dispatch) => {
    dispatch(showNotification("Registering user...", "auth", "loading"));
    try {
      const response = await axios.post("/api/register", userData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        dispatch({
          type: SET_USER_AUTH,
          payload: response.data.user,
        });
        dispatch(
          showNotification("User registered successfully", "auth", "success")
        );
        navigate("/"); // Redirect to home page or other desired route
      } else {
        dispatch(showNotification("Registration failed.", "auth", "error"));
      }
    } catch (error) {
      dispatch(
        showNotification(
          "Registration failed. Please try again.",
          "auth",
          "error"
        )
      );
    }
  };
};

/**
 * Action creator for logging in a user.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.username - The username of the user.
 * @param {string} credentials.password - The password of the user.
 * @param {Function} navigate - The navigation function to redirect the user.
 * @returns {Function} A thunk function that handles the login process.
 */

/* TODO: Implement the loginUser action creator. 

1. Dispatch a notification before the API call
    dispatch a loading notification before making the API call, using showNotification("Logging in...", "auth", "loading")

2. Make the API request to authenticate the user
    Use axios.post to send user credentials (email/password) to the /api/login endpoint.
    Include { withCredentials: true } in the request configuration to ensure that cookies/session authentication are handled properly.

    Expected API behavior
    If the credentials are correct, the server returns a 200 status along with user data.
    If incorrect, the server returns a relevant error message with an appropriate status code.

3. On successful login
    If response.status === 200, the login is successful, so:
        - dispatch an action with type: SET_USER_AUTH, store the user details 
        - show a success notification using showNotification("Login successful", "auth", "success").
        - use navigate("/") function to redirect the user to the homepage  after successful authentication.

4. Handle login failures 
    If the API response is not 200, handle the failure case:
      - display an error notification (showNotification("Login failed.", "auth", "error")).
      - provide user-friendly feedback rather than a generic error message.

5. Catch and process errors
    - use a try-catch block to catch potential network errors or API failures.
    - show an error notification using showNotification(message, "auth", "error").

6. Dispatch sequence
    The dispatch order:
        a. show Loading notification before making the API request
        b. make API call and authenticate the user
        c. handle success or failure by dispatching actions based on the response.
        d. redirect user on success by using navigate("/") for navigation.
        e. handle errors

    Use action types (SET_USER_AUTH, AUTH_ERROR, etc.) for consistency.

*/  
export const loginUser = (credentials, navigate) => {
  return async (dispatch) => {
    // Step 1: Dispatch a loading notification
    dispatch(showNotification("Logging in...", "auth", "loading"));

    try {
      // Step 2: Make the API request to login the user
      const response = await axios.post("/api/login", credentials, {
        withCredentials: true,
      });

      // Step 3: Handle successful login
      if (response.status === 200) {
        // Store the authenticated user's details in the state
        dispatch({
          type: SET_USER_AUTH,
          payload: response.data.user,
        });
        
        // Show success notification
        dispatch(showNotification("Login successful", "auth", "success"));
        
        // Redirect the user to the homepage or a desired route
        navigate("/"); // You can change this to another route as needed
      } else {
        // Handle the case where the response is not successful
        dispatch(showNotification("Login failed. Please check your credentials.", "auth", "error"));
      }
    } catch (error) {
      // Step 4: Handle errors and show appropriate error message
      let message = "Login failed. Please try again.";
      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      }
      dispatch(showNotification(message, "auth", "error"));
      
      // Dispatch auth error action to set error state
      dispatch(authError(message));
    }
  };
};
