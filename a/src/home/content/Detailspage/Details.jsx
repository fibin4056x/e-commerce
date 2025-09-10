import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import "./Details.css";
import { Context } from "../../../registrationpage/loginpages/Logincontext";
import { toast } from "react-toastify";

function Details() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const { addtocart, user } = useContext(Context);  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handlecart = () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    addtocart(data);
toast.success(" your item added to cart")
  };

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <div className="details-left">
        <img src={data.images[0]} alt={data.name} className="details-image" />
        {data.images.length > 1 && (
          <div className="details-thumbnails">
            {data.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className="details-thumb"
              />
            ))}
          </div>
        )}
      </div>

      <div className="details-right">
        <h1 className="details-title">{data.name}</h1>
        <p className="details-brand">{data.brand}</p>
        <p className="details-price">${data.price}</p>
        {data.discount > 0 && (
          <p className="details-discount">Discount: {data.discount}% OFF</p>
        )}
        <p className="details-description">{data.description}</p>

        <div className="details-sizes">
          <strong>Sizes: </strong>
          {data.sizes.map((size, index) => (
            <button key={index} className="size-btn">
              {size}
            </button>
          ))}
        </div>

        <div className="details-colors">
          <strong>Colors: </strong>
          {data.colors.map((color, index) => (
            <span
              key={index}
              className="color-circle"
              style={{ backgroundColor: color.toLowerCase() }}
            ></span>
          ))}
        </div>

        <button className="add-to-cart" onClick={handlecart}>
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default Details;
