import React from 'react';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
