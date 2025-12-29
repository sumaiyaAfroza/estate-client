import React from "react";
import { 
  ArrowRight, Home, MapPin, Search, Shield, Users, 
  Sparkles, Award, CheckCircle, MousePointer2, 
  Building2, Key, Star, PlayCircle 
} from "lucide-react";

const Banner = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/Y9TGmmh6/banner.jpg')",
      }}
    >
      <style>{`
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(1deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        @keyframes rotate-border { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
      `}</style>

      {/* Deep Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/60 to-slate-950/15 z-0"></div>
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent z-0"></div> */}

      {/* Ambient Background Lights */}
      {/* <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow"></div> */}
      {/* <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div> */}

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        
        {/* Upper Tag */}
        <div className="mb-8 flex items-center gap-3 py-2 px-5 rounded-full glass-morphism animate-slide-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-blue-100 text-xs font-bold uppercase tracking-widest">
             New Luxury Properties Added Today
          </span>
        </div>

        {/* Main Title Section */}
        <div className="text-center mb-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-slide-up">
             
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent font-bold italic">Discover Your Dream Property</span>
          </h1>
          <p className="text-lg md:text-xl text-white
          . font-light max-w-2xl mx-auto leading-relaxed opacity-90">
            Experience the new standard of real estate. We connect you with architectural wonders and exclusive estates that define luxury living.
          </p>
        </div>


        {/* Floating User Badges / Social Proof */}
        <div className="flex flex-col items-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
           <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                +2k
              </div>
           </div>
           <p className="text-slate-400 text-sm">Join <span className="text-white font-bold">12,000+</span> happy homeowners worldwide</p>
        </div>

        {/* Feature Highlights Group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass-morphism p-6 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="text-blue-400" size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">Secure Investments</h3>
            <p className="text-slate-400 text-sm">Every property undergoes a rigorous 50-point legal verification process.</p>
          </div>
          <div className="glass-morphism p-6 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="text-purple-400" size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">Virtual 3D Tours</h3>
            <p className="text-slate-400 text-sm">Walk through your future home from anywhere in the world with 4K VR.</p>
          </div>
          <div className="glass-morphism p-6 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Key className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-white font-bold mb-2">Fast-Track Closing</h3>
            <p className="text-slate-400 text-sm">Average closing time of just 14 days with our dedicated legal team.</p>
          </div>
        </div>
      </div>

      {/* Floating Interactive Cards (Right Side) */}
      <div className="absolute left-10 top-30   hidden xl:block animate-float-slow">
        <div className="glass-morphism p-2 rounded-3xl w-50 rotate-3 hover:rotate-0 transition-transform duration-500">
           <div className="relative mb-4">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300" className="rounded-2xl h-30 w-60 object-cover" alt="Villa" />
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-bold">
                $4.2M
              </div>
           </div>
           <div className="flex items-center justify-between mb-2">
              <span className="text-white font-bold text-sm">Skyline Penthouse</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-white text-xs">4.9</span>
              </div>
           </div>
           <div className="flex gap-2">
              <span className="text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded-md">4 Beds</span>
              <span className="text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded-md">3 Baths</span>
              <span className="text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded-md">3200 sqft</span>
           </div>
        </div>
      </div>

      

      {/* Scroll Down Visual */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <p className="text-white text-[10px] uppercase tracking-widest font-bold">Discover more</p>
        <div className="w-[2px] h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>
      
    </section>
  );
};

export default Banner;




// import React from "react";
// import { ArrowRight, Home, MapPin, TrendingUp, Shield, Users, Sparkles, Award, CheckCircle } from "lucide-react";

// const Banner = () => {
//   return (
//     <section
//       className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
//       }}
//     >
//       <style>{`
//         @keyframes slideUp {
//           from { 
//             transform: translateY(50px) scale(0.95);
//             opacity: 0;
//           }
//           to { 
//             transform: translateY(0) scale(1);
//             opacity: 1;
//           }
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
        
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); opacity: 0.8; }
//           50% { transform: scale(1.1); opacity: 1; }
//         }
        
