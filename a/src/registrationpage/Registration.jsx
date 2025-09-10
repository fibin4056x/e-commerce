import './registration.css';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Registration() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [show, setshow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (username === '' || password === '') {
      toast.warning("please fill the columns");
      return;
    }
    if (/^[a-zA-Z]{5,}$/.test(username) && /^\d{6}$/.test(password)) {
      try {
        const res = await axios.post('http://localhost:3000/user', {
          username,
          password,
        });

        console.log(res.data);

        setusername('');
        setpassword('');

        toast.warning("Registration successful! Please login.");
        navigate('/login');
      } catch (err) {
        console.error(err);
       toast.warning("Something went wrong while registering.");
      }
    } else {
      toast.warning("Username must be at least 5 letters and password must be exactly 8 numbers");
    }
  };

  return (
    <div>
      <form className="Login" onSubmit={handleSubmit}>
        <label className="user">
          <p>username</p>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </label>

        <p>password</p>
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
            {show ? <Eye size={10} /> : <EyeOff size={10} />}
          </button>
        </label>

        <div className="submit">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
