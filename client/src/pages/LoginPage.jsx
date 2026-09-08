import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.password) {
      setError('Please enter your password');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Invalid email or password. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          minHeight: 'calc(100vh - 12rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1rem',
          backgroundColor: 'var(--neutral-50)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '28rem',
            backgroundColor: '#ffffff',
            borderRadius: '1.25rem',
            padding: '2.5rem 2rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
            border: '1px solid var(--neutral-200)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '3.25rem',
                height: '3.25rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                color: 'var(--primary-600)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <LogIn size={28} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)', letterSpacing: '-0.025em' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--neutral-600)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              Sign in to access your orders, profile, and wishlist.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '0.85rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <AlertCircle size={18} style={{ shrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--neutral-700)', marginBottom: '0.4rem' }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--neutral-400)',
                    display: 'flex',
                  }}
                >
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.6rem',
                    borderRadius: '0.65rem',
                    border: '1px solid var(--neutral-300)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label
                  htmlFor="password"
                  style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--neutral-700)' }}
                >
                  Password
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--neutral-400)',
                    display: 'flex',
                  }}
                >
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.6rem 0.75rem 2.6rem',
                    borderRadius: '0.65rem',
                    border: '1px solid var(--neutral-300)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--neutral-500)',
                    cursor: 'pointer',
                    display: 'flex',
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '0.65rem',
                backgroundColor: loading ? 'var(--neutral-400)' : 'var(--primary-600)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(79, 70, 229, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Register Redirection Link */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--neutral-200)' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>
              Don't have an account yet?{' '}
              <Link
                to="/register"
                style={{ color: 'var(--primary-600)', fontWeight: 700, textDecoration: 'none' }}
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
