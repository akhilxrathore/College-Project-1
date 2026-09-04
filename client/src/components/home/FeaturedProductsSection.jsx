import React, { useState } from 'react';
import { ProductCard } from '../product/ProductCard';
import { mockProducts } from '../../data/mockProducts';

export const FeaturedProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'];

  const filteredProducts = activeCategory === 'All'
    ? mockProducts.slice(0, 6)
    : mockProducts.filter((p) => p.category === activeCategory).slice(0, 6);

  return (
    <section id="featured" style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-accent" style={{ marginBottom: '0.75rem' }}>Curated Picks</div>
          <h2>Featured Products</h2>
          <p>Handpicked top-rated products with exclusive discounts for our ShopSphere community.</p>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.75rem',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  backgroundColor: activeCategory === cat ? 'var(--primary-600)' : 'var(--neutral-100)',
                  color: activeCategory === cat ? '#ffffff' : 'var(--neutral-700)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
