import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { User, Shield, Calendar, LogOut, Package, ShoppingBag, CheckCircle } from 'lucide-react';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div style={{ backgroundColor: 'var(--neutral-50)', minHeight: 'calc(100vh - 12rem)', padding: '3rem 1rem' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header Banner */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              border: '1px solid var(--neutral-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '4.5rem',
                  height: '4.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-600)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
                  {user?.name || 'User Profile'}
                </h1>
                <p style={{ color: 'var(--neutral-600)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>
                  {user?.email}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: user?.role === 'admin' ? '#fef3c7' : 'rgba(79, 70, 229, 0.1)',
                    color: user?.role === 'admin' ? '#d97706' : 'var(--primary-600)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    marginTop: '0.5rem',
                  }}
                >
                  <Shield size={12} />
                  {user?.role || 'Customer'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.65rem',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>

          {/* Grid Layout for Account Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Account Details Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                padding: '1.75rem',
                border: '1px solid var(--neutral-200)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              }}
            >
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={20} color="var(--primary-600)" />
                <span>Account Information</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', textTransform: 'uppercase', fontWeight: 600 }}>Full Name</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--neutral-900)', margin: '0.1rem 0 0 0' }}>{user?.name}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', textTransform: 'uppercase', fontWeight: 600 }}>Email Address</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--neutral-900)', margin: '0.1rem 0 0 0' }}>{user?.email}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', textTransform: 'uppercase', fontWeight: 600 }}>Member Since</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--neutral-900)', margin: '0.1rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={15} color="var(--neutral-600)" />
                    {formatDate(user?.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                padding: '1.75rem',
                border: '1px solid var(--neutral-200)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={20} color="var(--primary-600)" />
                  <span>My Activity</span>
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  View your recent order history, track shipments, and reorder your favorite items easily.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                  to="/orders"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--neutral-50)',
                    borderRadius: '0.65rem',
                    border: '1px solid var(--neutral-200)',
                    color: 'var(--neutral-800)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Package size={18} color="var(--primary-600)" />
                    Order History
                  </span>
                  <CheckCircle size={16} color="#10b981" />
                </Link>

                <Link
                  to="/shop"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--primary-600)',
                    borderRadius: '0.65rem',
                    color: '#ffffff',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Browse Shop</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
