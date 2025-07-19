import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components and Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMovieForm from "./components/AddMovieForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function AppContent() {
  const location = useLocation();

  // Determine if the current page should be fullscreen
  const isFullScreenPage = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Conditional layout: fullscreen or container */}
      <div className={`flex-grow-1 ${isFullScreenPage ? '' : 'container mt-4'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-list" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;