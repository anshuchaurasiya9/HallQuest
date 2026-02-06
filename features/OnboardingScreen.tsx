
import React, { useState } from 'react';
import { Button } from '../components/SharedUI';

const ONBOARDING_DATA = [
  {
    title: "Discover Nearby Halls",
    desc: "Use GPS to find perfect venues just minutes away from you. We connect you with verified local managers.",
    emoji: "📍",
    color: "bg-blue-50"
  },
  {
    title: "Compare & Choose",
    desc: "Easily check capacity, amenities, and price ranges side-by-side. Make informed decisions for your events.",
    emoji: "⚖️",
    color: "bg-indigo-50"
  },
  {
    title: "Direct Enquiries",
    desc: "Direct contact with hall managers. No middlemen, no hassle. Fast, secure, and reliable communication.",
    emoji: "📱",
    color: "bg-purple-50"
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
    <div className={`flex-1 flex flex-col md:flex-row transition-colors duration-500 ${ONBOARDING_DATA[step].color}`}>
      {/* Left side: Visuals (Mobile: Top, Desktop: Left) */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-12">
        <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-[3rem] flex items-center justify-center text-8xl md:text-9xl shadow-2xl animate-float">
          {ONBOARDING_DATA[step].emoji}
        </div>
        <div className="max-w-md space-y-4">
          <h2 className="text-4xl font-bold text-slate-900 poppins">{ONBOARDING_DATA[step].title}</h2>
          <p className="text-slate-600 text-lg leading-relaxed">{ONBOARDING_DATA[step].desc}</p>
        </div>
      </div>

      {/* Right side: Controls (Mobile: Bottom, Desktop: Right) */}
      <div className="md:w-[450px] p-12 bg-white flex flex-col justify-between md:rounded-l-[4rem] shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {ONBOARDING_DATA.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-12 bg-indigo-600' : 'w-3 bg-slate-200'}`}
              />
            ))}
          </div>
          <button onClick={onComplete} className="text-slate-400 font-bold hover:text-indigo-600 transition-colors">Skip</button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 poppins">The Venue Market</h3>
            <p className="text-sm text-slate-400">Join thousands of planners finding the best function halls in the city every day.</p>
          </div>
          <Button 
            label={step === ONBOARDING_DATA.length - 1 ? "Start Exploring" : "Continue"} 
            onClick={handleNext} 
            fullWidth 
            className="py-5 text-lg"
          />
        </div>

        <div className="flex items-center space-x-4 opacity-50 grayscale">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Trusted By</div>
          <span className="text-2xl">💍</span>
          <span className="text-2xl">🎉</span>
          <span className="text-2xl">💼</span>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
