import React from 'react';

export const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid #e2e8f0', padding: '2rem 0', marginTop: 'auto', backgroundColor: '#0f172a', color: '#cbd5e1' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#94a3b8' }}>Scalable Full-Stack MERN E-Commerce Platform</p>
      </div>
    </footer>
  );
};
