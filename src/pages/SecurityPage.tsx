import React from 'react';
import { Shield, Lock, Server, Eye, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Encryption',
      description: 'All data is encrypted in transit (SSL/TLS) and at rest using industry-standard protocols.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Access Controls',
      description: 'Strict role-based permissions ensure only authorized team members can access sensitive systems.'
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: 'Backups',
      description: 'Your data is backed up regularly to ensure reliability and protection against data loss.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Monitoring',
      description: 'Continuous monitoring helps detect and respond to potential threats in real-time.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: 'Best Practices',
      description: 'Our infrastructure is powered by trusted providers and adheres to industry compliance standards.'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Threat Detection',
      description: 'Proactively detects and mitigates potential security threats in real time.'
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
              Security
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              We take security seriously and follow industry best practices to keep your data safe.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-pink-200 transition-all duration-300 shadow-sm hover:shadow-lg hover-lift"
            >
              <div className="text-pink-500 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover-lift">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Business is Protected</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Your business information and customer data are always protected within Inflow. 
              We maintain the highest standards of security and compliance to ensure your peace 
              of mind while you focus on growing your business.
            </p>
          </div>
        </div>

        {/* Additional Security Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Protection</h3>
            <p className="text-gray-600 leading-relaxed">
              All customer data is encrypted using AES-256 encryption and stored in secure, 
              geographically distributed data centers with 24/7 monitoring and support.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance</h3>
            <p className="text-gray-600 leading-relaxed">
              We adhere to industry-standard compliance frameworks and regularly undergo 
              security audits to ensure we meet the highest standards of data protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}