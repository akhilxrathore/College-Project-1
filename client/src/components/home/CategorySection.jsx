import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Shirt, Home, Dumbbell, Sparkles, ArrowUpRight } from 'lucide-react';

const categoriesData = [
  {
    id: 'Electronics',
    name: 'Electronics',
    count: '140+ Products',
    icon: Laptop,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    badge: 'Popular',
  },
  {
    id: 'Fashion',
    name: 'Fashion',
    count: '320+ Products',
    icon: Shirt,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    badge: 'Trending',
  },
  {
    id: 'Home & Living',
    name: 'Home & Living',
    count: '95+ Products',
    icon: Home,
    gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    badge: 'New',
  },
  {
    id: 'Sports',
    name: 'Sports',
    count: '80+ Products',
    icon: Dumbbell,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    badge: 'Active',
  },
  {
    id: 'Beauty',
    name: 'Beauty',
    count: '110+ Products',
    icon: Sparkles,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    badge: 'Essential',
  },
];

export const CategorySection = () => {
  return (
    <section id="categories" style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Title */}
        <div className="section-header">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Top Collections</div>
          <h2>Shop by Category</h2>
          <p>Explore our wide array of premium categories tailored to elevate your everyday lifestyle.</p>
        </div>

        {/* Category Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {categoriesData.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.75rem 1.5rem',
                  borderRadius: '1.25rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--neutral-200)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  minHeight: '200px',
                }}
              >
                {/* Top Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '3.25rem',
                      height: '3.25rem',
                      borderRadius: '0.85rem',
                      background: cat.gradient,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--neutral-700)',
                      backgroundColor: 'var(--neutral-100)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '0.5rem',
                    }}
                  >
                    {cat.badge}
                  </span>
                </div>

                {/* Bottom Details Row */}
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.25rem' }}>
                    {cat.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', fontWeight: 500 }}>
                      {cat.count}
                    </span>
                    <ArrowUpRight size={18} color="var(--primary-600)" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
