import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { notyf } from '../toast';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    description: '',
    image: null,
    comment: ''
  });
  const [preview, setPreview] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);

  const token = localStorage.getItem('token');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  const fetchComments = async () => {
    try {
      const res = await fetch(`https://api-movieapp.onrender.com/comments/getComments/${id}`);
      const data = await res.json();
      setComments(data);
    } catch {
      notyf.error('Failed to load comments');
    }
  };

  useEffect(() => {
    fetch(`https://api-movieapp.onrender.com/movies/getMovie/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setForm({
          title: data.title,
          director: data.director,
          year: data.year,
          genre: data.genre,
          description: data.description,
          image: null,
          comment: ''
        });
        setPreview(`https://api-movieapp.onrender.com/uploads/${data.image}`);
        fetchComments();
      })
      .catch(() => notyf.error("Movie not found"));
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('director', form.director);
    formData.append('year', form.year);
    formData.append('genre', form.genre);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    try {
      const res = await fetch(`https://api-movieapp.onrender.com/movies/updateMovie/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        notyf.success('Movie updated');
        setMovie(data.movie);
        setEditMode(false);
      } else {
        notyf.error(data.message || 'Update failed');
      }
    } catch {
      notyf.error('Network error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this movie?')) return;

    try {
      const res = await fetch(`https://api-movieapp.onrender.com/movies/deleteMovie/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        notyf.success('Movie deleted');
        navigate('/');
      } else {
        notyf.error(data.message || 'Delete failed');
      }
    } catch {
      notyf.error('Network error');
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const res = await fetch(`https://api-movieapp.onrender.com/comments/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ movieId: id, text: form.comment })
      });

      const data = await res.json();
      if (res.ok) {
        notyf.success('Comment added');
        setForm({ ...form, comment: '' });
        setComments(prev => [...prev, data]);
        setRating(0);
      } else {
        notyf.error(data.message || 'Failed to add comment');
      }
    } catch {
      notyf.error('Network error');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      const res = await fetch(`https://api-movieapp.onrender.com/comments/deleteComment/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        notyf.success('Comment deleted');
        setComments(comments.filter(c => c._id !== commentId));
      } else {
        notyf.error(data.message || 'Failed to delete');
      }
    } catch {
      notyf.error('Network error');
    }
  };

  if (!movie) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-start gap-4 flex-wrap">
  <img
    src={preview}
    alt={movie.title}
    style={{ height: '250px', objectFit: 'cover' }}
    className="img-thumbnail w-100 w-md-auto"
  />
  <div>
    <h3>{movie.title}</h3>
    <p><strong>Director:</strong> {movie.director}</p>
    <p><strong>Genre:</strong> {movie.genre}</p>
    <p><strong>Year:</strong> {movie.year}</p>
    <p>{movie.description}</p>
  </div>
</div>

      {isAdmin && !editMode && (
        <div className="mt-3">
          <button className="btn btn-warning me-2" onClick={() => setEditMode(true)}>✏️ Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>🗑 Delete</button>
        </div>
      )}

      {isAdmin && editMode && (
        <div className="mt-4">
          <h5>Edit Movie</h5>
          <input name="title" value={form.title} onChange={handleChange} className="form-control mb-2" placeholder="Title" />
          <input name="director" value={form.director} onChange={handleChange} className="form-control mb-2" placeholder="Director" />
          <input name="year" value={form.year} onChange={handleChange} className="form-control mb-2" type="number" />
          <input name="genre" value={form.genre} onChange={handleChange} className="form-control mb-2" placeholder="Genre" />
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control mb-2" rows="3" placeholder="Description" />
          <input name="image" type="file" accept="image/*" className="form-control mb-2" onChange={handleChange} />
          <button className="btn btn-success me-2" onClick={handleUpdate}>✅ Save</button>
          <button className="btn btn-secondary" onClick={() => setEditMode(false)}>❌ Cancel</button>
        </div>
      )}

      <hr />
      <h4 className="mt-4">Reviews</h4>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((c) => (
        <div key={c._id} className="card p-3 mb-3 shadow-sm">
          <div className="d-flex justify-content-between">
            <div>
              <strong>{c.user?.username || "Anonymous"}</strong>
              <p className="mt-2 mb-1">{c.text}</p>
              <small className="text-muted">{new Date(c.createdAt).toLocaleDateString()}</small>
            </div>
            {isAdmin && (
              <button onClick={() => handleDeleteComment(c._id)} className="btn btn-sm btn-outline-danger">🗑</button>
            )}
          </div>
        </div>
      ))}

     {token ? (
  <div className="mt-4">
    <h5>Leave a Review</h5>
    <div className="mb-2">
      {[1, 2, 3, 4, 5].map(r => (
        <span
          key={r}
          onClick={() => setRating(r)}
          style={{ fontSize: "1.5rem", cursor: "pointer", color: r <= rating ? "#ffc107" : "#ccc" }}
        >⭐</span>
      ))}
    </div>
    <textarea
      className="form-control mb-2"
      rows="3"
      name="comment"
      value={form.comment}
      onChange={handleChange}
      placeholder="Write your thoughts..."
    />
    <button className="btn btn-primary" onClick={handleCommentSubmit}>Submit</button>
  </div>
) : (
  <div className="mt-4">
    <h5>Leave a Review</h5>
    <p className="text-muted">You must be logged in to leave a comment.</p>
    <a href="/login" className="btn btn-outline-primary">Login to Comment</a>
  </div>
)}
    </div>
  );
}