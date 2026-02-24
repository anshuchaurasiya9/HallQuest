
import React, { useState, useRef } from 'react';
import { Button } from '../components/SharedUI';

const AMENITY_CATEGORIES = [
  {
    name: 'CORE INFRASTRUCTURE',
    items: [
      { id: 'valet', label: 'VALET PARKING', icon: '🚗' },
      { id: 'power', label: 'FULL POWER', icon: '⚡' },
      { id: 'ac', label: 'AC / CLIMATE', icon: '❄️' },
    ]
  },
  {
    name: 'HOSPITALITY',
    items: [
      { id: 'chef', label: 'IN-HOUSE CHEF', icon: '👨‍🍳' },
      { id: 'bar', label: 'BAR LICENSE', icon: '🍸' },
      { id: 'suite', label: 'BRIDAL SUITE', icon: '👰' },
    ]
  },
  {
    name: 'TECHNOLOGY & OUTDOORS',
    items: [
      { id: 'wifi', label: 'HIGH SPEED WIFI', icon: '📶' },
      { id: 'led', label: 'LED WALL', icon: '📺' },
      { id: 'garden', label: 'GARDEN ACCESS', icon: '🌿' },
    ]
  }
];

const ListYourVenueScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 4;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [...prev, reader.result as string].slice(0, 8)); // Max 8 images
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] flex items-center space-x-6 border border-indigo-100/50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">👤</div>
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Business Representative</p>
                <h2 className="text-2xl font-black text-slate-800 poppins">Primary Contact Person</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <input placeholder="Owner or Manager Name" className="w-full p-6 bg-slate-50/50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-lg" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Official Phone</label>
                <input placeholder="+91 (000) 000-0000" className="w-full p-6 bg-slate-50/50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-lg" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Business PAN Card</label>
                <input placeholder="10 DIGIT PAN NUMBER" className="w-full p-6 bg-slate-50/50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-lg uppercase" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">GSTIN Certificate</label>
                <input placeholder="GST REGISTRATION NUMBER" className="w-full p-6 bg-slate-50/50 rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-lg uppercase" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-brand-accent rounded-xl text-[10px] font-black text-brand-primary uppercase tracking-widest border border-brand-primary/10">
                Phase 02
              </div>
              <h2 className="text-4xl font-black poppins text-slate-900 tracking-tight">Venue Profile & Location</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hall Display Name</label>
                <input placeholder="e.g. Royal Imperial Gardens" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-lg" />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Primary Category</label>
                <select className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-lg appearance-none">
                  <option>Wedding & Reception</option>
                  <option>Corporate Events</option>
                  <option>Private Parties</option>
                  <option>Birthday Parties</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Guest Capacity</label>
                <input placeholder="Max capacity (e.g. 1500)" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-lg" />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Street Address</label>
                <textarea rows={2} placeholder="Building No, Street Name, Sector, Near Landmark..." className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-lg" />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">City / Town</label>
                <input placeholder="e.g. Mumbai" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-lg" />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Pin Code / ZIP</label>
                <input placeholder="6-digit PIN" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-lg" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black poppins text-slate-900 tracking-tight">Amenities Selection</h2>
              <p className="text-slate-400 font-medium">Grouped by category for easier navigation.</p>
            </div>
            
            <div className="space-y-12">
              {AMENITY_CATEGORIES.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-px flex-1 bg-slate-100"></div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{cat.name}</span>
                    <div className="h-px flex-1 bg-slate-100"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {cat.items.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => toggleAmenity(item.id)}
                        className={`relative p-8 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 transition-all duration-500 border-4 ${selectedAmenities.includes(item.id) ? 'bg-white border-brand-primary shadow-2xl scale-105' : 'bg-slate-50/50 border-transparent hover:border-slate-100 active:scale-95'}`}
                      >
                        <span className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest text-center ${selectedAmenities.includes(item.id) ? 'text-brand-primary' : 'text-slate-400'}`}>
                          {item.label}
                        </span>
                        
                        {selectedAmenities.includes(item.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/80 rounded-[2.2rem] animate-fadeIn backdrop-blur-[2px]">
                             <div className="flex flex-col items-center">
                                <div className="w-12 h-12 mb-2 flex items-center justify-center text-3xl">🔌</div>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Plugged In</span>
                             </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black poppins text-slate-900 tracking-tight">Visual Showcase</h2>
              <p className="text-slate-400 font-medium">Your first impression starts with these photos.</p>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative border-4 border-dashed border-indigo-100 rounded-[4rem] p-16 md:p-24 text-center space-y-6 hover:bg-indigo-50/30 transition-all cursor-pointer group bg-slate-50/30"
            >
              <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleFileChange} className="hidden" />
              <div className="w-24 h-24 bg-white rounded-[2.2rem] flex items-center justify-center text-4xl mx-auto shadow-xl group-hover:rotate-12 transition-transform">📸</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800 poppins">Upload Venue Photos</h3>
                <p className="text-slate-400 font-medium text-sm">Tap to browse your library. Best result with landscape 16:9 ratio.</p>
              </div>
              <div className="pt-4">
                <div className="inline-flex bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-200">Select Photos</div>
              </div>
            </div>

            {/* Dynamic Photo Slots */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Photo Gallery ({uploadedImages.length}/8)</p>
                {uploadedImages.length > 0 && <button onClick={() => setUploadedImages([])} className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">Clear All</button>}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => {
                  const image = uploadedImages[i];
                  return (
                    <div key={i} className="aspect-square bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center relative overflow-hidden group">
                      {image ? (
                        <>
                          <img src={image} className="w-full h-full object-cover" alt={`Venue ${i + 1}`} />
                          <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="bg-white/20 backdrop-blur-md p-3 rounded-xl hover:bg-white/40 transition-colors">🗑️</button>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center space-y-2 opacity-30 group-hover:opacity-60 transition-opacity">
                           <div className="text-2xl">🖼️</div>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reserved Slot</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-32">
      <nav className="p-8 md:p-12 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-xl z-50 border-b border-slate-50">
        <button onClick={onBack} className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-xl hover:text-brand-primary transition-all border border-slate-50 active:scale-90">←</button>
        <div className="flex flex-col items-end">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-3">Onboarding Step {step}/4</p>
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-700 ${i + 1 <= step ? 'w-10 bg-brand-primary' : 'w-3 bg-slate-100'}`} />
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto w-full px-6 py-12">
        <div className="space-y-12">
          {renderStep()}
          
          <div className="pt-12 flex flex-col sm:flex-row gap-6">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)} 
                className="flex-1 py-6 rounded-[2rem] border-2 border-slate-100 font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 transition-all active:scale-95"
              >
                Back
              </button>
            )}
            <Button 
              label={step === totalSteps ? "Finish Registration" : "Save & Continue"} 
              fullWidth 
              onClick={() => step < totalSteps ? setStep(step + 1) : alert('Venue listing submitted for review!')} 
              className="flex-[2] py-6 shadow-2xl shadow-pink-100 text-lg" 
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ListYourVenueScreen;