//         @keyframes shimmer {
//           0% { background-position: -1000px 0; }
//           100% { background-position: 1000px 0; }
//         }
        
//         @keyframes rotateSlow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes slideInLeft {
//           from {
//             transform: translateX(-100px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             transform: translateX(100px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes gradientShift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
        
//         @keyframes bounce {
//           0%, 100% { 
//             transform: translateY(0);
//           }
//           50% { 
//             transform: translateY(-15px);
//           }
//         }

//         @keyframes glow {
//           0%, 100% { 
//             box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
//           }
//           50% { 
//             box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(99, 102, 241, 0.4);
//           }
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
        
//         .animate-slide-up {
//           animation: slideUp 1s ease-out forwards;
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 1.5s ease-out forwards;
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         .animate-pulse {
//           animation: pulse 3s ease-in-out infinite;
//         }
        
//         .animate-shimmer {
//           background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
//           background-size: 1000px 100%;
//           animation: shimmer 3s infinite linear;
//         }
        
//         .animate-rotate-slow {
//           animation: rotateSlow 25s linear infinite;
//         }
        
//         .animate-slide-left {
//           animation: slideInLeft 1s ease-out forwards;
//         }
        
//         .animate-slide-right {
//           animation: slideInRight 1s ease-out forwards;
//         }
        
//         .animate-gradient-shift {
//           background-size: 200% auto;
//           animation: gradientShift 6s ease infinite;
//         }
        
//         .animate-bounce {
//           animation: bounce 2.5s ease-in-out infinite;
//         }

//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }

//         .animate-twinkle {
//           animation: twinkle 2s ease-in-out infinite;
//         }
        
//         .hover-glow:hover {
//           box-shadow: 0 10px 40px rgba(59, 130, 246, 0.4), 0 0 20px rgba(99, 102, 241, 0.3);
//           transform: translateY(-8px) scale(1.02);
//         }
        
//         .hover-glow {
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//         }
        
//         .text-shadow {
//           text-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
//         }
        
//         .glass-effect {
//           background: rgba(255, 255, 255, 0.12);
//           backdrop-filter: blur(16px);
//           border: 1px solid rgba(255, 255, 255, 0.18);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
//         }

//         .stat-card {
//           background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.1));
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.15);
//         }

//         .btn-primary {
//           background: linear-gradient(135deg, #3b82f6, #6366f1);
//           position: relative;
//           overflow: hidden;
//         }

//         .btn-primary::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
//           transition: left 0.5s;
//         }

//         .btn-primary:hover::before {
//           left: 100%;
//         }
//       `}</style>

//       {/* Enhanced Overlay with Gradient Mesh */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-slate-900/90 to-indigo-950/85 z-0"></div>
//       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-0"></div>
      
//       {/* Animated Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         {/* Floating Buildings with Glow */}
//         <div className="absolute top-1/4 left-10 w-24 h-32 bg-gradient-to-b from-blue-600/30 to-indigo-700/20 rounded-t-lg animate-float shadow-lg shadow-blue-500/20" style={{animationDelay: '0s'}}></div>
//         <div className="absolute top-1/3 right-20 w-32 h-40 bg-gradient-to-b from-indigo-600/25 to-blue-700/20 rounded-t-lg animate-float shadow-lg shadow-indigo-500/20" style={{animationDelay: '1.5s'}}></div>
//         <div className="absolute bottom-1/3 left-1/4 w-20 h-28 bg-gradient-to-b from-blue-500/20 to-indigo-600/15 rounded-t-lg animate-float shadow-lg shadow-blue-500/15" style={{animationDelay: '3s'}}></div>
        
//         {/* Glowing Architectural Rings */}
//         <div className="absolute top-1/2 left-1/4 w-64 h-64 border-2 border-blue-400/30 rounded-full animate-rotate-slow shadow-lg shadow-blue-500/10"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-indigo-400/20 rounded-full animate-rotate-slow shadow-lg shadow-indigo-500/10" style={{animationDirection: 'reverse', animationDuration: '30s'}}></div>
        
