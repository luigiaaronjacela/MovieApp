import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold text-primary" to="/">🎬 MovieApp</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto d-flex align-items-center gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {isAdmin && (
            <li className="nav-item">
              <Link className="btn btn-warning btn-sm" to="/add-movie">Add Movie</Link>
            </li>
          )}

          {isLoggedIn ? (
            <li className="nav-item">
              <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-light btn-sm" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}