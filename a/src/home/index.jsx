import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../registrationpage/loginpages/Logincontext";
import './index.css'

export default function Index() {
  const { user, logout } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/men" className="nav-link">Men</Link>
        <Link to="/women" className="nav-link">Women</Link>
        <Link to="/cart" className="nav-link">Cart</Link>

        <div className="nav-right">
          {user ? (
            <>
              <span className="nav-user">Hi, {user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </nav>

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
