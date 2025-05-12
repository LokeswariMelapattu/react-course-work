/**
 * AppRoutes component defines the routing structure for the application.
 * It uses react-router-dom for routing and react-redux for state management.
 * Only logged-in users (VIPs) have access to the VIPArea and Posts components.
 * Routes:
 * - "/" renders the Home component.
 * - "/about" renders the About component.
 * - "/register" renders the Register component.
 * - "/login" renders the Login component.
 * - "/vip" renders the VIPArea component if the user is logged in, otherwise redirects to the Login component.
 *   - "/vip/posts" renders the Posts component if the user is logged in, otherwise redirects to the Login component.
 * - "*" renders the NotFound component for any undefined routes.
 * 
 * The VIP routes are nested under the VIPArea route. The route 
 *  /vip/posts must be nested inside 
 *  /vip. 
 * See: https://reactrouter.com/start/library/routing. 
 * 
 * @component
 */

// TODO: Add the necessary imports for the React Router components
  
  import { Routes, Route, Navigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import Home from "./components/Home";
  import About from "./components/About";
  import NotFound from "./components/NotFound";
  import Register from "./components/Register";
  import Login from "./components/Login";
  import VIPArea from "./components/VIPArea";
  import Posts from "./components/Posts";
  
  export default function AppRoutes() {
    const user = useSelector((state) => state.user); // Check if user is logged in
  
    const isAuthenticated = !!user; // Boolean for authentication status
  console.log(isAuthenticated);
    return ( 
      <Routes>
        {/** TODO: use the code from the earlier exercise and modify it accoding to the instructions below:

    Set Up Route Management
        Wrap all routes inside a Routes component to define different paths.

    Define Basic Routes

    Handle Protected Routes
        - Use conditional rendering to restrict access to certain routes.
        - If a user is authenticated, render the protected component (e.g., VIPArea).
        - If not authenticated, redirect them to the login page using a navigation component like Navigate.
        - Use the user state to check authentication status.

    Implement Nested Routes
        - Structure routes hierarchically by placing child routes inside a parent route.
        - Ensure child routes inherit authentication conditions from the parent when necessary.
        - Protect both parent and child routes separately to ensure proper redirection.


    Create a Catch-All Route
        - Define a wildcard route ("*") to handle non-existent pages.
      
    */}
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/vip" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/vip" />}
        />
  
        {/* Protected VIP Routes */}
        <Route
          path="/vip"
          element={isAuthenticated ? <VIPArea /> : <Navigate to="/login" />}
        >
          <Route path="posts" element={<Posts />} />
        </Route>
  
        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
   
