export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const PAYMENT_METHODS = {
  STRIPE: 'Stripe',
  PAYPAL: 'PayPal',
  COD: 'Cash on Delivery',
};
