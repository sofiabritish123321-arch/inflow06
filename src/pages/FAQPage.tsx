import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won\'t be charged again. There are no cancellation fees or penalties.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures including SSL encryption, regular backups, and strict access controls to protect your business data. All data is encrypted both in transit and at rest, and we maintain compliance with industry security standards.'
    },
    {
      question: 'How easy is it to get started?',
      answer: 'Very easy! Our onboarding process takes just minutes, and our intuitive interface means you can start managing clients right away. We provide setup guides, video tutorials, and our support team is here to help you get the most out of Inflow.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards including Visa, MasterCard, American Express, and Discover. Payments are processed securely through Stripe, and you can update your payment method at any time through your account settings.'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 7-day free trial for both our Standard and Premium plans. No credit card is required to start your trial, and you can upgrade or downgrade at any time during or after the trial period.'
    },
    {
      question: 'Can I import my existing data?',
      answer: 'Absolutely. We provide easy import tools that work with CSV files and can connect to popular CRM and business management platforms. Our support team can also assist with data migration to ensure a smooth transition.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including email support for all users, priority support for Premium customers, detailed documentation, video tutorials, and a knowledge base. Most support requests are answered within 24 hours.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will take effect at the end of your current billing period. We\'ll prorate any charges appropriately.'
    },
    {
      question: 'Is there a limit to the number of clients I can manage?',
      answer: 'No, both our Standard and Premium plans include unlimited client records. You can manage as many clients as your business needs without any additional per-client charges.'
    },
    {
      question: 'Do you offer integrations with other tools?',
      answer: 'Yes! We integrate with popular tools including Google Calendar, Outlook, Zapier, and many others. Our Premium plan also includes API access for custom integrations with your existing business tools.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Find answers to common questions about Inflow. Can't find what you're looking for? Feel free to contact our support team.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl border border-gray-100 hover:border-pink-200 transition-all duration-300 shadow-sm hover:shadow-lg hover-lift"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
                >
                  <h3 className="text-xl font-bold text-gray-900 pr-8">{faq.question}</h3>
                  <div className="text-pink-500 flex-shrink-0">
                    {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover-lift">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is here to help. Get in touch and we'll get back to you as soon as possible.
              </p>
              <a
                href="mailto:info@inflow.com"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/#contact';
                  setTimeout(() => {
                    if (window.location.pathname === '/') {
                      const event = new CustomEvent('navigate', { detail: 'contact' });
                      window.dispatchEvent(event);
                    }
                  }, 100);
                }}
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25 cursor-pointer"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}