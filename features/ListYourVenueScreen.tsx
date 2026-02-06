
import React, { useState, useRef } from 'react';
import { Button } from '../components/SharedUI';

const ListYourVenueScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 4;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-indigo-50 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100">
                Phase 01
              </div>
              <h2 className="text-4xl font-black poppins text-slate-900 tracking-tight">Venue Profile</h2>
              <p className="text-slate-500 text-lg font-medium">Tell us about the identity of your function hall.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hall Display Name</label>
                <input required placeholder="e.g. Royal Imperial Gardens" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg placeholder:text-slate-300" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Primary Category</label>
                <select className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg appearance-none cursor-pointer">
                  <option>Wedding & Reception</option>
                  <option>Corporate Events</option>
                  <option>Private Parties</option>
                  <option>Concerts & Performances</option>
                </select>
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Address</label>
                <textarea required rows={3} placeholder="Provide the exact postal address for GPS navigation" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg placeholder:text-slate-300"></textarea>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Guest Capacity</label>
                <input required placeholder="e.g. 500 - 1500" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg placeholder:text-slate-300" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Pricing Model</label>
                <select className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg appearance-none cursor-pointer">
                  <option>Per Plate / Person</option>
                  <option>Flat Daily Rental</option>
                  <option>Custom Quotation Only</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-emerald-50 rounded-xl text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
                Phase 02
              </div>
              <h2 className="text-4xl font-black poppins text-slate-900 tracking-tight">Legal & Financials</h2>
              <p className="text-slate-500 text-lg font-medium">Verify your business for verified status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 flex items-center space-x-6">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">👤</div>
                 <div className="flex-1">
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Business Representative</p>
                    <h4 className="text-xl font-black text-indigo-900 poppins">Primary Contact Person</h4>
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <input required placeholder="Owner or Manager Name" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Official Phone</label>
                <input required type="tel" placeholder="+1 (555) 000-0000" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg" />
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Business PAN Card</label>
                  <input required placeholder="10 Digit PAN Number" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg uppercase" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">GSTIN Certificate</label>
                  <input required placeholder="GST Registration Number" className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-slate-900 font-bold transition-all text-lg uppercase" />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-purple-50 rounded-xl text-[10px] font-black text-purple-600 uppercase tracking-widest border border-purple-100">
                Phase 03
              </div>
              <h2 className="text-4xl font-black poppins text-slate-900 tracking-tight">Amenities Selection</h2>
              <p className="text-slate-500 text-lg font-medium">Select all premium features available at your venue.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Valet Parking', icon: '🚗' },
                { label: 'AC / Climate', icon: '❄️' },
                { label: 'Full Power', icon: '⚡' },
                { label: 'In-house Chef', icon: '👨‍🍳' },
                { label: 'Bar License', icon: '🍸' },
                { label: 'High Speed WiFi', icon: '📶' },
                { label: 'Bridal Suite', icon: '👰' },
                { label: 'LED Wall', icon: '📺' },
                { label: 'Garden Access', icon: '🌿' }
              ].map(am => (
                <label key={am.label} className="group flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2.5rem] border-4 border-transparent cursor-pointer hover:border-indigo-100 transition-all has-[:checked]:bg-indigo-600 has-[:checked]:border-indigo-200 shadow-sm">
                  <input type="checkbox" className="hidden" />
                  <span className="text-4xl mb-4 group-has-[:checked]:scale-110 transition-transform">{am.icon}</span>
                  <span className="text-sm font-black uppercase tracking-widest text-slate-400 group-has-[:checked]:text-white text-center">{am.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-rose-50 rounded-xl text-[10px] font-black text-rose-600 uppercase tracking-widest border border-rose-100">
                Phase 04
              </div>
              <h2 className="text-4xl font-black poppins text-slate-900 tracking-tight">Portfolio Media</h2>
              <p className="text-slate-500 text-lg font-medium">Capture attention with high-resolution imagery.</p>
            </div>

            <div className="space-y-8">
              <div 
                onClick={triggerFileInput}
                className="border-4 border-dashed border-slate-100 rounded-[4rem] p-16 md:p-20 text-center space-y-6 hover:border-indigo-200 hover:bg-slate-50 transition-all group cursor-pointer relative"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  multiple 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden" 
                />
                <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-5xl mx-auto group-hover:scale-110 transition-transform">
                  📸
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-slate-900 poppins">Add Venue Photos</p>
                  <p className="text-slate-400 font-medium max-w-sm mx-auto">Click to browse your device. Recommended: 1080p landscape shots.</p>
                </div>
                <div className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100">
                  Select Photos
                </div>
              </div>

              {uploadedImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="aspect-square relative rounded-[2rem] overflow-hidden group shadow-md border border-slate-100">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  {uploadedImages.length < 10 && (
                    <button 
                      onClick={triggerFileInput}
                      className="aspect-square bg-slate-50 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-slate-200 border-dashed text-slate-300 hover:border-indigo-300 hover:text-indigo-400 transition-all group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">+</span>
                      <span className="text-[10px] font-black uppercase tracking-widest mt-2">Add More</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center border-2 border-slate-100 border-dashed text-slate-200">
                       <span className="text-xs font-black uppercase tracking-widest">Reserved Slot</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-32">
      {/* Header Navigation */}
      <nav className="p-8 md:p-12 flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-xl z-50 border-b border-slate-100">
        <button 
          onClick={onBack} 
          className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-2xl hover:text-indigo-600 transition-all border border-slate-50 hover:scale-105 active:scale-95"
        >
          ←
        </button>
        
        <div className="hidden md:flex flex-col items-end">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2">Venue Registration</p>
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-700 ${i + 1 <= step ? 'w-12 bg-indigo-600' : 'w-4 bg-slate-200'}`} 
              />
            ))}
          </div>
        </div>

        <div className="w-16 block md:hidden"></div>
      </nav>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto w-full px-6 py-16">
        <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
          {/* Abstract background detail */}
          <div className="absolute top-0 right-0 p-32 bg-indigo-50/30 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            {renderStep()}

            <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col sm:flex-row gap-6">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)} 
                  className="flex-1 py-6 rounded-[2rem] border-2 border-slate-100 font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all text-sm"
                >
                  Back
                </button>
              )}
              <Button 
                label={step === totalSteps ? "Verify & Submit" : "Continue Phase"} 
                fullWidth 
                onClick={() => step < totalSteps ? setStep(step + 1) : alert('Congratulations! Your application is being reviewed by our compliance team.')} 
                className="flex-[2] py-6 text-lg shadow-[0_25px_50px_-12px_rgba(79,70,229,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center space-y-4">
           <div className="flex items-center space-x-2 text-slate-300">
             <span className="text-xl">🛡️</span>
             <p className="text-[10px] font-black uppercase tracking-[0.3em]">Secure 256-bit Encrypted Transmission</p>
           </div>
           <p className="text-slate-300 font-bold text-xs uppercase tracking-[0.2em]">BookMyFunctionHalls Venue Partner Network • Est. 2025</p>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ListYourVenueScreen;
