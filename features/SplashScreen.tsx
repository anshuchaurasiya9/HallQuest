
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-indigo-600 text-white">
      <div className="relative">
        <div className="w-24 h-24 bg-white/20 rounded-3xl backdrop-blur-md animate-ping absolute inset-0"></div>
        <div className="w-24 h-24 bg-white flex items-center justify-center rounded-3xl shadow-xl relative z-10 animate-bounce">
          <span className="text-4xl">🏛️</span>
        </div>
      </div>
      <h1 className="mt-8 text-3xl font-bold tracking-tight poppins text-center px-4">BookMyFunctionHalls</h1>
      <p className="mt-2 text-indigo-100/70 font-medium">Elevating Celebrations</p>
      
      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="w-6 h-6 border-4 border-indigo-200 border-t-white rounded-full animate-spin"></div>
        <p className="mt-4 text-xs uppercase tracking-widest text-indigo-200/50">Production Ready v1.0</p>
      </div>
    </div>
  );
};

export default SplashScreen;
