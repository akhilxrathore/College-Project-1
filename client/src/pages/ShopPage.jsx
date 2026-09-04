import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ProductCard } from '../components/product/ProductCard';
import { mockProducts, mockCategories } from '../data/mockProducts';
import { Filter, SlidersHorizontal, Search, RotateCcw, X, Star } from 'lucide-react';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search params when category or search changes
  useEffect(() => {
    const urlCat = searchParams.get('category');
    const urlSearch = searchParams.get('search');
    if (urlCat) setSelectedCategory(urlCat);
    if (urlSearch) setSearchQuery(urlSearch);
  }, [searchParams]);

  // Handle Category Select
  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    if (catName === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(300);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        // Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesCat = p.category.toLowerCase().includes(q);
          if (!matchesName && !matchesCat) return false;
        }
        // Price Filter
        if (p.price > maxPrice) return false;
        // Rating Filter
        if (minRating > 0 && p.rating < minRating) return false;
        // Availability Filter
        if (inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b._id.localeCompare(a._id); // Newest
      });
  }, [selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, sortBy]);

  return (
    <MainLayout>
      {/* Page Header Banner */}
      <div style={{ backgroundColor: 'var(--neutral-900)', color: '#ffffff', padding: '3rem 0', borderBottom: '1px solid #1e293b' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Shop <span style={{ color: 'var(--primary-500)' }}>Products</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto' }}>
            Discover top-quality electronics, fashion, home essentials, and lifestyle collections with fast delivery.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem', alignItems: 'start' }} className="shop-layout-grid">
          
          {/* Desktop Filter Sidebar */}
          <aside className="shop-sidebar-desktop" style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid var(--neutral-200)', position: 'sticky', top: '5.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--neutral-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--neutral-900)' }}>
                <SlidersHorizontal size={18} color="var(--primary-600)" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                style={{ fontSize: '0.8rem', color: 'var(--primary-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                title="Reset all filters"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            {/* Category Filter Group */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.85rem' }}>
                Categories
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'].map((cat) => {
                  const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? 'var(--primary-50)' : 'transparent',
                        color: isSelected ? 'var(--primary-600)' : 'var(--neutral-700)',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{cat}</span>
                      {isSelected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-600)' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Group */}
            <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--neutral-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neutral-900)' }}>Max Price</h4>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary-600)' }}>${maxPrice}</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-600)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--neutral-700)', marginTop: '0.35rem' }}>
                <span>$30</span>
                <span>$300</span>
              </div>
            </div>

            {/* Rating Filter Group */}
            <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--neutral-200)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
                Minimum Rating
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'All Ratings', val: 0 },
                  { label: '4.5 ★ & Above', val: 4.5 },
                  { label: '4.0 ★ & Above', val: 4.0 },
                ].map((r) => (
                  <label key={r.val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--neutral-700)', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r.val}
                      onChange={() => setMinRating(r.val)}
                      style={{ accentColor: 'var(--primary-600)' }}
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter Group */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--neutral-800)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: 'var(--primary-600)', width: '1rem', height: '1rem' }}
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Main Product Content Column */}
          <div>
            {/* Top Action & Controls Bar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                backgroundColor: '#ffffff',
                padding: '1rem 1.5rem',
                borderRadius: '1rem',
                border: '1px solid var(--neutral-200)',
                marginBottom: '2rem',
              }}
            >
              {/* Product Count & Active Filters Indicator */}
              <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
                  Showing {filteredProducts.length}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', marginLeft: '0.35rem' }}>
                  of {mockProducts.length} items
                </span>
              </div>

              {/* Controls Group */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {/* Mobile Filter Drawer Trigger Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="shop-mobile-filter-btn btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'none' }}
                >
                  <Filter size={16} /> Filters
                </button>

                {/* Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label htmlFor="sort" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--neutral-700)' }}>
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--neutral-300)',
                      backgroundColor: 'var(--neutral-50)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--neutral-800)',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.75rem',
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '1.25rem',
                  border: '1px solid var(--neutral-200)',
                }}
              >
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'var(--neutral-100)', color: 'var(--neutral-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Search size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
                  No Products Found
                </h3>
                <p style={{ color: 'var(--neutral-700)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                  We couldn't find any products matching your current search or filter parameters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: '320px', backgroundColor: '#ffffff', height: '100%', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--neutral-200)', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--neutral-900)' }}>Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} style={{ color: 'var(--neutral-700)', padding: '0.2rem' }}>
                <X size={24} />
              </button>
            </div>

            {/* Mobile Filter Category List */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Category</h4>
              {['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    handleCategoryChange(cat);
                    setMobileFilterOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: selectedCategory === cat ? 700 : 400,
                    color: selectedCategory === cat ? 'var(--primary-600)' : 'var(--neutral-800)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                handleResetFilters();
                setMobileFilterOpen(false);
              }}
              className="btn btn-secondary"
              style={{ marginTop: 'auto' }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .shop-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar-desktop {
            display: none !important;
          }
          .shop-mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </MainLayout>
  );
};
