import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/movies/getMovies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch(() => alert("Failed to fetch movies"));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Movie List</h2>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 mb-3" key={movie._id}>
            <div className="card h-100 shadow-sm">
              {movie.image && (
                <img
                  src={`http://localhost:4000/uploads/${movie.image}`}
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