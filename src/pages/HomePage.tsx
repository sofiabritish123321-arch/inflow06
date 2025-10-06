import React from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { Play, Users, Zap, Calendar, ChartBar as BarChart3, CircleCheck as CheckCircle, Star, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate?: (page: string) => void;
  onScrollToVideo?: () => void;
}

export default function HomePage({ onNavigate, onScrollToVideo }: HomePageProps) {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Centralized Client Management Hub',
      description: 'Keep all your client information, interactions, and history in one organized place.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Automated Workflows & Follow-ups',
      description: 'Set up smart automation to handle routine tasks and never miss important follow-ups.'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Built-in Booking & Scheduling',
      description: 'Let clients book appointments directly with integrated calendar management.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Data Insights for Smarter Decisions',
      description: 'Get actionable insights from your business data to make informed strategic decisions.'
    }
  ];

  const stats = [
    { label: 'Customer Satisfaction', value: '100%' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Support', value: '24/7' },
  ];

  const testimonials = [
    {
      name: 'Nora Ali',
      company: 'Digital Marketing Expert',
      text: 'Inflow transformed how I used to manage clients. The automation features alone now saves me 20 hours every week.',
      rating: 5
    },
    {
      name: 'Simone Brooks',
      company: 'Real Estate Agent',
      text: 'Having all my client info in one place makes my day so much easier. Honestly, it’s a game changer.',
      rating: 5
    },
    {
      name: 'Lillian Clarke',
      company: 'Nail Stylist',
      text: 'Finally, a platform that actually makes client management much more convenient. The ROI has been incredible.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-purple-100/30"></div>
          
          {/* Floating gradient shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-32 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/15 to-pink-400/15 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-60" style={{ animationDelay: '4s' }}></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FF4DA6%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 leading-tight tracking-tight">
             Elevate Your Sales With The All-in-One CRM Platform
            </h1>       
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed font-light">
              Automate client management and keep everything organized all in one place, 
              from onboarding to billing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => window.location.href = '/signup'}
                className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
              >
                Get Started
              </button>
              
              <button 
                onClick={onScrollToVideo}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 border border-pink-200/50 hover-lift"
              >
                <Play className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors" />
                <span>See Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 text-sm md:text-base font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              All You Need to Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Powerful features designed to help you manage clients more efficiently and grow your business faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-pink-200 transition-all duration-300 hover-lift shadow-sm hover:shadow-lg group"
              >
                <div className="text-pink-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              See Inflow in Action
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Watch how easy it is to transform your business operations
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-video bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/ydF-wofRmW8?rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=1"
                title="Inflow Demo Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-2xl"
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              Trusted With Thousands
            </h2>
            <p className="text-xl text-gray-600 font-light">
              See what our customers are saying about their Inflow experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift group"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic font-medium text-base leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="text-gray-900 font-bold">{testimonial.name}</p>
                  <p className="text-pink-600 text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="logo-carousel-section w-full bg-white py-12 overflow-hidden">
        <h2 className="text-4xl md:text-4xl font-black mb-12 text-center text-gray-900">Integrate with your favorite tools</h2>
        <div className="marquee-wrapper overflow-hidden relative w-full">
          <div className="marquee-track flex items-center gap-16 animate-marquee-scroll">
            {/* Full sequence (set A) */}
            <img src="/logo carousel integrations/facebook.png" alt="Facebook" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/google.png" alt="Google" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/linkedin.png" alt="LinkedIn" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/slack.png" alt="Slack" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/shippo.png" alt="Shippo" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/instagram.png" alt="Instagram" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/printful.png" alt="Printful" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/xero.png" alt="Xero" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/zapier.png" alt="Zapier" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/whatsapp.png" alt="WhatsApp" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/stripe.png" alt="Stripe" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/tiktok.png" alt="TikTok" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/shopify.png" alt="Shopify" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/quickbooks.png" alt="QuickBooks" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/clio.png" alt="Clio" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            
            {/* Duplicate sequence (set A copy) for seamless loop */}
            <img src="/logo carousel integrations/facebook.png" alt="Facebook" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/google.png" alt="Google" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/linkedin.png" alt="LinkedIn" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/slack.png" alt="Slack" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/shippo.png" alt="Shippo" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/instagram.png" alt="Instagram" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/printful.png" alt="Printful" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/xero.png" alt="Xero" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/zapier.png" alt="Zapier" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/whatsapp.png" alt="WhatsApp" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/stripe.png" alt="Stripe" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/tiktok.png" alt="TikTok" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/shopify.png" alt="Shopify" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/quickbooks.png" alt="QuickBooks" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
            <img src="/logo carousel integrations/clio.png" alt="Clio" className="h-12 md:h-16 object-contain flex-shrink-0" loading="eager" decoding="sync" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-light">
              Join thousands of successful businesses using Inflow to streamline their operations and accelerate growth.
            </p>
            <button 
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
            >
              Start Your 7-Day Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}