//         {/* Enhanced Glowing Particles */}
//         <div className="absolute top-20 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-twinkle shadow-lg shadow-blue-400/50"></div>
//         <div className="absolute bottom-1/2 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-twinkle shadow-lg shadow-cyan-400/50" style={{animationDelay: '1s'}}></div>
//         <div className="absolute top-1/3 right-10 w-3 h-3 bg-indigo-400 rounded-full animate-twinkle shadow-lg shadow-indigo-400/50" style={{animationDelay: '2s'}}></div>
//         <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-purple-400 rounded-full animate-twinkle shadow-lg shadow-purple-400/50" style={{animationDelay: '1.5s'}}></div>
//         <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-twinkle shadow-lg shadow-blue-300/50" style={{animationDelay: '2.5s'}}></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 text-center text-white px-6 max-w-7xl">
//         {/* Enhanced Top Badge */}
//         <div className="inline-flex items-center gap-3 glass-effect rounded-full px-6 py-3 mb-10 animate-slide-up hover-glow">
//           <div className="p-1.5 bg-green-500/20 rounded-full">
//             <TrendingUp className="text-green-400" size={18} />
//           </div>
//           <span className="text-sm font-semibold text-blue-100 flex items-center gap-2">
//             <Sparkles size={14} className="text-yellow-400" />
//             Property Values Up 15% This Year
//           </span>
//         </div>

//         {/* Enhanced Heading with Better Typography */}
//         <h1 className="text-xl md:text-5xl font-black leading-tight mb-8 text-shadow animate-slide-up">
//           Discover Your <br />
//           <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent animate-gradient-shift inline-block">
//             Dream Property
//           </span>
//         </h1>

//         <p className="text-xl md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
//           Find, buy, or rent your perfect home from our exclusive collection of <span className="text-blue-300 font-semibold">premium properties</span> worldwide.
//         </p>

//         {/* Enhanced Stats Bar with Cards */}
//         <div className="flex flex-wrap justify-center gap-6 mb-14 animate-fade-in" style={{animationDelay: '0.4s'}}>
//           <div className="stat-card rounded-2xl px-6 py-4 hover-glow">
//             <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">10K+</div>
//             <div className="text-blue-200 text-sm font-medium mt-1">Properties Listed</div>
//           </div>
//           <div className="stat-card rounded-2xl px-6 py-4 hover-glow">
//             <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">98%</div>
//             <div className="text-blue-200 text-sm font-medium mt-1">Client Satisfaction</div>
//           </div>
//           <div className="stat-card rounded-2xl px-6 py-4 hover-glow">
//             <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50+</div>
//             <div className="text-blue-200 text-sm font-medium mt-1">Cities Covered</div>
//           </div>
//           <div className="stat-card rounded-2xl px-6 py-4 hover-glow">
//             <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">15Y</div>
//             <div className="text-blue-200 text-sm font-medium mt-1">Market Experience</div>
//           </div>
//         </div>

//         {/* Enhanced CTA Buttons */}
//         <div className="flex flex-col sm:flex-row gap-5 justify-center animate-slide-up" style={{animationDelay: '0.6s'}}>
//           <button className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold text-white hover-glow shadow-xl">
//             <Home size={22} />
//             <span>Browse Properties</span>
//             <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
//           </button>
          
//           <button className="inline-flex items-center justify-center gap-3 px-10 py-5 glass-effect rounded-2xl text-lg font-bold text-white hover-glow">
//             <MapPin size={22} />
//             <span>Find Location</span>
//           </button>
//         </div>

