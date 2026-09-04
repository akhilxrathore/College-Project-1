import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';

export const HomePage = () => {
  return (
    <MainLayout>
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#1e293b' }}>
          Welcome to <span style={{ color: '#4f46e5' }}>ShopSphere</span>
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Modern, full-stack e-commerce architecture built with MERN (MongoDB, Express, React, Node.js).
        </p>
      </div>
    </MainLayout>
  );
};
