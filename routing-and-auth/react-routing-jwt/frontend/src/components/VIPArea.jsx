/**
 * VIPArea component renders a protected area for VIP users.
 * If the user is not logged in, they are redirected to the login page.
 * 
 * @component
 * @returns {JSX.Element} The VIP area component.
 */
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function VIPArea() {
    const user = useSelector((state) => state.auth?.user);
    if (!user ||  !user.email) return <Navigate to="/login" />; // Redirect non-VIP users

    return (
      <div className="vip-container">
        <h1>VIP Area</h1>
        <p>Registered and logged-in? Then welcome! Here you can view VIP Products and VIP Posts by clicking the links above.</p>
        <Outlet />
      </div>
    );
  }
  