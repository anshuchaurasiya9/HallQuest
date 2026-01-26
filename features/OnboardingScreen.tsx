
import React, { useState } from 'react';
import { Button } from '../components/SharedUI';

const ONBOARDING_DATA = [
  {
    title: "Discover Nearby Halls",
    desc: "Use GPS to find perfect venues just minutes away from you.",
    emoji: "📍",
    color: "bg-blue-50"
  },
  {
    title: "Compare & Choose",
    desc: "Easily check capacity, amenities, and price ranges side-by-side.",
    emoji: "⚖️",
    color: "bg-indigo-50"
  },
  {
    title: "One-Tap Enquiry",
    desc: "Direct contact with hall managers. No middlemen, no hassle.",
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
    <div className={`flex-1 flex flex-col transition-colors duration-500 ${ONBOARDING_DATA[step].color}`}>
      <div className="p-6 flex justify-end">
        <button onClick={onComplete} className="text-slate-400 font-medium hover:text-indigo-600 transition-colors">Skip</button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-7xl shadow-2xl animate-float">
          {ONBOARDING_DATA[step].emoji}
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 poppins">{ONBOARDING_DATA[step].title}</h2>
          <p className="text-slate-600 leading-relaxed">{ONBOARDING_DATA[step].desc}</p>
        </div>
      </div>

      <div className="p-8 space-y-8 bg-white rounded-t-[3rem] shadow-2xl">
        <div className="flex justify-center space-x-2">
          {ONBOARDING_DATA.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
        <Button 
          label={step === ONBOARDING_DATA.length - 1 ? "Get Started" : "Next"} 
          onClick={handleNext} 
          fullWidth 
        />
      </div>
    </div>
  );
};

export default OnboardingScreen;
