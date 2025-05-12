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
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch({ type: "TRACK_PAGE", payload: location.pathname });
  }, [location, dispatch]);

  return (
    <>
      <nav>
        {/* Navigation links for Home, About, and Posts */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>

      {/* ErrorMessage component to display errors */}
      {error && <ErrorMessage message={error} />}

      {/* LastVisitedPages component */}
      <LastVisitedPages />

      {/* AppRoutes component to render the application's routes */}
      <AppRoutes />
    </>
  );
}
