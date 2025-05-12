import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../redux/actionCreators/notificationActions";

const Notifications = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (notification?.visible) {
      timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [notification, dispatch]);

  if (!notification?.visible) return null;

  // Define styles for different notification types
  const notificationStyles = {
    success: {
      backgroundColor: "green", // Green background for success
      color: "white", // White text for readability
      padding: "10px",
      borderRadius: "4px",
      margin: "10px 0",
      textAlign: "center",
    },
    error: {
      backgroundColor: "red", // Red background for error
      color: "white",
      padding: "10px",
      borderRadius: "4px",
      margin: "10px 0",
      textAlign: "center",
    },
    loading: {
      backgroundColor: "blue", // Blue background for loading
      color: "white",
      padding: "10px",
      borderRadius: "4px",
      margin: "10px 0",
      textAlign: "center",
    },
    // You can add more styles for different statuses if needed
  };

  return (
    <div>
      <div>{notification.message}</div>
    </div>
  );
};

export default Notifications;
