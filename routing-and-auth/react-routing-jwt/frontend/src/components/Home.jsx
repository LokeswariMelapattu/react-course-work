/**
 * Home component renders the home page with navigation links to register and login pages.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 *
 * @returns {JSX.Element} The rendered Home component.
 */

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        The shortest route takes us to Home, other route takes us to the {user && user.role !== "guest" ? <Link to="/vip" className="nav-link">VIP Area</Link> : <Link to="/login" className="nav-link"> login</Link>}.
      </p>
    </div>
  );
}
