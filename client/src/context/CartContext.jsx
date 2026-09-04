import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    // Sample initial items for demo UI state
    {
      product: {
        _id: '1',
        name: 'Wireless Noise-Canceling Headphones',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        category: 'Electronics',
      },
      quantity: 1,
    },
  ]);

  const [notification, setNotification] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });

    // Trigger toast notification
    setNotification(`"${product.name}" added to cart!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartCount,
        addToCart,
        removeFromCart,
        clearCart,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
