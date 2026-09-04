import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      className="product-card hover-lift"
      style={{
        borderRadius: '1.25rem',
        backgroundColor: '#ffffff',
        border: '1px solid var(--neutral-200)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
      }}
    >
      {/* Top Image Container */}
      <Link to={`/product/${product._id}`} style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: 'var(--neutral-100)', display: 'block' }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
        />

        {/* Badges Container */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {product.discount > 0 && (
            <span
              style={{
                backgroundColor: 'var(--danger)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.2rem 0.5rem',
                borderRadius: '0.4rem',
              }}
            >
              -{product.discount}%
            </span>
          )}
          {product.badge && (
            <span
              style={{
                backgroundColor: 'var(--neutral-900)',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '0.4rem',
                textTransform: 'uppercase',
              }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isWishlisted ? '#ef4444' : 'var(--neutral-700)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease',
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isWishlisted ? '#ef4444' : 'none'} />
        </button>
      </Link>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category Pill */}
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-600)', marginBottom: '0.4rem' }}>
          {product.category}
        </div>

        {/* Product Title */}
        <Link to={`/product/${product._id}`}>
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--neutral-900)',
              marginBottom: '0.5rem',
              lineHeight: 1.35,
              minHeight: '2.8rem',
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', color: '#f59e0b' }}>
            <Star size={15} fill="#f59e0b" />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-900)' }}>
            {product.rating}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--neutral-700)' }}>
            ({product.reviewsCount})
          </span>
        </div>

        {/* Footer Price & Add To Cart Button */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--neutral-100)' }}>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '0.85rem', color: 'var(--neutral-700)', textDecoration: 'line-through', marginLeft: '0.4rem' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className={`btn ${isAdded ? 'btn-accent' : 'btn-primary'}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              opacity: product.inStock === false ? 0.6 : 1,
              cursor: product.inStock === false ? 'not-allowed' : 'pointer',
            }}
          >
            {product.inStock === false ? (
              'Sold Out'
            ) : isAdded ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
