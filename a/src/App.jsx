import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./registrationpage/loginpages/Login";
import Registration from "./registrationpage/Registration";
import Index from "./home";
import Men from "./home/content/catagory/Men";
import Women from "./home/content/catagory/Women";
import Cart from "./home/content/cartpages/Cart";
import Home from "./home/Home";
import Details from "./home/content/Detailspage/Details";

import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";   
import Wishlist from "./registrationpage/wishlisht/wihlist";
import Checkout from "./home/content/checkout/Checkout";
import Order from "./home/content/orderpage/order";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Home />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:id" element={<Details />} />
            <Route path="cart/order" element={<Checkout />} />
            <Route path="order" element={<Order />} />
            <Route path="wishlist" element={<Wishlist />} />
           
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
