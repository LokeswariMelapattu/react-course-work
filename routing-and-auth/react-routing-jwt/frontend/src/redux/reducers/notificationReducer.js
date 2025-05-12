import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../actionTypes";

const initialState = {
  message: '',
  stateType: null,
  requestStatus: null,
  visible: false,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        message: action.payload.message,
        stateType: action.payload.stateType,
        requestStatus: action.payload.requestStatus,
        visible: true,
      };
    case HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
