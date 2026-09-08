import React, { useState, useEffect } from 'react';
import { ProductCard } from '../product/ProductCard';
import { productService } from '../../services/productService';
import { AlertCircle } from 'lucide-react';

export const FeaturedProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    const fetchProducts = async () => {
      try {
        const params = { limit: 8 };
        if (activeCategory !== 'All') {
          params.category = activeCategory;
        } else {
          params.featured = 'true';
        }

        const res = await productService.getProducts(params);
        if (isMounted) {
          const productList = res?.data?.products || res?.products || res?.data || (Array.isArray(res) ? res : []);
          setProducts(productList);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching featured products:', err);
          setError('Failed to load featured products.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

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
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                border: '3px solid var(--neutral-200)',
                borderTopColor: 'var(--primary-600)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error Alert */}
        {!loading && error && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#dc2626', padding: '2rem 0' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && !error && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
