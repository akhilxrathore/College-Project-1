import React from 'react';
import { Truck, Lock, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast & Free Delivery',
    desc: 'Free express shipping on all orders over $50 with real-time tracking.',
    color: '#4f46e5',
    bg: '#e0e7ff',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    desc: '256-bit SSL encrypted checkout supporting Stripe, PayPal, and Apple Pay.',
    color: '#0d9488',
    bg: '#ccfbf1',
  },
  {
    icon: RotateCcw,
    title: '30-Day Easy Returns',
    desc: 'Hassle-free money-back guarantee with complimentary home pickup.',
    color: '#d97706',
    bg: '#fef3c7',
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated Support',
    desc: 'Our customer care team is available round-the-clock via live chat & email.',
    color: '#8b5cf6',
    bg: '#ede9fe',
  },
];

export const WhyUsSection = () => {
  return (
    <section id="why-us" style={{ padding: '5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--neutral-200)' }}>
      <div className="container">
        {/* Section Title */}
        <div className="section-header">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Our Advantage</div>
          <h2>Why Shop With Us?</h2>
          <p>We combine premium product quality with seamless shopping service for an unmatched experience.</p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="hover-lift"
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: '1.25rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--neutral-200)',
                  boxShadow: 'var(--shadow-sm)',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '1rem',
                    backgroundColor: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <IconComp size={24} />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
