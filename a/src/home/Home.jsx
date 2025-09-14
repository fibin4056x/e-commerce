import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
 import { Context as Logincontext } from "../registrationpage/loginpages/Logincontext";
 import { WishlistContext } from "../registrationpage/wishlisht/wishlistcontext";
import { Search } from "lucide-react";

export default function Home() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchterm, setSearchTerm] = useState("");

  const { user } = useContext(Logincontext);
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useContext(WishlistContext);

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setData(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchterm]);

  useEffect(() => {
    if (user) {
      fetchWishlist(); 
    }
  }, [user]);

  const handleSearch = () => {
    if (searchterm.trim() === "") {
      setFiltered(data);
    } else {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(searchterm.toLowerCase())
      );
      setFiltered(results);
    }
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    let sortedData = [...filtered];

    if (sortBy === "lowtohigh") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "hightolow") {
      sortedData.sort((a, b) => b.price - a.price);
    } else {
      sortedData = [...data];
    }

    setFiltered(sortedData);
  };

  const toggleWishlist = (product) => {
    if (!user) {
      alert("Please login to add item to wishlist");
      return;
    }

    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      // Remove from wishlist
      const itemInWishlist = wishlist.find((w) => w.id === product.id);
      removeFromWishlist(itemInWishlist.id);
    } else {
      // Add to wishlist
      addToWishlist(product);
    }
  };

  const isInWishlist = (product) => wishlist.some((item) => item.id === product.id);

  return (
    <div className="home">
      <h1 className="home-title">Welcome Home {user?.username}</h1>

      <img
        src="https://i.pinimg.com/736x/86/70/5e/86705e31d09fb8218a6fb9b4c3cc9bf6.jpg"
        alt="shoes"
        className="home-banner"
      />

      <p className="home-subtitle">Select Men, Women or Cart from the navbar.</p>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            value={searchterm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
          />
          <button onClick={handleSearch}>
            <Search size={14} />
          </button>
        </div>

        <select name="sort" id="sort" className="sort-dropdown" onChange={handleSort}>
          <option value="">Sort By Price</option>
          <option value="lowtohigh">Low to High</option>
          <option value="hightolow">High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item.id} className="product-card">
              <button
                className={`wishlist-button ${isInWishlist(item) ? "active" : ""}`}
                onClick={() => toggleWishlist(item)}
              >
                {isInWishlist(item) ? "♥" : "♡"}
              </button>

              <Link to={`/product/${item.id}`} className="product-card-link">
                <img src={item.images[0]} alt={item.name} className="product-image" />
                <h3 className="product-name">{item.name}</h3>
                <p className="product-brand">{item.brand}</p>
                <p className="product-price">${item.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  );
}
