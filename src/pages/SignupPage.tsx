import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, signUp, signInWithGoogle } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.username) {
        throw new Error('Username is required');
      }
      if (!agreeToPrivacy) {
        throw new Error('You must agree to the Privacy Policy to create an account');
      }
      await signUp(formData.email, formData.password, formData.username);
      
      // For email signup, show success message and redirect
      alert('Account created successfully! You can now log in with your credentials.');
      window.location.href = '/login';
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      console.error('Signup error:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      // OAuth will redirect, so no need to manually redirect
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google sign-in failed';
      console.error('Google sign-in error:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 relative h-full">
        {/* Logo */}
        <div className="absolute top-6 left-6 sm:left-8 z-10">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="relative h-10 w-[156px]">
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

        <div className="max-w-sm mx-auto w-full flex-shrink-0 py-16">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-base">
              Join thousands of businesses growing with our platform.
            </p>
          </div>

          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="privacy-agreement"
                checked={agreeToPrivacy}
                onChange={(e) => setAgreeToPrivacy(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                required
              />
              <label htmlFor="privacy-agreement" className="text-sm text-gray-600">
                I agree to the{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/#privacy', '_blank');
                    setTimeout(() => {
                      const newWindow = window.open('/#privacy', '_blank');
                      if (newWindow) {
                        newWindow.addEventListener('load', () => {
                          const event = new CustomEvent('navigate', { detail: 'privacy' });
                          newWindow.dispatchEvent(event);
                        });
                      }
                    }, 100);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Please wait...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or Continue With</span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md mb-4 text-sm"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          {/* Toggle Auth Mode */}
          <div className="text-center">
            <span className="text-gray-600 text-sm">Already have an account? </span>
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
            >
              Log in
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-6 right-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row justify-between text-xs text-gray-400 space-y-1 sm:space-y-0">
          <span>Copyright © 2025 Inflow Enterprises LTD.</span>
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open('/#privacy', '_blank');
              setTimeout(() => {
                const newWindow = window.open('/#privacy', '_blank');
                if (newWindow) {
                  newWindow.addEventListener('load', () => {
                    const event = new CustomEvent('navigate', { detail: 'privacy' });
                    newWindow.dispatchEvent(event);
                  });
                }
              }, 100);
            }}
            className="hover:text-gray-600 transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Right Section - Dashboard Preview */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden h-full">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500"></div>
        
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/70 via-transparent to-cyan-500/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/60 via-transparent to-pink-400/40"></div>
        
        {/* Animated Floating Shapes */}
        <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-r from-cyan-400/40 to-purple-500/40 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-16 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-cyan-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/25 to-pink-500/25 rounded-full mix-blend-multiply filter blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
        
        <div className="flex flex-col justify-center items-center text-center px-6 relative z-10 w-full max-h-full py-8">
          {/* Header Text with proper spacing */}
          <div className="mb-6 flex-shrink-0">
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
              Start building your business today.
            </h2>
            <p className="text-base lg:text-lg text-blue-100 max-w-md-4 leading-relaxed">
              Join thousands of businesses growing with our platform.
            </p>
          </div>
          
          {/* Dashboard Preview - Redesigned and properly positioned */}
          <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-3 flex-shrink min-h-0 overflow-hidden">
            <div className="space-y-3 h-full flex flex-col">
              {/* Setup Progress */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg flex-shrink-0">
                <div className="text-xs opacity-90">Setup Progress</div>
                <div className="text-base font-bold">85%</div>
                <div className="text-xs opacity-75">Almost ready to launch</div>
              </div>

              {/* Growth Metrics */}
              <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                <div className="bg-white border border-gray-200 p-2 rounded-lg">
                  <div className="text-xs text-gray-600">User Growth</div>
                  <div className="text-base font-bold text-gray-900">+247%</div>
                  <div className="text-xs text-green-600">↗ This month</div>
                </div>
                <div className="bg-white border border-gray-200 p-2 rounded-lg">
                  <div className="text-xs text-gray-600">Revenue Growth</div>
                  <div className="text-base font-bold text-gray-900">$12,450</div>
                  <div className="text-xs text-green-600">↗ Monthly recurring</div>
                </div>
              </div>

              {/* First Dashboard Preview */}
              <div className="bg-white border border-gray-200 p-2 rounded-lg flex-shrink-0">
                <div className="text-xs font-medium text-gray-900 mb-2">Your First Dashboard</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Team Members</span>
                    </div>
                    <span className="text-xs font-medium">5 Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Active Projects</span>
                    </div>
                    <span className="text-xs font-medium">12 Running</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Completed Tasks</span>
                    </div>
                    <span className="text-xs font-medium">89 Done</span>
                  </div>
                </div>
              </div>

              {/* Onboarding Steps */}
              <div className="bg-white border border-gray-200 p-2 rounded-lg flex-shrink-0">
                <div className="text-xs font-medium text-gray-900 mb-2">Getting Started</div>
                <div className="space-y-1">
                  {[
                    { step: 'Create your account', completed: true },
                    { step: 'Set up your team', completed: true },
                    { step: 'Import your data', completed: true },
                    { step: 'Customize dashboard', completed: false },
                    { step: 'Invite team members', completed: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-1 h-1 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-xs ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.step}
                      </span>
                      {item.completed && <span className="text-xs text-green-600 text-xs">✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-1 flex-shrink-0">
                <div className="bg-blue-50 p-1.5 rounded-lg text-center">
                  <div className="text-xs font-bold text-blue-600">24</div>
                  <div className="text-xs text-blue-600">Contacts</div>
                </div>
                <div className="bg-purple-50 p-1.5 rounded-lg text-center">
                  <div className="text-xs font-bold text-purple-600">8</div>
                  <div className="text-xs text-purple-600">Pipelines</div>
                </div>
                <div className="bg-green-50 p-1.5 rounded-lg text-center">
                  <div className="text-xs font-bold text-green-600">15</div>
                  <div className="text-xs text-green-600">Deals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}