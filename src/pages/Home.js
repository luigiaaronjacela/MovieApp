import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-movie.jpg'; // Make sure this is a local image
import './Home.css';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api-movieapp.onrender.com/movies/getMovie')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Error fetching movies:', err));
  }, []);

  return (
    <>
      {/* HERO */}
      <div
        className="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative'
        }}
      >
        <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark opacity-50" />
        <div className="z-1 position-relative px-3">
          <h1 className="display-4 fw-bold">🎬 MovieApp</h1>
          <p className="lead">Your Ultimate Movie Library Experience</p>
          <Link to="/movie-list" className="btn btn-primary btn-lg mt-3">Browse Movies</Link>
        </div>
      </div>

      {/* FEATURED MOVIES */}
      <div className="bg-light py-5 px-3">
        <div className="container">
          <h2 className="text-center mb-4">Featured Movies</h2>
          <div className="row">
            {movies.slice(0, 6).map(movie => (
              <div key={movie._id} className="col-12 col-sm-6 col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={`https://api-movieapp.onrender.com/uploads/${movie.image}`}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                    alt={movie.title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5>{movie.title}</h5>
                    <p className="text-muted small">{movie.genre} | {movie.year}</p>
                    <p className="card-text text-truncate">{movie.description}</p>
                    <Link to={`/movie/${movie._id}`} className="btn btn-outline-primary mt-auto">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}