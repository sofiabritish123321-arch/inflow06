import React from 'react';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const handleStripeRedirect = (plan: string) => {
    // In a real app, this would redirect to Stripe Checkout
    console.log(`Redirecting to Stripe checkout for ${plan} plan`);
    alert(`Redirecting to Stripe checkout for ${plan} plan - this would integrate with your Stripe account`);
  };

  const standardFeatures = [
    'All the Tools to Capture More Leads',
    'Nurture & Close Leads into Customers',
    'Full Online Booking, Pipelines, Social Cal, Website Builder, and More!',
    'Unlimited Contacts & Users, Add as Many Contacts & Users as You Need!',
    'Setup Up To Three Sub-Accounts',
    '7-day free trial'
  ];

  const premiumFeatures = [
    'Everything In Starter Plan',
    'Api Access - Integrate with Anything',
    'Unlimited Sub-Accounts - As Many Client Accounts as You Need for One Price!',
    'A Complete Control Over the Looks and Feel of the Platform!',
    '7-day free trial'
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
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Scale your business with the right plan for your needs. All plans include a 7-day free trial.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Plan */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 relative shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <div className="flex items-center mb-6">
              <Zap className="w-6 h-6 text-pink-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Standard Plan</h2>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline mb-2">
                <span className="text-5xl font-black text-gray-900">$59.99</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">$47.99</span>
                <span className="text-gray-600 ml-2">/month billed yearly</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {standardFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleStripeRedirect('standard')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
            >
              Start Free Trial
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-3xl p-8 border-2 border-pink-200 relative shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </span>
            </div>

            <div className="flex items-center mb-6">
              <Crown className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Premium Plan</h2>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline mb-2">
                <span className="text-5xl font-black text-gray-900">$74.99</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">$59.99</span>
                <span className="text-gray-600 ml-2">/month billed yearly</span>
              </div>
              <p className="text-sm bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mt-2 font-semibold">Save 20% with yearly billing</p>
            </div>

            <ul className="space-y-4 mb-8">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleStripeRedirect('premium')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
            >
              Start Free Trial
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged again.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is my data secure?</h3>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade security measures including SSL encryption, regular backups, and strict access controls to protect your business data.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How easy is it to get started?</h3>
              <p className="text-gray-600">
                Very easy! Our onboarding process takes just minutes, and our intuitive interface means you can start managing clients right away. Plus, our support team is here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}