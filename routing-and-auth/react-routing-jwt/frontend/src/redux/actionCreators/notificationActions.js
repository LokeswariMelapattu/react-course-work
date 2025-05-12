import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../actionTypes";

export const showNotification = (message, stateType, requestStatus) => {
  return (dispatch) => {
    // Clear any existing notifications of the same stateType
    dispatch({
      type: HIDE_NOTIFICATION,
    });

    // Show the new notification
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { message, stateType, requestStatus },
    });

    // Set a timer to hide the notification after 5 seconds
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
};

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});
