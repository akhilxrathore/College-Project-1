import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-header" style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--neutral-200)' }}>
      {/* Top Banner Announcement */}
      <div style={{ backgroundColor: 'var(--neutral-900)', color: '#ffffff', fontSize: '0.8rem', fontWeight: 600, padding: '0.4rem 0', textAlign: 'center' }}>
        <span style={{ color: 'var(--accent-500)', marginRight: '0.5rem' }}>✨ Mega Launch Sale:</span> Get Free Express Shipping on orders over $50! Use code <span style={{ color: '#f59e0b', textDecoration: 'underline' }}>SPHERE50</span>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem', gap: '1.5rem' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', shrink: 0 }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.6rem', backgroundColor: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}>
            <ShoppingBag size={20} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--neutral-900)', letterSpacing: '-0.03em' }}>
            Shop<span style={{ color: 'var(--primary-600)' }}>Sphere</span>
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="desktop-search" style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 2.5rem 0.6rem 1rem',
              borderRadius: '9999px',
              border: '1px solid var(--neutral-300)',
              backgroundColor: 'var(--neutral-50)',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
          <button type="submit" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-700)' }}>
            <Search size={16} />
          </button>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <Link to="/" style={{ fontWeight: isActive('/') ? 700 : 500, fontSize: '0.95rem', color: isActive('/') ? 'var(--primary-600)' : 'var(--neutral-700)' }}>Home</Link>
          <Link to="/shop" style={{ fontWeight: isActive('/shop') ? 700 : 500, fontSize: '0.95rem', color: isActive('/shop') ? 'var(--primary-600)' : 'var(--neutral-700)' }}>Shop</Link>
          <Link to="/shop?category=Electronics" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--neutral-700)' }}>Electronics</Link>
          <Link to="/shop?category=Fashion" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--neutral-700)' }}>Fashion</Link>
        </nav>

        {/* Action Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Cart Icon with Counter */}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--neutral-100)',
              color: 'var(--neutral-800)',
              transition: 'all 0.2s ease',
            }}
            title="View Shopping Cart"
          >
            <ShoppingCart size={19} />
            {totalCartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--primary-600)',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(79, 70, 229, 0.4)',
                }}
              >
                {totalCartCount}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.55rem 1.15rem', fontSize: '0.875rem' }}>
            <User size={16} />
            <span>Login</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{ display: 'none', color: 'var(--neutral-800)', padding: '0.4rem' }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--neutral-200)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 2.5rem 0.6rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--neutral-300)',
                fontSize: '0.9rem',
              }}
            />
            <button type="submit" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
              <Search size={16} />
            </button>
          </form>

          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: 'var(--primary-600)' }}>Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--neutral-700)' }}>Shop All</Link>
          <Link to="/shop?category=Electronics" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--neutral-700)' }}>Electronics</Link>
          <Link to="/shop?category=Fashion" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--neutral-700)' }}>Fashion</Link>
          <Link to="/shop?category=Home%20%26%20Living" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--neutral-700)' }}>Home & Living</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-search {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
