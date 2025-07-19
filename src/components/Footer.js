import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-1">🎬 MovieApp &copy; {new Date().getFullYear()} - All Rights Reserved</p>
        <p className="small mb-0">Built with ❤️ by Movie Lovers</p>
      </div>
    </footer>
  );
}