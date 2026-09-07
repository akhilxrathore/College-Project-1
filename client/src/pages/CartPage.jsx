import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';
import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const CartPage = () => {
  const {
    cartItems,
    totalCartCount,
    subtotal,
    shippingFee,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Apply promo code logic
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'SPHERE50' || code === 'SAVE10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Discount code applied!');
    } else {
      setPromoError('Invalid promo code. Try "SPHERE50"');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  // Free shipping progress bar target ($50)
  const freeShippingThreshold = 50;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1500);
  };

  // If checkout simulation was completed
  if (checkoutSuccess) {
    return (
      <MainLayout>
        <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <Check size={40} />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
            Thank You For Your Order!
          </h1>
          <p style={{ color: 'var(--neutral-700)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Your order has been placed successfully. A confirmation email has been sent with tracking instructions.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
              Continue Shopping
            </Link>
            <button
              onClick={() => setCheckoutSuccess(false)}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Banner */}
      <div style={{ backgroundColor: 'var(--neutral-900)', color: '#ffffff', padding: '2.5rem 0', borderBottom: '1px solid #1e293b' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Shopping <span style={{ color: 'var(--primary-500)' }}>Cart</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            {totalCartCount > 0
              ? `You have ${totalCartCount} item${totalCartCount > 1 ? 's' : ''} in your cart`
              : 'Your cart is currently empty'}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div
            style={{
              textAlign: 'center',
              padding: '4.5rem 2rem',
              backgroundColor: '#ffffff',
              borderRadius: '1.5rem',
              border: '1px solid var(--neutral-200)',
              boxShadow: 'var(--shadow-sm)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
              }}
            >
              <ShoppingBag size={40} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.75rem' }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: 'var(--neutral-700)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Looks like you haven't added any products to your shopping cart yet. Explore our top categories and deals!
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <ArrowLeft size={18} /> Explore Products
            </Link>
          </div>
        ) : (
          /* Main Cart Content Grid */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '2.5rem',
              alignItems: 'start',
            }}
            className="cart-grid-layout"
          >
            {/* Left Column: Cart Items List */}
            <div>
              {/* Free Shipping Progress Indicator */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--neutral-200)',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.6rem' }}>
                  <Truck size={20} color="var(--primary-600)" />
                  {amountForFreeShipping > 0 ? (
                    <span>
                      Add <strong style={{ color: 'var(--primary-600)' }}>{formatCurrency(amountForFreeShipping)}</strong> more to get <span style={{ color: '#10b981' }}>FREE Express Shipping!</span>
                    </span>
                  ) : (
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Sparkles size={16} /> You unlocked FREE Express Shipping!
                    </span>
                  )}
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--neutral-100)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${freeShippingProgress}%`,
                      height: '100%',
                      backgroundColor: freeShippingProgress >= 100 ? '#10b981' : 'var(--primary-600)',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>

              {/* Cart Header Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                  Cart Items ({cartItems.length})
                </h3>
                <button
                  onClick={clearCart}
                  style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Trash2 size={15} /> Clear All
                </button>
              </div>

              {/* Items Card Container */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '1.25rem', border: '1px solid var(--neutral-200)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                {cartItems.map((item, index) => (
                  <div
                    key={item.product._id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr auto auto',
                      gap: '1.25rem',
                      alignItems: 'center',
                      padding: '1.25rem 1.5rem',
                      borderBottom: index < cartItems.length - 1 ? '1px solid var(--neutral-200)' : 'none',
                    }}
                    className="cart-item-row"
                  >
                    {/* Item Thumbnail */}
                    <Link to={`/product/${item.product._id}`} style={{ width: '90px', height: '90px', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'var(--neutral-100)', flexShrink: 0 }}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Link>

                    {/* Item Info */}
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        {item.product.category}
                      </div>
                      <Link to={`/product/${item.product._id}`}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-900)', lineHeight: 1.3, marginBottom: '0.35rem' }}>
                          {item.product.name}
                        </h4>
                      </Link>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neutral-800)' }}>
                        {formatCurrency(item.product.price)}
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--neutral-300)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '1rem',
                          fontWeight: 700,
                          backgroundColor: 'var(--neutral-100)',
                          color: item.quantity <= 1 ? 'var(--neutral-400)' : 'var(--neutral-800)',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                        }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0.4rem 0.9rem', fontWeight: 700, fontSize: '0.9rem', minWidth: '2.4rem', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '1rem',
                          fontWeight: 700,
                          backgroundColor: 'var(--neutral-100)',
                          color: 'var(--neutral-800)',
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total & Remove */}
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        style={{ color: 'var(--neutral-500)', hover: { color: 'var(--danger)' }, padding: '0.25rem' }}
                        title="Remove item"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Back Button */}
              <div style={{ marginTop: '1.75rem' }}>
                <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary-600)', fontSize: '0.95rem' }}>
                  <ArrowLeft size={18} /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <aside
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1.25rem',
                border: '1px solid var(--neutral-200)',
                padding: '1.75rem',
                position: 'sticky',
                top: '5.5rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--neutral-200)' }}>
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-800)', marginBottom: '0.4rem' }}>
                  Promo Code
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="text"
                      placeholder="e.g. SPHERE50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem 0.55rem 2.25rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--neutral-300)',
                        fontSize: '0.875rem',
                        outline: 'none',
                      }}
                    />
                    <Tag size={16} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-500)' }} />
                  </div>
                  <button type="submit" className="btn btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
                    Apply
                  </button>
                </div>
                {promoError && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <AlertCircle size={13} /> {promoError}
                  </div>
                )}
                {promoSuccess && (
                  <div style={{ color: '#10b981', fontSize: '0.75rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                    <Check size={13} /> {promoSuccess}
                  </div>
                )}
              </form>

              {/* Cost Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--neutral-700)' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 700, color: 'var(--neutral-900)' }}>{formatCurrency(subtotal)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--neutral-700)' }}>
                  <span>Shipping</span>
                  {shippingFee === 0 ? (
                    <span style={{ fontWeight: 800, color: '#10b981' }}>FREE</span>
                  ) : (
                    <span style={{ fontWeight: 700, color: 'var(--neutral-900)' }}>{formatCurrency(shippingFee)}</span>
                  )}
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div style={{ borderTop: '1px solid var(--neutral-200)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--neutral-900)' }}>Total</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginBottom: '1.25rem' }}
              >
                {isCheckingOut ? (
                  'Processing Order...'
                ) : (
                  <>
                    Proceed to Checkout <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Guarantee / Trust Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--neutral-700)', paddingTop: '1rem', borderTop: '1px dashed var(--neutral-300)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} color="var(--accent-600)" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={16} color="var(--primary-600)" />
                  <span>Express Insured Shipping</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .cart-item-row {
            grid-template-columns: 70px 1fr !important;
            grid-template-rows: auto auto;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </MainLayout>
  );
};
