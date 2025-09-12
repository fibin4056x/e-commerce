import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './men.css'; 
import { Link } from 'react-router-dom';

export default function Men() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((res) => {
        setFilteredProducts(res.data.filter(item => item.category === "Men"));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="men-container">
      <h2 className="men-title">Men Products</h2>
 <div>
        <select name="sort" id="sort" className="sort-dropdown" onChange={(e)=>{
          const sortBy=e.target.value;
          let sortedData=[...filteredProducts]; 
          if(sortBy==="lowtohigh"){
            sortedData.sort((a,b)=>a.price-b.price)
          } 

          else if(sortBy==="hightolow"){
            sortedData.sort((a,b)=>b.price-a.price)
          }else{
            sortedData=[...filteredProducts]
          }
          setFilteredProducts(sortedData)
        }
        }>
          <option value="">Sort By Price</option>
          <option value="lowtohigh">Low to High</option>    
          <option value="hightolow">High to Low</option>
        </select>
        </div>
      {filteredProducts.length === 0 ? (
        <p className="no-products">No products</p>
      ) : (
        <div className="men-grid">
          {filteredProducts.map((item) => (
            <Link key={item.id} to={ `/product/${item.id}`} className="product-card">
              <img
                src={item.images?.[0] || 'placeholder.jpg'}
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
