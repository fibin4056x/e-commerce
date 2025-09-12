import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../registrationpage/loginpages/Logincontext";
import "./index.css";
import {LogIn,LogOut} from "lucide-react"
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
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/men" className="nav-link">Men</NavLink>
        <NavLink to="/women" className="nav-link">Women</NavLink>
        
        <NavLink to="/cart" className="nav-link">Cart</NavLink>

        <div className="nav-right">
          {user && user.username ? (
     
            <>
              <span className="nav-user">Hi, {user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (

            <Link to="/login" className="nav-link">
                 
        <LogIn size={18} style={{ marginRight: "5px" }} />
        Login
 
            </Link>
          )}
        </div>
      </nav>

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
