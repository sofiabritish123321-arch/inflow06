import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, signIn, signUp, signInWithGoogle } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      onNavigate('home');
    }
  }, [user, onNavigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        if (!formData.username) {
          throw new Error('Username is required');
        }
        await signUp(formData.email, formData.password, formData.username);
      }
      onNavigate('home');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Email not confirmed')) {
          setError('Email not confirmed. Please check your inbox (and spam) for a verification link. If needed, try signing up again.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
      onNavigate('home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ email: '', password: '', username: '' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 bg-white relative">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="relative h-8 w-[120px]">
              <div className="h-full w-full bg-gradient-to-r from-[#FF4DA6] to-[#7C3AED]"
                style={{
                  WebkitMaskImage: "url('/dffdf.png')",
                  maskImage: "url('/dffdf.png')",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }} />
              <img src="/dffdf.png" alt="Inflow Logo" className="h-full w-auto opacity-0" />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {isLogin ? 'Welcome Back' : 'Welcome'}
            </h1>
            <p className="text-gray-600 text-lg">
              {isLogin 
                ? 'Enter your email and password to access your account.' 
                : 'Create your account to get started.'
              }
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Your Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Create Account')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or {isLogin ? 'Login' : 'Continue'} With</span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md mb-8"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          {/* Toggle Auth Mode */}
          <div className="text-center">
            <span className="text-gray-600">
              {isLogin ? "Don't Have An Account? " : "Already have an account? "}
            </span>
            <button
              onClick={toggleAuthMode}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {isLogin ? 'Register Now.' : 'Log in'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-sm text-gray-400">
          <span>Copyright © 2025 Inflow Enterprises LTD.</span>
          <button 
            onClick={() => onNavigate('privacy')}
            className="hover:text-gray-600 transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Right Section - Dashboard Preview */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="flex flex-col justify-center items-center text-center px-12 relative z-10">
          {/* Header Text */}
          <div className="mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              {isLogin 
                ? 'Effortlessly manage your team and operations.' 
                : 'Start building your business today.'
              }
            </h2>
            <p className="text-xl text-blue-100 max-w-md leading-relaxed">
              {isLogin 
                ? 'Log in to access your CRM dashboard and manage your team.' 
                : 'Join thousands of businesses growing with our platform.'
              }
            </p>
          </div>
          
          {/* Dashboard Preview - Static and Vertically Aligned */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
            {isLogin ? (
              // Login Dashboard
              <div className="space-y-6">
                {/* Header Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                    <div className="text-sm opacity-90">Total Sales</div>
                    <div className="text-2xl font-bold">$189,374</div>
                    <div className="text-xs opacity-75">+12% from last month</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Chat Performance</div>
                    <div className="text-2xl font-bold text-gray-900">00:01:30</div>
                    <div className="text-xs text-gray-500">Avg response time</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Sales Overview</div>
                    <div className="text-lg font-semibold text-gray-900">Weekly</div>
                    <div className="text-xs text-gray-500">Performance</div>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white border border-gray-200 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Total Profit</div>
                      <div className="text-2xl font-bold text-gray-900">$25,684</div>
                    </div>
                    <div className="text-xs text-gray-500">Last 30 days</div>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-end justify-center">
                    <div className="text-xs text-gray-600">Revenue Trend ↗</div>
                  </div>
                </div>

                {/* Sales Categories */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-2">Monthly</div>
                    <div className="text-lg font-semibold text-gray-900">Sales Categories</div>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Subscriptions</span>
                        <span className="font-medium">2,448 Units</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Features & AI</span>
                        <span className="font-medium">1,200 Units</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Accessories</span>
                        <span className="font-medium">600 Units</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold">6,248</span>
                      </div>
                      <div className="text-xs text-gray-600">Total Units</div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white border border-gray-200 p-4 rounded-xl">
                  <div className="text-sm font-medium text-gray-900 mb-3">Product Transactions</div>
                  <div className="space-y-2">
                    {[
                      { id: 'INV-001', product: 'Apple iPad Gen 10', date: '14 February, 2025', amount: '$649' },
                      { id: 'INV-002', product: 'Apple iPhone 15', date: '14 February, 2025', amount: '$1,199' },
                      { id: 'INV-003', product: 'Apple MacBook Air', date: '13 February, 2025', amount: '$999' }
                    ].map((transaction, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">{transaction.id}</div>
                          <div className="text-xs text-gray-600">{transaction.product}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{transaction.date}</div>
                          <div className="text-xs font-medium text-gray-900">{transaction.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Signup Dashboard
              <div className="space-y-6">
                {/* Setup Progress */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
                  <div className="text-sm opacity-90">Setup Progress</div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-xs opacity-75">Almost ready to launch</div>
                </div>

                {/* Growth Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">User Growth</div>
                    <div className="text-2xl font-bold text-gray-900">+247%</div>
                    <div className="text-xs text-green-600">↗ This month</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Revenue Growth</div>
                    <div className="text-2xl font-bold text-gray-900">$12,450</div>
                    <div className="text-xs text-green-600">↗ Monthly recurring</div>
                  </div>
                </div>

                {/* First Dashboard Preview */}
                <div className="bg-white border border-gray-200 p-4 rounded-xl">
                  <div className="text-sm font-medium text-gray-900 mb-3">Your First Dashboard</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Team Members</span>
                      </div>
                      <span className="text-xs font-medium">5 Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Active Projects</span>
                      </div>
                      <span className="text-xs font-medium">12 Running</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Completed Tasks</span>
                      </div>
                      <span className="text-xs font-medium">89 Done</span>
                    </div>
                  </div>
                </div>

                {/* Onboarding Steps */}
                <div className="bg-white border border-gray-200 p-4 rounded-xl">
                  <div className="text-sm font-medium text-gray-900 mb-3">Getting Started</div>
                  <div className="space-y-2">
                    {[
                      { step: 'Create your account', completed: true },
                      { step: 'Set up your team', completed: true },
                      { step: 'Import your data', completed: true },
                      { step: 'Customize dashboard', completed: false },
                      { step: 'Invite team members', completed: false }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={`text-xs ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {item.step}
                        </span>
                        {item.completed && <span className="text-xs text-green-600">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">24</div>
                    <div className="text-xs text-blue-600">Contacts</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-600">8</div>
                    <div className="text-xs text-purple-600">Pipelines</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">15</div>
                    <div className="text-xs text-green-600">Deals</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}