import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../registrationpage/loginpages/Logincontext";
import "./index.css";
import { LogIn, LogOut, LucideListOrdered, ShoppingCart } from "lucide-react";

export default function Index() {
  const { user, logout, cart } = useContext(Context);
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        
        <NavLink to="/cart" className="nav-link cart-link">
          <div style={{ position: "relative", display: "inline-block" }}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/order" className="nav-link">
          <LucideListOrdered size={18} />
        </NavLink>

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