//         {/* Trust Indicators */}
//         <div className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-in" style={{animationDelay: '0.8s'}}>
//           <div className="flex items-center gap-2 text-green-400">
//             <CheckCircle size={18} />
//             <span className="text-sm font-medium">Verified Listings</span>
//           </div>
//           <div className="flex items-center gap-2 text-blue-400">
//             <Award size={18} />
//             <span className="text-sm font-medium">Award Winning</span>
//           </div>
//           <div className="flex items-center gap-2 text-purple-400">
//             <Shield size={18} />
//             <span className="text-sm font-medium">Secure Transactions</span>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Floating Feature Cards */}
//       <div className="absolute bottom-24 left-12 hidden lg:block animate-slide-left" style={{animationDelay: '1s'}}>
//         <div className="glass-effect rounded-2xl p-6 w-60 hover-glow">
//           <div className="flex items-start gap-4 mb-4">
//             <div className=" bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-xl animate-glow">
//               <Shield className="text-blue-300" size={24} />
//             </div>
//             <div>
//               <h3 className="text-white font-bold text-lg">Verified Listings</h3>
//               <p className="text-blue-200 text-sm mt-1">100% authentic properties with legal documentation</p>
//             </div>
//           </div>
//           <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent rounded-full"></div>
//         </div>
//       </div>

//       <div className="absolute top-10 right-12 hidden lg:block animate-slide-right" style={{animationDelay: '1.2s'}}>
//         <div className="glass-effect rounded-2xl p-6 w-60 hover-glow">
//           <div className="flex items-start gap-4 mb-4">
//             <div className="p-3 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-xl animate-glow">
//               <Users className="text-indigo-300" size={24} />
//             </div>
//             <div>
//               <h3 className="text-white font-bold text-lg">Expert Agents</h3>
//               <p className="text-blue-200 text-sm mt-1">Professional guidance from certified real estate experts</p>
//             </div>
//           </div>
//           <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent rounded-full"></div>
//         </div>
//       </div>

//       {/* Enhanced Property Showcase Card */}
//       <div className="absolute top-24 right-12 hidden xl:block animate-float" style={{animationDelay: '0.5s'}}>
//         <div className="relative w-80 rounded-3xl overflow-hidden shadow-2xl hover-glow">
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
//           <div className="absolute top-5 left-5 z-20 flex gap-2">
//             <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
//               <Sparkles size={12} />
//               FEATURED
//             </span>
//             <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
//               HOT
//             </span>
//           </div>
//           <div className="absolute bottom-5 left-5 right-5 z-20">
//             <h3 className="text-white font-black text-2xl mb-1">Luxury Villa</h3>
//             <p className="text-blue-200 text-sm flex items-center gap-1 mb-3">
//               <MapPin size={14} />
//               Miami Beach, Florida
//             </p>
//             <div className="flex items-center justify-between">
//               <span className="text-yellow-400 text-2xl font-black">$2.5M</span>
//               <span className="text-gray-200 text-sm bg-white/10 backdrop-blur px-3 py-1 rounded-full">5 🛏️ | 4 🛁</span>
//             </div>
//           </div>
//           <div className="animate-shimmer absolute inset-0 z-5"></div>
//           <img 
//             src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
//             alt="Luxury Villa" 
//             className="w-full h-80 object-cover"
//           />
//         </div>
//       </div>

//       {/* Enhanced Scroll Indicator */}
//       <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
//         <div className="flex flex-col items-center">
//           <span className="text-blue-200 text-sm font-medium mb-3 flex items-center gap-2">
//             <Sparkles size={14} className="text-yellow-400" />
//             Explore More
//           </span>
//           <div className="w-7 h-11 border-2 border-blue-300/60 rounded-full flex justify-center hover:border-blue-300 transition-colors">
//             <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;








// ======================================================================================









// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


