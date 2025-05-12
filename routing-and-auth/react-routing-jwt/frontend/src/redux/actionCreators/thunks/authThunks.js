export const loginUser = (credentials) => async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      } else {
        dispatch({ type: "LOGIN_ERROR", payload: data.message });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: error.message });
    }
  };
  

export const logoutUser = () => async (dispatch) => {
    await fetch("http://localhost:3001/api/logout", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
    });

    dispatch({ type: "LOGOUT" });
};

export const checkAuthStatus = () => async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/api/check-status", {
        method: "GET",
        credentials: "include",
      });
  
      const data = await response.json();
      dispatch({ type: "AUTH_STATUS", payload: data.user });
    } catch (error) {
      dispatch({ type: "AUTH_STATUS_ERROR", payload: error.message });
    }
  };

