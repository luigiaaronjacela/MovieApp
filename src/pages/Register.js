import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../toast';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api-movieapp.onrender.com/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        notyf.success("Registration successful!");
        navigate("/login");
      } else {
        const data = await res.json();
        notyf.error(data.message || "Registration failed.");
      }
    } catch (err) {
      notyf.error("Network error.");
    }
  };

  return (
   <div className="container d-flex justify-content-center align-items-center px-3" style={{ minHeight: '100vh' }}>
  <div className="w-100" style={{ maxWidth: '500px' }}>
    <div className="card shadow p-4">
          <h3 className="text-center mb-3">Register</h3>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Username"
              className="form-control mb-3"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <input
              name="email"
              placeholder="Email"
              className="form-control mb-3"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}