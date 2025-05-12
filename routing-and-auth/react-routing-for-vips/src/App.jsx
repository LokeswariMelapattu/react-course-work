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


// TODO: Add the necessary imports for the React Router components
 
import { Link, useLocation, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LastVisitedPages from "./components/LastVisitedPages";
import ErrorMessage from "./components/ErrorMessage";
import AppRoutes from "./AppRoutes";

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
  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch({ type: "TRACK_PAGE", payload: location.pathname });
  }, [location, dispatch]);

  return (
    <>
      <Navigation user={user} dispatch={dispatch} />
      {error && <ErrorMessage message={error} />}
      <LastVisitedPages />
      <AppRoutes />
    </>
  );
}

function Navigation({ user, dispatch }) {
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch an action to log the user out
  };
/* {/* Use the code from earlier exercise , and modify the React Router navigation links: *
      Create a Navigation Component -  define a navigation (nav) element to contain the links.
   
      Utilize the Link component, maker sure that the correct paths are assigned to each Link.

      Handle User Authentication State - retrieve the user state from Redux store
      Conditionally render links based on whether the user is authenticated.

      Display Public and Private Links
          - If no user is logged in, show links to the Register and Login pages.
          - If a user is logged in, display links to VIP pages.

      Implement Logout Functionality
        - Include a logout button that dispatches a logout action to clear the user state.
        - Ensure the logout button is only shown when a user is authenticated.
    
      Ensure Proper Formatting
        - Use fragments (<>...</>) when conditionally rendering multiple elements inside JSX.
        - Separate navigation items with a separator (|) for better readability.
      */
  return (
    <nav>
      <ul>
        {/* Public Links */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        {/* Conditional Links for Authentication */}
        {!user ? (
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
            <li>
              <Link to="/vip">VIP Area</Link>
            </li>
            <li>
              <Link to="/vip/posts">VIP Posts</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
      <hr />
    </nav>
  );
}
  