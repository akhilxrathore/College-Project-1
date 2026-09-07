import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ProductCard } from '../components/product/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, ArrowLeft, Check, AlertCircle } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = mockProducts.find((p) => p._id === id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Reset state and scroll to top when route param id changes
  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Gracefully handle missing or invalid product IDs
  if (!product) {
    return (
      <MainLayout>
        <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--neutral-100)',
              color: 'var(--neutral-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <AlertCircle size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
            Product Not Found
          </h2>
          <p style={{ color: 'var(--neutral-700)', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem auto' }}>
            The product you are looking for does not exist or may have been removed from our catalog.
          </p>
          <Link to="/shop" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            <ArrowLeft size={18} /> Back to Shop
          </Link>
        </div>
      </MainLayout>
    );
  }

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <MainLayout>
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--neutral-700)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--neutral-700)', hover: { color: 'var(--primary-600)' } }}>Home</Link> /
          <Link to="/shop" style={{ color: 'var(--neutral-700)' }}>Shop</Link> /
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} style={{ color: 'var(--neutral-700)' }}>{product.category}</Link> /
          <span style={{ color: 'var(--neutral-900)', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Product Details Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', marginBottom: '5rem', alignItems: 'start' }}>
          
          {/* Left Column: Product Image Gallery */}
          <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', backgroundColor: '#ffffff', border: '1px solid var(--neutral-200)', boxShadow: 'var(--shadow-md)' }}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {product.discount > 0 && (
                <span style={{ backgroundColor: 'var(--danger)', color: '#fff', fontSize: '0.85rem', fontWeight: 800, padding: '0.35rem 0.75rem', borderRadius: '0.5rem' }}>
                  -{product.discount}% OFF
                </span>
              )}
              {product.badge && (
                <span style={{ backgroundColor: 'var(--neutral-900)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.35rem 0.75rem', borderRadius: '0.5rem', textTransform: 'uppercase' }}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Product Specs & Ordering */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              {product.category}
            </div>

            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--neutral-900)', lineHeight: 1.2, marginBottom: '1rem' }}>
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--neutral-900)' }}>{product.rating}</span>
                <span style={{ color: 'var(--neutral-700)', fontSize: '0.9rem' }}>({product.reviewsCount} verified reviews)</span>
              </div>

              <div style={{ width: '1px', height: '1.25rem', backgroundColor: 'var(--neutral-300)' }} />

              <span className={`badge ${product.inStock ? 'badge-success' : 'badge-dark'}`}>
                {product.inStock ? 'In Stock & Ready to Ship' : 'Out of Stock'}
              </span>
            </div>

            {/* Pricing Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--neutral-200)' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{ fontSize: '1.15rem', color: 'var(--neutral-700)', textDecoration: 'line-through' }}>
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>
                  Save {formatCurrency(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--neutral-700)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--neutral-300)', borderRadius: '0.6rem', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || !product.inStock}
                  style={{
                    padding: '0.75rem 1.1rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--neutral-100)',
                    color: quantity <= 1 ? 'var(--neutral-400)' : 'var(--neutral-800)',
                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{ padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '1rem', minWidth: '3rem', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  style={{
                    padding: '0.75rem 1.1rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--neutral-100)',
                    color: 'var(--neutral-800)',
                    cursor: !product.inStock ? 'not-allowed' : 'pointer',
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`btn ${isAdded ? 'btn-accent' : 'btn-primary'}`}
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '1rem',
                  flex: 1,
                  minWidth: '200px',
                  opacity: !product.inStock ? 0.6 : 1,
                  cursor: !product.inStock ? 'not-allowed' : 'pointer',
                }}
              >
                {!product.inStock ? (
                  'Out of Stock'
                ) : isAdded ? (
                  <>
                    <Check size={20} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '0.6rem',
                  border: '1px solid var(--neutral-300)',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isWishlisted ? '#ef4444' : 'var(--neutral-700)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                }}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={22} fill={isWishlisted ? '#ef4444' : 'none'} />
              </button>
            </div>

            {/* Service Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--neutral-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--neutral-800)', fontWeight: 600 }}>
                <Truck size={20} color="var(--primary-600)" />
                <span>Free Express Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--neutral-800)', fontWeight: 600 }}>
                <ShieldCheck size={20} color="var(--accent-600)" />
                <span>2 Year Warranty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--neutral-800)', fontWeight: 600 }}>
                <RotateCcw size={20} color="#f59e0b" />
                <span>30-Day Money Back</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ paddingTop: '3rem', borderTop: '1px solid var(--neutral-200)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '2rem' }}>
              Related Products in {product.category}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {relatedProducts.map((rp) => (
                <ProductCard key={rp._id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

