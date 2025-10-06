import React from 'react';
import { Users, Zap, Calendar, ChartBar as BarChart3, TrendingUp, Bot, Sparkles } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Centralized Client Management Hub',
      description: 'Keep all your client information, interactions, and history in one organized place.',
      benefits: ['Client profiles', 'Interaction history', 'Contact management', 'Data organization']
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Automated Workflows & Follow-ups',
      description: 'Set up smart automation to handle routine tasks and never miss important follow-ups.',
      benefits: ['Email automation', 'Task scheduling', 'Follow-up reminders', 'Workflow templates']
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Built-in Booking & Scheduling',
      description: 'Let clients book appointments directly with integrated calendar management.',
      benefits: ['Online booking', 'Calendar sync', 'Appointment reminders', 'Availability management']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Data Insights for Smarter Decisions',
      description: 'Get actionable insights from your business data to make informed strategic decisions.',
      benefits: ['Business analytics', 'Performance metrics', 'Data visualization', 'Strategic insights']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Advanced Reporting & Analytics',
      description: 'Gain deep insights into your business performance.',
      benefits: ['Comprehensive dashboards', 'Customizable reports', 'Performance tracking', 'Growth optimization']
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'AI-Powered Automation',
      description: 'Streamline operations with intelligent automation.',
      benefits: ['Predictive lead scoring', 'Automated customer segmentation', 'Smart workflow recommendations', 'Efficiency optimization']
    }
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
              Powerful Features
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Everything you need to manage clients, automate workflows, and grow your business efficiently.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-pink-200 transition-all duration-300 shadow-sm hover:shadow-lg hover-lift group"
            >
              <div className="text-pink-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <ul className="mt-4 space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="text-sm text-gray-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mr-2 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl max-w-4xl mx-auto hover-lift">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-light">
              See how these powerful features can streamline your business operations and accelerate growth.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
              >
                Sign Up & Access Inflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}