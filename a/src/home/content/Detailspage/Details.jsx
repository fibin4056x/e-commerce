import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";
import { Context } from "../../../registrationpage/loginpages/Logincontext";
import { toast } from "react-toastify";

function Details() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const { addtocart, user, cart } = useContext(Context);  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handlecart = () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    addtocart(data);
    toast.success("Your item added to cart!");
  };

  const handle = () => {
    navigate("/cart");
  };

  if (!data) return <h2>Loading...</h2>;

  const inCart = cart?.some((item) => item.id === data.id);

  return (
    <div className="details cool-details">
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

        {inCart ? (
          <button className="add-to-cart" onClick={handle}>
            Go to Cart 🛒
          </button>
        ) : (
          <button className="add-to-cart" onClick={handlecart}>
            Add to Cart 🛒
          </button>
        )}
      </div>
    </div>
  );
}

export default Details;
