import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./RemoveProduct.css"; 

export default function RemoveProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      toast.success("Product removed successfully");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove product");
    }
  };

  return (
    <div className="remove-product">
      <h2 className="remove-title">Remove Product</h2>
      {products.length === 0 ? (
        <p className="no-products">No products available</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <span className="product-name">{product.name}</span>
              <span className="product-price">₹{product.price}</span>
              <button
                onClick={() => handleDelete(product.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
