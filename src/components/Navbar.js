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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">🎬 MovieApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/">Home</Link>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <Link className="btn btn-warning btn-md px-3 py-2 fw-semibold" to="/add-movie">+ Add Movie</Link>
              </li>
            )}

            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="btn btn-danger btn-md px-3 py-2 fw-semibold"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-md px-3 py-2 fw-semibold" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-md px-3 py-2 fw-semibold" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}