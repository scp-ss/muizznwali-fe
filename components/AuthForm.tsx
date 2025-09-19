'use client';

import { useState, useEffect } from 'react';
import { createAccount, signIn, resetPassword } from '../lib/authHelpers';
import './AuthForm.css';

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formFocused, setFormFocused] = useState('');
  const [mounted, setMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailValid, setEmailValid] = useState(false);
  const [showHelpText, setShowHelpText] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');
  
  // Form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    setMounted(true);
    // Auto-clear errors after 6 seconds
    if (error) {
      const timer = setTimeout(() => setError(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    
    setPasswordStrength(Math.min(strength, 100));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!displayName.trim()) {
          setError('Display name is required for your todo universe');
          setLoading(false);
          return;
        }
        if (passwordStrength < 50) {
          setError('Please create a stronger password for better security');
          setLoading(false);
          return;
        }
        result = await createAccount(email, password, displayName);
      }

      if (result.success) {
        console.log('Authentication successful');
        onSuccess?.();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }

    setLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
    setFormFocused('');
    setPasswordStrength(0);
    setEmailValid(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ef4444';
    if (passwordStrength < 50) return '#f97316';
    if (passwordStrength < 75) return '#eab308';
    return '#22c55e';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  // Handle forgot password functionality
  const handleForgotPassword = () => {
    setResetEmail(email); // Pre-fill with current email if available
    setShowForgotPassword(true);
    setResetError('');
    setResetSuccess(false);
  };

  // Handle password reset email sending
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setResetError('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setResetError('Please enter a valid email address');
      return;
    }
    
    setResetLoading(true);
    setResetError('');
    
    try {
      const result = await resetPassword(resetEmail);
      
      if (result.success) {
        setResetSuccess(true);
        // Auto-close modal after 3 seconds
        setTimeout(() => {
          setShowForgotPassword(false);
          setResetSuccess(false);
          setResetEmail('');
        }, 3000);
      } else {
        setResetError(result.error || 'Failed to send password reset email');
      }
    } catch (error: unknown) {
      setResetError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
    
    setResetLoading(false);
  };

  // Close forgot password modal
  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetError('');
    setResetSuccess(false);
    setResetLoading(false);
  };

  if (!mounted) {
    return (
      <div className="auth-loading-container">
        <div className="auth-loading-content">
          <div className="auth-loading-spinner"></div>
          <div className="auth-loading-text">Preparing your workspace...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {/* Enhanced Background with Modern Gradients */}
      <div className="auth-background">
        <div className="auth-background-overlay"></div>
        <div className="auth-background-pattern"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element floating-element-1"></div>
        <div className="floating-element floating-element-2"></div>
        <div className="floating-element floating-element-3"></div>
        <div className="floating-element floating-element-4"></div>
        <div className="floating-element floating-element-5"></div>
      </div>
      
      <div className="auth-content">
        <div className="auth-wrapper">
          
          {/* Hero Section */}
          <div className="text-center relative">
            
            {/* Title with enhanced animation */}
            <div className="space-y-2 mb-8">
              <h1 className="text-5xl sm:text-6xl font-black">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  {isLogin ? 'Welcome' : 'Join Us'}
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
                {isLogin ? 'Back!' : 'Today!'}
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
              {isLogin
                ? 'Ready to boost your productivity and conquer your goals?'
                : 'Start your journey to organized success and achievement!'}
            </p>
            
            {/* Mode toggle */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <span className="text-sm text-gray-600 font-medium">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  color: '#4338ca',
                  fontWeight: '600',
                  fontSize: '14px',
                  border: '1px solid #c7d2fe',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px 0 rgba(67, 56, 202, 0.1)',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(67, 56, 202, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
                  e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(67, 56, 202, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(67, 56, 202, 0.1), 0 0 0 3px rgba(67, 56, 202, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(67, 56, 202, 0.1)';
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className={`transform transition-all duration-500 ${isLogin ? 'animate-slideInRight' : 'animate-slideInLeft'}`}>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Card decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent opacity-30 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-100 to-transparent opacity-30 rounded-full transform -translate-x-10 translate-y-10"></div>
              
              <form className="relative space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Display Name Field (for signup) */}
                  {!isLogin && (
                    <div className="transform transition-all duration-500 animate-slideInDown">
                      <label htmlFor="displayName" className="text-sm font-semibold text-gray-700 mb-3">
                         Your Name
                       </label>
                      <div className="relative group">
                        <input
                          id="displayName"
                          name="displayName"
                          type="text"
                          required={!isLogin}
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          onFocus={() => {
                            setFormFocused('displayName');
                            setShowHelpText('displayName');
                            setHasInteracted(true);
                          }}
                          onBlur={() => {
                            setFormFocused('');
                            setTimeout(() => setShowHelpText(null), 200);
                          }}
                          className="auth-form-input placeholder-gray-400 text-gray-700"
                          placeholder="What should we call you?"
                        />
                        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${formFocused === 'displayName' ? 'opacity-100' : 'opacity-0'}`}>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Contextual Help */}
                      {showHelpText === 'displayName' && (
                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 animate-slideInUp">
                          <div>
                            <p className="font-medium">Choose your display name</p>
                            <p className="text-blue-600">This is how you'll appear in your todo universe. You can use your real name, nickname, or any name you prefer!</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="transform transition-all duration-300">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-3">
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFormFocused('email')}
                        onBlur={() => setFormFocused('')}
                        className="auth-form-input placeholder-gray-400 text-gray-700"
                        placeholder="your.email@example.com"
                      />
                      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${formFocused === 'email' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                      </div>
                      
                      {/* Email validation indicator */}
                      {email && (
                        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${emailValid ? 'text-green-500' : 'text-red-400'}`}>
                          {emailValid ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="transform transition-all duration-300">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-3">
                      Password
                    </label>
                    <div className="relative group">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFormFocused('password')}
                        onBlur={() => setFormFocused('')}
                        className="auth-form-input pr-12 placeholder-gray-400 text-gray-700"
                        placeholder="Enter your secure password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.11 8.11m1.768 1.768L12 12m0 0l2.12 2.12M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${formFocused === 'password' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Password strength indicator (only for signup) */}
                    {!isLogin && password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Password strength:</span>
                          <span 
                            className="font-semibold transition-colors duration-300"
                            style={{ color: getPasswordStrengthColor() }}
                          >
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-500 ease-out rounded-full"
                            style={{ 
                              width: `${passwordStrength}%`,
                              backgroundColor: getPasswordStrengthColor()
                            }}
                          ></div>
                        </div>
                        {passwordStrength > 0 && passwordStrength < 50 && (
                          <div className="text-xs text-gray-500">
                            Try adding uppercase letters, numbers, and symbols
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-2xl bg-red-50 border-2 border-red-100 p-4 animate-slideInUp transform transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-red-700 font-medium flex-1">{error}</div>
                      <button
                        type="button"
                        onClick={() => setError('')}
                        className="text-red-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading || (!isLogin && (!emailValid || passwordStrength < 50))}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: 'white',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
                      cursor: loading || (!isLogin && (!emailValid || passwordStrength < 50)) ? 'not-allowed' : 'pointer',
                      opacity: loading || (!isLogin && (!emailValid || passwordStrength < 50)) ? 0.6 : 1,
                      transform: 'translateY(0)',
                      transition: 'all 0.2s ease',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading && (isLogin || (emailValid && passwordStrength >= 50))) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px 0 rgba(37, 99, 235, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(37, 99, 235, 0.39)';
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(37, 99, 235, 0.39), 0 0 0 3px rgba(37, 99, 235, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(37, 99, 235, 0.39)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                      {loading ? (
                        <>
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              border: '2px solid rgba(255, 255, 255, 0.3)',
                              borderTop: '2px solid white',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }}
                          ></div>
                          <span>
                            {isLogin ? 'Signing you in...' : 'Creating account...'}
                          </span>
                        </>
                      ) : (
                        <span>
                          {isLogin ? 'Sign In' : 'Sign Up'}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
                
                {/* Social Login Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-500 font-medium rounded-full">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="flex gap-3">
                  {/* Google Sign In */}
                  <button
                    type="button"
                    onClick={() => console.log('Google Sign In - Implementation needed')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium text-gray-800 text-sm">
                      Google
                    </span>
                  </button>

                  {/* GitHub Sign In */}
                  <button
                    type="button"
                    onClick={() => console.log('GitHub Sign In - Implementation needed')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/30"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="font-medium text-white text-sm">
                      GitHub
                    </span>
                  </button>
                </div>
                
                {/* Additional Features */}
                {isLogin && (
                  <div className="mt-6 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white/80 text-gray-400 text-xs font-medium backdrop-blur-sm">
                          Need help?
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-xl font-medium text-red-700 hover:text-red-800 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <span className="text-sm">Forgot Password?</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 w-full max-w-md relative overflow-hidden animate-slideInUp">
            {/* Modal decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-100 to-transparent opacity-50 rounded-full transform translate-x-10 -translate-y-10"></div>
            
            <div className="relative">
              {/* Close button */}
              <button
                type="button"
                onClick={closeForgotPasswordModal}
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h3>
                <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
              </div>
              
              {resetSuccess ? (
                /* Success state */
                <div className="text-center animate-fadeIn">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Email Sent</h4>
                  <p className="text-gray-600 mb-4">
                    We've sent a password reset link to <span className="font-semibold">{resetEmail}</span>.
                    Check your inbox and follow the instructions to reset your password.
                  </p>
                  <p className="text-sm text-gray-500">This window will close automatically...</p>
                </div>
              ) : (
                /* Form state */
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label htmlFor="resetEmail" className="text-sm font-semibold text-gray-700 mb-3">
                      Email Address
                    </label>
                    <input
                      id="resetEmail"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="auth-form-input placeholder-gray-400 text-gray-700"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  {/* Error message */}
                  {resetError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 animate-slideInUp">
                      <div className="text-sm text-red-700 font-medium">{resetError}</div>
                    </div>
                  )}
                  
                  {/* Submit button */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeForgotPasswordModal}
                      className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                    >
                      {resetLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
