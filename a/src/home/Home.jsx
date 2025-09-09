import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setData(res.data); 
    });
  }, []);

  return (
    <div className="home">
      <h1 className="home-title">Welcome Home 🎉</h1>
      <p className="home-subtitle">Select Men, Women or Cart from the navbar.</p>

      <div className="product-grid">
        {data.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`} className="product-card">
            <img src={item.images[0]} alt={item.name} className="product-image" />
            <h3 className="product-name">{item.name}</h3>
            <p className="product-brand">{item.brand}</p>
            <p className="product-price">${item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
