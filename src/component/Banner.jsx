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
