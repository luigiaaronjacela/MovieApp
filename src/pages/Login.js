import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api-movieapp.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin);
        notyf.success("Login successful!");
        navigate("/");
      } else {
        notyf.error(data.message || "Login failed.");
      }
    } catch (err) {
      notyf.error("Network error.");
    }
  };

  return (
   <div className="container d-flex justify-content-center align-items-center px-3" style={{ minHeight: '100vh' }}>
  <div className="w-100" style={{ maxWidth: '500px' }}>
    <div className="card shadow p-4">
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="form-control mb-3"
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="form-control mb-3"
              onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button className="btn btn-success w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}