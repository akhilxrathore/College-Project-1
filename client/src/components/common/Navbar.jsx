import React from 'react';

export const Navbar = () => {
  return (
    <header style={{ borderBottom: '1px solid #e2e8f0', padding: '1rem 0', backgroundColor: '#fff' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>ShopSphere</h1>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/cart">Cart</a>
          <a href="/login" style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', backgroundColor: '#4f46e5', color: '#fff' }}>Login</a>
        </nav>
      </div>
    </header>
  );
};
