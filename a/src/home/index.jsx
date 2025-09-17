import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../registrationpage/loginpages/Logincontext";
import "./index.css";
import { LogIn, LogOut, LucideListOrdered, ShoppingCart, Heart, Menu } from "lucide-react";
import { WishlistContext } from "../registrationpage/wishlisht/wishlistcontext";
import { OrderContext } from "./content/orderpage/ordercontext";

export default function Index() {
  const { wishlist } = useContext(WishlistContext);
  const { user, logout, cart } = useContext(Context);
  const { Order } = useContext(OrderContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderCount = Order.length;
  const wish = wishlist.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutModal(false);
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/men" className="nav-link" onClick={handleLinkClick}>Men</NavLink>
          <NavLink to="/women" className="nav-link" onClick={handleLinkClick}>Women</NavLink>

          <NavLink to="/cart" className="nav-link" onClick={handleLinkClick}>
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

          <NavLink to="/order" className="nav-link" onClick={handleLinkClick}>
            <LucideListOrdered size={18} />
            {orderCount > 0 && <span className="order-badge">{orderCount}</span>}
          </NavLink>

          <NavLink to="/wishlist" className="nav-link" onClick={handleLinkClick}>
            <Heart size={18} />
            {wish > 0 && <span className="wish-badge">{wish}</span>}
          </NavLink>

          <div className="nav-right">
            {user && user.username ? (
              <>
                <span className="nav-user">Hi, {user.username}</span>
                <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
                  <LogOut size={10} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link" onClick={handleLinkClick}>
                <LogIn size={10} style={{ marginRight: "5px" }} /> Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
