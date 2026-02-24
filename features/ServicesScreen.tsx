
import React from 'react';
import { Button } from '../components/SharedUI';

const SERVICES_DATA = [
  {
    title: "Premium Catering",
    desc: "Exotic menus from top-tier chefs. We offer buffet, sit-down, and live station options for every palate.",
    icon: "🍽️",
    features: ["Global Cuisine", "Live Counters", "Custom Drinks"],
    price: "From $25/plate",
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Cinematic Photography",
    desc: "Capture every smile and tear. Professional photographers using high-end gear for stunning memories.",
    icon: "📸",
    features: ["4K Video", "Drone Coverage", "Quick Delivery"],
    price: "From $500/event",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Themed Decoration",
    desc: "Transform your chosen hall into a wonderland. Custom floral and lighting designs tailored for you.",
    icon: "✨",
    features: ["Floral Entry", "Stage Setup", "Ambient Lighting"],
    price: "Custom Quotes",
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Music & Entertainment",
    desc: "Set the mood with the city's best DJs, live bands, and performers. Sound systems included.",
    icon: "🎵",
    features: ["Live Bands", "Celebrity DJs", "Pro Sound"],
    price: "From $300",
    color: "bg-pink-50 text-pink-600"
  },
  {
    title: "Makeup & Styling",
    desc: "Look your best on your big day with our professional salon partners specializing in makeup.",
    icon: "💄",
    features: ["Bridal Makeup", "Hair Styling", "On-site Service"],
    price: "From $150",
    color: "bg-rose-50 text-rose-600"
  },
  {
    title: "Event Concierge",
    desc: "A dedicated manager to handle all logistics while you enjoy your celebration without stress.",
    icon: "🕴️",
    features: ["Guest Mgt", "Timing Control", "Vendor Liaison"],
    price: "Fixed Fee",
    color: "bg-emerald-50 text-emerald-600"
  }
];

const ServicesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-32">
      {/* Header Section */}
      <div className="bg-brand-primary px-6 md:px-12 py-24 md:py-32 text-white relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack} 
            className="group flex items-center space-x-3 mb-12 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-2xl transition-all border border-white/10 text-sm font-bold poppins"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="uppercase tracking-widest">Explore Halls</span>
          </button>
          
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-black poppins tracking-tight leading-[1.1]">
              Elevate Your <span className="text-pink-200">Celebration.</span>
            </h1>
            <p className="text-xl md:text-2xl text-pink-100/80 font-medium leading-relaxed">
              We've handpicked the finest event professionals in the city. Professional, vetted, and ready to make your vision a reality.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-16 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white p-10 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-pink-50 flex flex-col h-full hover:shadow-[0_40px_80px_-15px_rgba(231,46,119,0.1)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className={`w-24 h-24 ${service.color} rounded-[2.5rem] flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                {service.icon}
              </div>
              
              <div className="flex-1 space-y-5 relative z-10">
                <h3 className="text-3xl font-black text-slate-900 poppins tracking-tight leading-none group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  {service.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {service.features.map(f => (
                    <span key={f} className="text-[10px] bg-slate-50 text-slate-400 px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-slate-100 group-hover:border-pink-100 group-hover:text-brand-primary transition-all">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Pricing Guide</p>
                  <p className="text-xl font-black text-slate-900 poppins tracking-tight">{service.price}</p>
                </div>
                <button className="bg-brand-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-pink-100 hover:bg-brand-primary/90 transition-all active:scale-95">
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesScreen;
