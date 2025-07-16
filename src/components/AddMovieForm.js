import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../toast';

export default function AddMovieForm() {
  const [form, setForm] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    if (!isAdmin) {
      notyf.error('Access Denied. Admins Only.');
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      const res = await fetch('http://localhost:4000/movies/addMovie', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        notyf.success('Movie added successfully!');
        navigate('/');
      } else {
        notyf.error(data.message || 'Failed to add movie.');
      }
    } catch (err) {
      notyf.error('Network error.');
    }
  };

  return (
<div className="container d-flex justify-content-center align-items-center px-3" style={{ minHeight: '100vh' }}>
  <div className="w-100" style={{ maxWidth: '500px' }}>
    <div className="card shadow p-4">
          <h3 className="text-center mb-4">Add Movie</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input name="title" onChange={handleChange} placeholder="Title" className="form-control mb-3" required />
            <input name="director" onChange={handleChange} placeholder="Director" className="form-control mb-3" required />
            <input name="year" onChange={handleChange} placeholder="Year" type="number" className="form-control mb-3" required />
            <input name="genre" onChange={handleChange} placeholder="Genre" className="form-control mb-3" required />
            <textarea name="description" onChange={handleChange} placeholder="Description" className="form-control mb-3" rows="3" required />
            <input name="image" type="file" accept="image/*" onChange={handleChange} className="form-control mb-3" required />

            {preview && (
              <img src={preview} alt="Preview" className="img-thumbnail mb-3" style={{ height: '250px', objectFit: 'cover' }} />
            )}

            <button className="btn btn-primary w-100">Add Movie</button>
          </form>
        </div>
      </div>
    </div>
  );
}