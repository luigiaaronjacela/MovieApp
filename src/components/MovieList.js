import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css'; // make sure to include spinner CSS here
import runningLoader from '../assets/running-loader.gif'

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api-movieapp.onrender.com/movies/getMovies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch movies");
        setLoading(false);
      });
  }, []);

if (loading) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <img src={runningLoader} alt="Loading..." style={{ width: '150px' }} />
      <h5 className="text-secondary mt-3">Loading movies...</h5>
    </div>
  );
}

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Movie List</h2>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 mb-3" key={movie._id}>
            <div className="card h-100 shadow-sm">
              {movie.image && (
                <img
                  src={`https://api-movieapp.onrender.com/uploads/${movie.image}`}
                  alt={movie.title}
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5>{movie.title}</h5>
                <p className="flex-grow-1">{movie.genre}</p>
                <Link to={`/movie/${movie._id}`} className="btn btn-outline-primary mt-auto">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}