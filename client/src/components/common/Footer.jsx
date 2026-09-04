import React, { useState } from 'react';
import { ShoppingBag, Send, Twitter, Instagram, Facebook, Github, Heart } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--neutral-900)', color: '#94a3b8', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid #1e293b' }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Info Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', backgroundColor: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <ShoppingBag size={18} />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Shop<span style={{ color: 'var(--primary-500)' }}>Sphere</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', color: '#cbd5e1' }}>
              Your ultimate online shopping destination. Premium tech, fashion, home essentials & lifestyle products delivered with quality guaranteed.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Twitter, Instagram, Facebook, Github].map((SocialIcon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-600)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
                >
                  <SocialIcon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Shop Collections</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><a href="#shop" style={{ color: '#cbd5e1' }}>Electronics & Tech</a></li>
              <li><a href="#shop" style={{ color: '#cbd5e1' }}>Fashion & Apparel</a></li>
              <li><a href="#shop" style={{ color: '#cbd5e1' }}>Home & Living</a></li>
              <li><a href="#shop" style={{ color: '#cbd5e1' }}>Sports & Fitness</a></li>
              <li><a href="#shop" style={{ color: '#cbd5e1' }}>Beauty & Care</a></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><a href="#" style={{ color: '#cbd5e1' }}>Track Your Order</a></li>
              <li><a href="#" style={{ color: '#cbd5e1' }}>Shipping & Delivery</a></li>
              <li><a href="#" style={{ color: '#cbd5e1' }}>Returns & Refunds</a></li>
              <li><a href="#" style={{ color: '#cbd5e1' }}>FAQs & Help Center</a></li>
              <li><a href="#" style={{ color: '#cbd5e1' }}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Stay Connected</h4>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              Subscribe to get 10% OFF your first order and receive secret deals.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.75rem 0.75rem 1rem',
                    borderRadius: '0.6rem',
                    border: '1px solid #334155',
                    backgroundColor: '#1e293b',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '0.4rem',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '0.4rem',
                    backgroundColor: 'var(--primary-600)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Subscribe"
                >
                  <Send size={14} />
                </button>
              </div>

              {subscribed && (
                <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                  🎉 Thank you for subscribing! Check your inbox soon.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div
          style={{
            borderTop: '1px solid #1e293b',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} ShopSphere Inc. Built with MERN Stack.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>Secured by 256-bit Encryption</span>
            <span style={{ display: 'inline-flex', gap: '0.5rem', fontWeight: 700, color: '#e2e8f0' }}>
              VISA • MasterCard • PayPal • ApplePay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