// const banners = [
//   {
//     id: 1,
//     image: 'https://i.postimg.cc/hvLYNkgz/1.jpg',
//     alt: 'Luxury Apartment',
//     title: 'Find Your Dream Home',
//     subtitle: 'Explore thousands of verified properties from trusted agents across the country.',
//     buttonText: 'Browse Properties',
//     buttonLink: '/allProperties',
//   },
//   {
//     id: 2,
//     image: 'https://i.postimg.cc/g2XVJvX4/pexels-binyaminmellish-1396122.jpg',
//     alt: 'Modern Living',
//     title: 'Live Where You Love',
//     subtitle: 'From city apartments to countryside villas, find your perfect match today.',
//     buttonText: 'Start Searching',
//     buttonLink: '/allProperties', // Added buttonLink
//   },
// //   {
// //     id: 3,
// //     image: 'https://i.postimg.cc/vmK6WvZV/images-1.jpg',
// //     alt: 'Secure Investment',
// //     title: 'Invest in Your Future',
// //     subtitle: 'Buy or sell properties with confidence and ease through Nestoria.',
// //     buttonText: 'Explore Listings',
// //     buttonLink: '/listings', // Added buttonLink
// //   },
//   {
//     id: 3,
//     image: 'https://i.postimg.cc/RFVq3Bp9/pexels-nextvoyage-1481105.jpg',
//     alt: 'Verified Listings',
//     title: 'Only Verified Properties',
//     subtitle: 'We ensure every listing is real, secure, and verified by our team.',
//     buttonText: 'Check Now',
//     buttonLink: '/advertiseSection', // Added buttonLink
//   },
// ];


// export default function Banner() {
//     const [current, setCurrent] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);

//     useEffect(() => {
//         if (isPaused) return;
//         const interval = setInterval(() => {
//             setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//         }, 4000);
//         return () => clearInterval(interval);
//     }, [isPaused]);

//     // const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);
//     // const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);

//     return (
//         <div
//             className="relative w-full h-[700px] aspect-video overflow-hidden rounded-xl shadow-2xl"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//         >
//             {banners.map((banner, index) => (
//                 <div
//                     key={banner.id}
//                     className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out
//                          ${ index === current ? ' scale-100 z-10' : ' scale-105 z-0' }
                       
//                    `}
//                 >
//                     <img
//                         src={banner.image}
//                         alt={banner.alt}
//                         className="w-full h-full object-cover brightness-75"
//                         draggable={false}
//                     />
//                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
//                         <div className="relative max-w-3xl px-4">
//                             <h2
//                                 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-2xl ${
//                                     index === current ? 'animate-slideIn' : ''
//                                 }`}
//                             >
//                                 {banner.title}
//                             </h2>
//                             <p
//                                 className={`text-lg sm:text-xl md:text-2xl font-medium mb-8 drop-shadow-lg ${
//                                     index === current ? 'animate-slideIn' : ''
//                                 }`}
//                             > 
//                                 {banner.subtitle}
//                             </p>
//                             <div className="text-center">
//                                 <Link
//                                     to={banner.buttonLink}
//                                     className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-full text-lg font-semibold shadow-lg"
//                                 >
//                                     {banner.buttonText}
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//       {/* Slide Controls */}
//       {/* <button
//         onClick={prevSlide}
//         className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
//         aria-label="Previous slide"
//       >
//         <ChevronLeftIcon className="w-8 h-8" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
//         aria-label="Next slide"
//       >
//         <ChevronRightIcon className="w-8 h-8" />
//       </button> */}

//       {/* Indicator Dots */}
//        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
//                 {banners.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrent(index)}
//                         className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${
//                             index === current
//                                 ? 'bg-blue-500 scale-150'
//                                 : 'bg-gray-300/60 hover:bg-gray-200/80'
//                         }`}
//                         aria-label={`Go to slide ${index + 1}`}
//                     />
//                 ))}
//             </div>

//       {/* Animation Styles */}
//       <style>
//                 {`
//                     @keyframes slideIn {
//                         from {
//                             opacity: 0;
//                             transform: translateY(20px);
//                         }
//                         to {
//                             opacity: 1;
//                             transform: translateY(0);
//                         }
//                     }
//                     @keyframes bounceIn {
//                         from {
//                             opacity: 0;
//                             transform: scale(0.8);
//                         }
//                         to {
//                             opacity: 1;
//                             transform: scale(1);
//                         }
//                     }
//                     .animate-slideIn {
//                         animation: slideIn 0.8s ease-out;
//                     }
//                     .animate-bounceIn {
//                         animation: bounceIn 0.6s ease-out;
//                     }
//                 `}
//             </style>
//     </div>
//   );
// }