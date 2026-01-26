
import React, { useState, useEffect } from 'react';
import { Hall } from '../types';
import { Button } from '../components/SharedUI';
import { getVenueAIInsight } from '../services/geminiService';

const DetailScreen: React.FC<{ hall: Hall; onBack: () => void }> = ({ hall, onBack }) => {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'services'>('overview');

  useEffect(() => {
    const fetchInsight = async () => {
      const insight = await getVenueAIInsight(hall.name, hall.amenities);
      setAiInsight(insight);
    };
    fetchInsight();
  }, [hall]);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-24">
      {/* Media Header */}
      <div className="relative h-72">
        <img src={hall.images[0]} className="w-full h-full object-cover" alt={hall.name} />
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 bg-white/30 backdrop-blur-lg border border-white/30 text-white rounded-full flex items-center justify-center text-xl"
        >
          ←
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="px-6 -mt-12 relative z-10 space-y-6">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 poppins leading-tight">{hall.name}</h1>
              <p className="text-slate-400 text-sm mt-1">📍 {hall.location}</p>
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full text-green-600 font-bold text-xs">
              AVAILABLE
            </div>
          </div>

          <div className="flex justify-between items-center py-4 border-y border-slate-100">
            <div className="text-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Rating</p>
              <p className="text-lg font-bold text-slate-900">⭐ {hall.rating}</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-100"></div>
            <div className="text-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Capacity</p>
              <p className="text-lg font-bold text-slate-900">{hall.capacity.split(' ')[0]}</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-100"></div>
            <div className="text-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pricing</p>
              <p className="text-lg font-bold text-slate-900 text-indigo-600">{hall.priceRange}</p>
            </div>
          </div>

          {aiInsight && (
            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm">✨</span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Concierge Summary</span>
              </div>
              <p className="text-sm text-indigo-900 italic leading-relaxed font-medium">"{aiInsight}"</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 sticky top-0 bg-white z-20">
          {(['overview', 'services', 'reviews'] as const).map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-4 text-sm font-bold capitalize transition-all ${activeTab === t ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 poppins">Description</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{hall.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 poppins">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {hall.amenities.map(am => (
                  <div key={am} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl">
                    <span className="text-lg">✅</span>
                    <span className="text-sm font-medium text-slate-700">{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="py-8 text-center text-slate-400 space-y-4 animate-fadeIn">
             <div className="text-4xl">🍽️</div>
             <p className="text-sm">In-house catering and decoration services available. Contact the manager for current packages.</p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 flex space-x-4 z-50">
        <button className="flex-1 bg-slate-100 py-4 rounded-2xl font-bold text-slate-800 hover:bg-slate-200 transition-all flex items-center justify-center">
           <span className="mr-2">📞</span> Call
        </button>
        <button 
          onClick={() => setIsEnquiryOpen(true)}
          className="flex-[2] bg-indigo-600 py-4 rounded-2xl font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center"
        >
           Send Enquiry
        </button>
      </div>

      {/* Simple Enquiry Modal */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end">
          <div className="bg-white w-full rounded-t-[3rem] p-8 animate-slideUp max-w-md mx-auto relative">
             <button onClick={() => setIsEnquiryOpen(false)} className="absolute top-6 right-8 text-2xl text-slate-300">✕</button>
             <h2 className="text-2xl font-bold text-slate-900 mb-2 poppins">Request Call-back</h2>
             <p className="text-slate-500 text-sm mb-8">Tell {hall.name} about your event needs.</p>
             
             <div className="space-y-4">
                <input type="date" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="number" placeholder="Estimated Guests" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <textarea placeholder="Message (Optional)" rows={3} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                <Button label="Submit Enquiry" fullWidth onClick={() => {
                  alert('Enquiry sent successfully!');
                  setIsEnquiryOpen(false);
                }} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
