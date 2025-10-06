import React from 'react';
import { Users, Target, Shield, Zap, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission-Driven',
      description: 'We help businesses grow smarter with modern, powerful, and easy-to-use tools.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer-Focused',
      description: 'Your success is our success. We build features that solve real business problems.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime you can count on.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation-First',
      description: 'We constantly evolve our platform with the latest technology and best practices.'
    }
  ];

  const features = [
    'Customer relationship management (CRM)',
    'Marketing automation',
    'Sales pipelines',
    'Client communication tools',
    'Reporting and analytics'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-purple-100/30"></div>
          
          {/* Floating gradient shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FF4DA6%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 leading-tight tracking-tight">
              About Inflow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              At Inflow, our mission is to help businesses grow smarter with modern, powerful, 
              and easy-to-use tools. We provide an all-in-one platform designed to simplify 
              marketing, sales, and client management, so you can focus on results, not complexity.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        {/* Features We Provide */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            What We Provide
          </h2>
          
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl max-w-4xl mx-auto hover-lift">
            <p className="text-gray-600 text-lg mb-8 text-center">
              With Inflow, businesses get access to features like:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-pink-200 transition-all duration-300 shadow-sm hover:shadow-lg hover-lift"
              >
                <div className="text-pink-500 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Our Philosophy
          </h2>
          
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover-lift">
            <p className="text-xl text-gray-600 leading-relaxed mb-6 font-light">
              We believe software should work for you, not against you. That's why Inflow combines 
              enterprise-grade functionality with simplicity and reliability, all under one secure platform.
            </p>
            
            <p className="text-lg text-gray-500">
              Every feature we build is designed with your success in mind, helping you streamline 
              operations, improve client relationships, and grow your business more efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}