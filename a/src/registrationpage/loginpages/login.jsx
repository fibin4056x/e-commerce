import "./login.css";
import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./Logincontext";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { setuser } = useContext(Context);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/user", {
        params: { username, password },
      });

      if (res.data.length > 0) {
        setuser(res.data[0]);
        setusername("");
        setpassword("");

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid username or password. Please register.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while logging in.");
    }
  };

  return (
    <div>
      <form className="Login" onSubmit={handleSubmit}>
        <label className="user">
          <p>Username</p>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </label>

        <p>Password</p>
        <label className="password">
          <input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            className="password"
            type="button"
            onClick={() => setshow(!show)}
          >
            {show ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </label>

        <div className="submit">
          <button type="submit">Login</button>
          <Link to={"/"} className="back-btn">
            Back
          </Link>
          <Link to={"/Registration"} className="submit-button">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
