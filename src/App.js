import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMovieForm from "./components/AddMovieForm";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/add-movie" element={isAdmin ? <AddMovieForm /> : <Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;