import React from 'react';
import { 
  Home, 
  Shield, 
  Users, 
  TrendingUp, 
  MapPin, 
  Search, 
  Star, 
  Award,
  CheckCircle,
  Heart,
  Key,
  Building,
  Globe,
  Handshake,
  Target,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
  const features = [
    {
      icon: Home,
      title: "Premium Properties",
      description: "Curated selection of high-quality residential and commercial properties across prime locations."
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "End-to-end security with verified listings, legal documentation, and protected payments."
    },
    {
      icon: Users,
      title: "Expert Agents",
      description: "Professional real estate agents with years of experience and local market expertise."
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description: "Real-time market trends, price analysis, and investment insights to make informed decisions."
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Properties in the most sought-after neighborhoods with excellent connectivity and amenities."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Advanced filtering system to find your perfect property based on your specific requirements."
    }
  ];

  const stats = [
    { icon: Building, value: "50K+", label: "Properties Listed" },
    { icon: Users, value: "25K+", label: "Happy Customers" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Globe, value: "100+", label: "Cities Covered" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to ensure you find your dream property."
    },
    {
      icon: CheckCircle,
      title: "Transparency",
      description: "Clear pricing, honest communication, and no hidden fees. What you see is what you get."
    },
    {
      icon: Handshake,
      title: "Trust & Reliability",
      description: "Built on trust with verified properties, genuine reviews, and reliable service delivery."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize the real estate buying experience."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Key className="text-emerald-500" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              About Our Platform
            </h2>
            <Home className="text-blue-500" size={40} />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in real estate journey. We connect dreamers with their perfect homes through innovation, expertise, and unwavering commitment to excellence.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="text-white" size={32} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Revolutionizing Real Estate Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              We're not just another real estate platform. We're your dedicated partner in finding the perfect property that matches your dreams, budget, and lifestyle. With cutting-edge technology and human expertise, we make property buying seamless and stress-free.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Verified property listings with authentic details</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">24/7 customer support and expert guidance</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Transparent pricing with no hidden charges</span>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl p-8 backdrop-blur-sm border border-emerald-500/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                  <DollarSign className="text-emerald-500 mb-4" size={32} />
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Best Prices</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Competitive pricing with great value for money</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                  <Star className="text-yellow-500 mb-4" size={32} />
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Top Rated</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Highest customer satisfaction ratings</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                  <Shield className="text-blue-500 mb-4" size={32} />
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Secure</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bank-level security for all transactions</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                  <Award className="text-purple-500 mb-4" size={32} />
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Awarded</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Industry recognition and awards</p>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Why Choose Our Platform?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <value.icon className="text-white" size={32} />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h3>
            <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers who found their perfect homes with us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                <Link to='/allProperties'>Explore Properties</Link>
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-300">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;