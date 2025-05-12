// reducers/authReducer.js
import { SET_USER_AUTH, LOGOUT_USER, AUTH_ERROR } from "../actionTypes";

const initialState = {
  user: null, // user is initially marked as a guest
  error: null,
};

 export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return {
        ...state,
        user: action.payload, // Set the user's data from the registration/login response
        error: null, // Clear any previous errors
      };
    case LOGOUT_USER:
      return { ...initialState, user: { role: "guest" } };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}; 

export default authReducer;
