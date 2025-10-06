import React from 'react';
import { Sparkles } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: 'Eligibility',
      content: 'You must be at least 18 years old to create an account.'
    },
    {
      title: 'Accounts & Responsibilities',
      items: [
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree not to share your login or misuse the platform.'
      ]
    },
    {
      title: 'Acceptable Use',
      content: 'You may not use Inflow to:',
      items: [
        'Send spam or abusive content.',
        'Violate any applicable laws.',
        'Interfere with or attempt to disrupt platform operations.'
      ]
    },
    {
      title: 'Subscriptions & Payments',
      items: [
        'Inflow is a subscription-based service billed on a recurring basis.',
        'Payments are non-refundable, unless required by law.',
        'You may cancel at any time, and your subscription will remain active until the end of the billing period.'
      ]
    },
    {
      title: 'Service Availability',
      content: 'We strive to keep Inflow available at all times. However, occasional downtime may occur for updates, maintenance, or unexpected issues.'
    },
    {
      title: 'Limitation of Liability',
      content: 'Inflow is provided "as is." We are not responsible for indirect damages such as lost profits, lost data, or business interruptions.'
    },
    {
      title: 'Updates to Terms',
      content: 'We may update these Terms from time to time. Continued use of Inflow means you accept the changes.'
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Welcome to Inflow! By signing up or using our platform, you agree to these terms:
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
              
              {section.content && (
                <p className="text-gray-600 leading-relaxed mb-4">{section.content}</p>
              )}
              
              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 flex items-start">
                      <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}