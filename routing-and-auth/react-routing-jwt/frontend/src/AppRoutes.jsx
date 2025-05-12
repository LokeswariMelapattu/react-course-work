/**
 * AppRoutes component defines the routing structure for the application.
 * It uses react-router-dom for routing and react-redux for state management.
 * 
 * Routes:
 * - "/" renders the Home component.
 * - "/about" renders the About component.
 * - "/register" renders the Register component.
 * - "/login" renders the Login component.
 * - "/vip" renders the VIPArea component if the user is logged in, otherwise redirects to the Login component.
 *   - "/vip/posts" renders the Posts component if the user is logged in, otherwise redirects to the Login component.
 *  - "/vip/products" renders the Products component if the user is logged in, otherwise redirects to the Login component.
 * - "*" renders the NotFound component for any undefined routes.
 * 
 * The VIP routes are nested under the VIPArea route. The route 
 *  /vip/posts must be nested inside 
 *  /vip. 
 * See: https://reactrouter.com/start/library/routing. 
 * 
 * @component
 */

// TODO: Import the necessary React Router components
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import VIPArea from "./components/VIPArea";
import Posts from "./components/Posts";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import ProductCreator from "./components/ProductCreator";
import ProductModify from "./components/ProductModify";

export default function AppRoutes() {
  const user = useSelector((state) => state.auth?.user); // Access user from Redux store
  const userRole = user?.role || "guest"; // Default role is "guest" if user is null
  const isAuthenticated = !!user; // Check if the user is logged in
  
  return (
    <Routes>
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
        element={isAuthenticated && userRole != "guest" ? <VIPArea /> : <Navigate to="/login" />}
      >
        {/* Nested VIP Routes */}
        <Route path="posts" element={<Posts />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductCreator />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/:id/modify" element={<ProductModify />} />
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
