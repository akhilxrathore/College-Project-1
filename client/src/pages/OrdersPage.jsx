import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Package, ArrowLeft, ShoppingBag } from 'lucide-react';

export const OrdersPage = () => {
  return (
    <MainLayout>
      <div style={{ backgroundColor: 'var(--neutral-50)', minHeight: 'calc(100vh - 12rem)', padding: '3rem 1rem' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Breadcrumb / Navigation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <Link
              to="/profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--neutral-600)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Profile</span>
            </Link>
          </div>

          {/* Page Header */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              border: '1px solid var(--neutral-200)',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(79, 70, 229, 0.1)',
                  color: 'var(--primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Package size={28} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neutral-900)', margin: 0 }}>
                  My Orders
                </h1>
                <p style={{ color: 'var(--neutral-600)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Track, return, or view details of your recent purchases.
                </p>
              </div>
            </div>
          </div>

          {/* Empty Orders State Placeholder */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              padding: '4rem 2rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              border: '1px solid var(--neutral-200)',
            }}
          >
            <div
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: 'var(--neutral-100)',
                color: 'var(--neutral-400)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <Package size={32} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
              No orders placed yet
            </h2>
            <p style={{ color: 'var(--neutral-600)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
              When you order products from ShopSphere, your invoices and tracking information will appear right here.
            </p>

            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.75rem',
                borderRadius: '0.65rem',
                backgroundColor: 'var(--primary-600)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
              }}
            >
              <ShoppingBag size={18} />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
