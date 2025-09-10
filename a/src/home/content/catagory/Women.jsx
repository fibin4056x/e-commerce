import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './women.css'; 
export default function Women() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => {
        setFilteredProducts(
          res.data.filter(item => item.category.toLowerCase() === 'women')
        );
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="women-container">
      <h2 className="women-title">Women Products</h2>
      {filteredProducts.length === 0 ? (
        <p className="no-products">No products</p>
      ) : (
        <div className="women-grid">
          {filteredProducts.map((item) => (
            <Link key={item.id}to={ `/product/${item.id}`} className="product-card">
              <img
                src={item.images?.[0] || "placeholder.jpg"}
                alt={item.name}
                className="product-image"
              />
              <h3 className="product-name">{item.name}</h3>
              <p className="product-brand">{item.brand}</p>
              <p className="product-price">${item.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
