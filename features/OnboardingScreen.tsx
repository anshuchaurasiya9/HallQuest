
import React, { useState } from 'react';
import { Button } from '../components/SharedUI';

const ONBOARDING_DATA = [
  {
    title: "Dream Venues Await",
    desc: "Discover premium halls that match your style. From grand ballrooms to cozy lounges, find your perfect space effortlessly.",
    emoji: "🏰",
    color: "from-indigo-600 via-indigo-700 to-indigo-900",
    accent: "bg-white/10"
  },
  {
    title: "Seamless Planning",
    desc: "Compare amenities, capacity, and pricing in real-time. We help you make informed decisions for your special day.",
    emoji: "📅",
    color: "from-slate-800 via-slate-900 to-black",
    accent: "bg-white/10"
  },
  {
    title: "Direct Connections",
    desc: "Skip the middlemen. Connect directly with hall managers for transparent quotes and confirmed bookings.",
    emoji: "🤝",
    color: "from-blue-600 via-indigo-800 to-indigo-950",
    accent: "bg-white/10"
  }
];

const OnboardingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < ONBOARDING_DATA.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-white">
      {/* Visual Side */}
      <div className={`flex-1 flex flex-col items-center justify-center p-12 text-center transition-all duration-1000 bg-gradient-to-br ${ONBOARDING_DATA[step].color} relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 transition-all duration-700 transform hover:scale-105">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-3xl rounded-[4rem] flex items-center justify-center text-8xl md:text-9xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 animate-float">
            <span className="drop-shadow-2xl">{ONBOARDING_DATA[step].emoji}</span>
          </div>
        </div>

        <div className="mt-16 space-y-6 max-w-md relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white poppins leading-none tracking-tight animate-slideUp">
            {ONBOARDING_DATA[step].title}
          </h2>
          <p className="text-indigo-100/70 text-lg font-medium leading-relaxed px-4 animate-fadeIn">
            {ONBOARDING_DATA[step].desc}
          </p>
        </div>
      </div>

      {/* Control Side */}
      <div className="md:w-[550px] p-12 md:p-20 flex flex-col justify-between bg-white md:rounded-l-[4rem] shadow-[-30px_0_60px_rgba(0,0,0,0.05)] relative z-20">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {ONBOARDING_DATA.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-700 ${i === step ? 'w-12 bg-indigo-600' : 'w-4 bg-slate-100'}`}
              />
            ))}
          </div>
          <button 
            onClick={onComplete} 
            className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-indigo-600 transition-all hover:tracking-[0.3em]"
          >
            Skip
          </button>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-indigo-50 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100">
              Welcome to the Future
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 poppins leading-[1.1] tracking-tighter">
              The premium way to plan events.
            </h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              We've redesigned the venue booking experience from the ground up to be elegant, transparent, and lightning fast.
            </p>
          </div>
          
          <div className="space-y-6">
            <Button 
              label={step === ONBOARDING_DATA.length - 1 ? "Get Started" : "Continue"} 
              onClick={handleNext} 
              fullWidth 
              className="py-6 text-xl shadow-[0_20px_50px_-15px_rgba(79,70,229,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.4)]"
            />
            <div className="flex items-center justify-center space-x-3 text-slate-300">
               <div className="h-px w-8 bg-slate-100"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em]">Step {step + 1} of 3</p>
               <div className="h-px w-8 bg-slate-100"></div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-sm transition-transform hover:scale-110 cursor-pointer">
                <img src={`https://i.pravatar.cc/150?u=user${i + 20}`} alt="Community" className="grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Join 50k+</p>
            <p className="text-sm font-black text-slate-900 poppins">Happy Planners</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 1.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default OnboardingScreen;
