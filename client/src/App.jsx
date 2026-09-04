import React from 'react';
import { HomePage } from './pages/HomePage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HomePage />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
