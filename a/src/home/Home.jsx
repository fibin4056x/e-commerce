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
  const [zoomStyles, setZoomStyles] = useState({}); 

  const { user } = useContext(Logincontext);
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } =
    useContext(WishlistContext);

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
      const itemInWishlist = wishlist.find((w) => w.id === product.id);
      removeFromWishlist(itemInWishlist.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (product) =>
    wishlist.some((item) => item.id === product.id);

  const handleMouseMove = (e, id) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyles((prev) => ({
      ...prev,
      [id]: {
        transform: `scale(2) translate(-${x - 50}%, -${y - 50}%)`,
        transformOrigin: `${x}% ${y}%`,
      },
    }));
  };

  const resetZoom = (id) => {
    setZoomStyles((prev) => ({
      ...prev,
      [id]: { transform: "scale(1)", transformOrigin: "center center" },
    }));
  };

  return (
    <div className="home">
      <h1 className="home-title">Welcome sole society   Mr.{user?.username}</h1>
      <p className="home-subtitle">
        Discover the latest trends in footwear. Step up your style with our exclusive shoe collection!
      </p>

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

        <select
          name="sort"
          id="sort"
          className="sort-dropdown"
          onChange={handleSort}
        >
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
                className={`wishlist-button ${
                  isInWishlist(item) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(item)}
              >
                {isInWishlist(item) ? "♥" : "♡"}
              </button>

              <Link
                to={`/product/${item.id}`}
                className="product-card-link"
              >
                <div
                  className="product-image-container"
                  onMouseMove={(e) => handleMouseMove(e, item.id)}
                  onMouseLeave={() => resetZoom(item.id)}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="product-image"
                    style={zoomStyles[item.id] || {}}
                  />
                </div>
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
