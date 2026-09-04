import React from 'react';
import { ArrowRight, Flame, Clock } from 'lucide-react';
import promoBanner from '../../assets/promo_banner.jpg';

export const PromoBanner = () => {
  return (
    <section style={{ padding: '3rem 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        <div
          style={{
            position: 'relative',
            borderRadius: '1.75rem',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            color: '#ffffff',
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
          }}
        >
          {/* Left Text Block */}
          <div style={{ padding: '3.5rem 3rem', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: '#f59e0b',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              <Flame size={16} /> Exclusive Flash Event
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              Mega Season Sale <br />
              <span style={{ color: 'var(--accent-500)' }}>Up to 50% OFF</span>
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#cbd5e1',
                marginBottom: '2rem',
                maxWidth: '480px',
              }}
            >
              Upgrade your tech setup & wardrobe with our biggest discount of the season. Offer valid while stocks last!
            </p>

            {/* Countdown Blocks */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.25rem' }}>
              {[
                { label: 'Days', val: '02' },
                { label: 'Hours', val: '14' },
                { label: 'Mins', val: '35' },
                { label: 'Secs', val: '40' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.65rem 1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    minWidth: '60px',
                  }}
                >
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>{item.val}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>{item.label}</div>
                </div>
              ))}
            </div>

            <a href="#shop" className="btn btn-accent" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
              <span>Claim Discount Now</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Right Image Banner Block */}
          <div style={{ position: 'relative', height: '100%', minHeight: '320px', overflow: 'hidden' }}>
            <img
              src={promoBanner}
              alt="Promotional Banner Offer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
