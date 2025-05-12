/**
 * Main application component that sets up the router and renders the application content.
 *
 * @param {Object} props - Component props.
 * @param {React.ComponentType} [props.router=BrowserRouter] - The router component to use. Defaults to BrowserRouter.
 * @returns {JSX.Element} The rendered application component.
 */

/**
 * Component that contains the main content of the application, including navigation and routes.
 *
 * @returns {JSX.Element} The rendered application content.
 */
import { Link, useLocation, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LastVisitedPages from "./components/LastVisitedPages";
import Notifications from "./components/Notifications";
import ErrorMessage from "./components/ErrorMessage";
import AppRoutes from "./AppRoutes";
import { LOGOUT_USER } from "./redux/actionTypes";

export default function App({ router: RouterComponent = BrowserRouter }) {

  return (
    <RouterComponent>
      <AppContent />
    </RouterComponent>
  );
}
function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth?.user); // Access user state
  const error = useSelector((state) => state.error); // Access error state

  // Handle logout
  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
  };

  // Track page navigation
  useEffect(() => {
    dispatch({ type: "TRACK_PAGE", payload: location.pathname });
  }, [location, dispatch]);

  // Determine if user is logged in and their role
  const isAuthenticated = !!user ;
  const userRole = user?.role || "guest"; // Default role is "guest" if user is null
  console.log(isAuthenticated);
  return (
    <>
    {/* TODO
    Check user.role to conditionally render React Router navigation links.
    Show "Register" and "Login" links if the user is not logged in or has a "guest" role.
    Show VIP links if the user is authenticated and has the appropriate role. If the user is not authenticated, their role is null or "guest".

    Logout Handling
    Implement a dispatch functionto trigger LOGOUT_USER. Ensure that logout clears the user state and redirects appropriately.

    Error HandlingDisplay an ErrorMessage component if an error exists in the state.

    Use a LastVisitedPages component to track recent navigation history.
    
    Implement a Notifications component to display real-time alerts or messages.
    
    Render AppRoutes to define and handle different routes in the application.
      
      */}
      {/* Navigation */}
      <nav>
        <ul>
          {/* Public Links */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!isAuthenticated || userRole === "guest"  ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <> 
              {/* VIP Links (only visible to authenticated users) */}
              
                <>
                  <li>
                    <Link to="/vip">VIP Area</Link>
                  </li>
                  <li>
                    <Link to="/vip/posts">VIP Posts</Link>
                  </li>
                  <li>
                    <Link to="/vip/products">VIP Products</Link>
                  </li>
                </> 
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
        <hr />
      </nav>

      {/* Error Handling */}
      {error && <ErrorMessage message={error} />}

      {/* Notifications */}
      <Notifications />

      {/* Last Visited Pages */}
      <LastVisitedPages />

      {/* Application Routes */}
      <AppRoutes />
    </>
  );
}
  