import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CART_STORAGE_KEY = 'shopsphere_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved cart:', e);
    }
    // Default initial sample item for rich demo UI state
    return [
      {
        product: {
          _id: 'p1',
          name: 'Wireless Noise-Canceling Headphones',
          category: 'Electronics',
          price: 199.99,
          originalPrice: 249.99,
          discount: 20,
          rating: 4.8,
          reviewsCount: 128,
          inStock: true,
          badge: 'Bestseller',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
          description: 'High-fidelity audio with active noise cancellation, ambient mode, and 30-hour battery life.',
        },
        quantity: 1,
      },
    ];
  });

  const [notification, setNotification] = useState(null);

  // Sync cart items to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });

    showNotification(`"${product.name}" added to cart!`);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.product._id === productId);
      if (itemToRemove) {
        showNotification(`Removed "${itemToRemove.product.name}" from cart`);
      }
      return prevItems.filter((item) => item.product._id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    showNotification('Cart cleared');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= 50 ? 0 : 9.99;
  const totalAmount = subtotal + shippingFee;
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartCount,
        subtotal,
        shippingFee,
        totalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

