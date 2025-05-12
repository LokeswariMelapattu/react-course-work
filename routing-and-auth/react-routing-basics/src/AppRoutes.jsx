/**
 * AppRoutes component defines the routing structure for the application.
 * It uses react-router-dom for routing and react-redux for state management. You need to create the import for the React Router components you need.
 * 
 * Routes:
 * - "/" renders the Home component.
 * - "/about" renders the About component.
 * - "/posts" renders the Posts component.
 * - "*" renders the NotFound component for any undefined routes.
 * 
 * See: https://reactrouter.com/start/library/routing. 
 * 
 * @component
 */



// TODO: Add the necessary imports for the React Router components
import { Routes, Route, Navigate } from "react-router-dom"; 
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Posts from "./components/Posts";

export default function AppRoutes() {
 
  return (
    <Routes>
      {/* Route for the Home component */}
      <Route path="/" element={<Home />} />

      {/* Route for the About component */}
      <Route path="/about" element={<About />} />

      {/* Route for the Posts component */}
      <Route path="/posts" element= {<Posts />}  />

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
