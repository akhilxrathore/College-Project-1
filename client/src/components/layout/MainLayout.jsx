import React from 'react';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { useCart } from '../../hooks/useCart';
import { CheckCircle } from 'lucide-react';

export const MainLayout = ({ children }) => {
  const { notification } = useCart();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      {/* Floating Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            backgroundColor: 'var(--neutral-900)',
            color: '#ffffff',
            padding: '0.85rem 1.35rem',
            borderRadius: '0.75rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            border: '1px solid #334155',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <CheckCircle size={20} color="#10b981" />
          <span>{notification}</span>
        </div>
      )}

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};
