import { FETCH_POSTS_REQUEST, SET_POSTS, FETCH_POSTS_FAILURE } from "../../actionTypes";

// Thunk to Fetch Posts
export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST });

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    dispatch({ type: SET_POSTS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
  }
};
