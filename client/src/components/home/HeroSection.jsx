import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, ShieldCheck, Sparkles, Star } from 'lucide-react';
import heroShowcase from '../../assets/hero_showcase.jpg';

export const HeroSection = () => {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        padding: '4rem 0 5rem 0',
        overflow: 'hidden',
        borderBottom: '1px solid var(--neutral-200)',
      }}
    >
      {/* Background Decorative Blur Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Text Content Column */}
          <div className="animate-fade-in">
            {/* Top Pill */}
            <div
              className="badge badge-primary"
              style={{ marginBottom: '1.25rem', padding: '0.4rem 1rem', fontSize: '0.8rem', gap: '0.4rem' }}
            >
              <Sparkles size={14} /> Next-Gen E-Commerce Experience
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--neutral-900)',
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
              }}
            >
              Everything You Need, <br />
              <span style={{ background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                All in One Place
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--neutral-700)',
                lineHeight: 1.6,
                marginBottom: '2.25rem',
                maxWidth: '540px',
              }}
            >
              Discover curated collections of trending tech gadgets, premium fashion, lifestyle essentials, and more with lightning-fast delivery and top-rated customer service.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <Link to="/shop" className="btn btn-primary" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
                <span>Shop Now</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/shop" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                <span>Explore Products</span>
              </Link>
            </div>


            {/* Social Proof Stats */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--neutral-200)',
              }}
            >
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)' }}>50K+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-700)' }}>Happy Customers</div>
              </div>
              <div style={{ width: '1px', height: '2.5rem', backgroundColor: 'var(--neutral-200)' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  4.9 <Star size={18} fill="#f59e0b" color="#f59e0b" />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-700)' }}>Top Product Rating</div>
              </div>
              <div style={{ width: '1px', height: '2.5rem', backgroundColor: 'var(--neutral-200)' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)' }}>24/7</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-700)' }}>Live Support</div>
              </div>
            </div>
          </div>

          {/* Visual Product Showcase Column */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
                border: '4px solid #ffffff',
              }}
            >
              <img
                src={heroShowcase}
                alt="ShopSphere E-Commerce Product Showcase"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Glass Stats Badge 1 */}
            <div
              className="glass-card hover-lift"
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '-1.5rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#d1fae5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-900)' }}>100% Authentic</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neutral-700)' }}>Guaranteed Quality</div>
              </div>
            </div>

            {/* Floating Glass Stats Badge 2 */}
            <div
              className="glass-card hover-lift"
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '-1rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#e0e7ff',
                  color: 'var(--primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingCart size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-900)' }}>Flash Deal Active</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)', fontWeight: 600 }}>Up to 40% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
