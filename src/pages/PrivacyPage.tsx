import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      items: [
        'Account Information: Name, email, company details.',
        'Platform Usage Data: Interactions with Inflow\'s features (CRM, marketing, automation).',
        'Billing Information: Payment details processed by secure third-party providers.'
      ]
    },
    {
      title: 'How We Use Your Information',
      items: [
        'To provide access to the Inflow platform.',
        'To improve our services and develop new features.',
        'To send important updates, account notices, and support responses.',
        'To prevent fraud and maintain security.'
      ]
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 font-light">
              At Inflow, your privacy matters. We are committed to protecting the information you share with us and being transparent about how we use it.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your personal data. We may share information only with trusted third-party providers that enable Inflow to function (e.g., payment processors, hosting providers).
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your data while your account is active or as required by law. You can request deletion of your account data at any time.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You may request access, correction, or deletion of your personal data by contacting us at{' '}
              <a href="mailto:support@inflow.com" className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                info@inflow.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}