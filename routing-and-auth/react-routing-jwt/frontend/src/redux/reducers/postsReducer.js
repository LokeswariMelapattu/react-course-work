import {
    SET_POSTS,
} from "../actionTypes";

const initialState = {
    posts: [],
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
};

export default postsReducer;
