
import React, { useState, useEffect } from 'react';
import { Hall, User } from '../types';
import { Button } from '../components/SharedUI';

const DetailScreen: React.FC<{ 
  hall: Hall; 
  user: User | null;
  onBack: () => void;
  onAuthRequired: () => void;
}> = ({ hall, user, onBack, onAuthRequired }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'services'>('overview');
  const [showGallery, setShowGallery] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hall]);

  const handleEnquiryClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onAuthRequired();
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-32">
      {/* Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-md px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-100">
        <button onClick={onBack} className="flex items-center space-x-2 text-slate-600 font-bold hover:text-indigo-600 transition-all">
          <span className="text-xl">←</span> <span>Back to search</span>
        </button>
        <div className="flex items-center space-x-4">
          <button className="p-2.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 rounded-2xl transition-all border border-slate-100 text-lg">❤️</button>
          <button className="p-2.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-500 rounded-2xl transition-all border border-slate-100 text-lg">🔗</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Grid */}
            <div 
              onClick={() => setShowGallery(true)}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-[3rem] overflow-hidden shadow-2xl h-[450px] md:h-[600px] cursor-pointer group"
            >
              <div className="md:col-span-8 h-full relative overflow-hidden">
                <img src={hall.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={hall.name} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-4 h-full">
                <div className="overflow-hidden">
                  <img src={hall.images[1] || hall.images[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={hall.name} />
                </div>
                <div className="relative overflow-hidden">
                  <img src={hall.images[2] || hall.images[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={hall.name} />
                  <div className="absolute inset-0 bg-indigo-900/40 flex flex-col items-center justify-center text-white font-bold backdrop-blur-[2px] p-4 text-center">
                    <span className="text-3xl mb-1">+ {hall.images.length - 2}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black">View All Photos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
                    Premium {hall.category} Venue
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 poppins leading-none tracking-tight">{hall.name}</h1>
                  <p className="text-slate-500 text-lg flex items-center font-medium pt-2">
                    <span className="mr-2 text-2xl">📍</span> {hall.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">User Rating</p>
                    <div className="flex items-center space-x-1 justify-end">
                      <span className="text-2xl font-black text-slate-900 poppins">{hall.rating}</span>
                      <span className="text-yellow-400 text-xl">★</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-slate-100">
                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pricing Plan</p>
                  <p className="text-xl font-black text-indigo-600 poppins">{hall.priceRange}</p>
                </div>
                <div className="space-y-2 border-l border-slate-50 pl-6">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Max Capacity</p>
                  <p className="text-xl font-black text-slate-900 poppins">{hall.capacity.split(' ')[0]} PPL</p>
                </div>
                <div className="space-y-2 border-l border-slate-50 pl-6 hidden md:block">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Venue Area</p>
                  <p className="text-xl font-black text-slate-900 poppins">15,000 ft²</p>
                </div>
                <div className="space-y-2 border-l border-slate-50 pl-6 hidden md:block">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Verified Status</p>
                  <p className="text-xl font-black text-green-500 poppins flex items-center">
                    <span className="mr-2">✓</span> YES
                  </p>
                </div>
              </div>

              {/* Description Tabs */}
              <div className="space-y-8">
                <div className="flex border-b border-slate-100 space-x-10">
                  {(['overview', 'services', 'reviews'] as const).map(t => (
                    <button 
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`pb-4 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === t ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {t}
                      {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full animate-scaleX"></div>}
                    </button>
                  ))}
                </div>

                <div className="min-h-[300px]">
                  {activeTab === 'overview' && (
                    <div className="space-y-10 animate-fadeIn py-4">
                      <div className="prose prose-slate max-w-none">
                        <h3 className="text-2xl font-black text-slate-900 mb-4 poppins tracking-tight">Experience the Ambiance</h3>
                        <p className="text-slate-600 leading-relaxed text-lg font-medium">{hall.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-8 poppins tracking-tight">Included Amenities</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {hall.amenities.map(am => (
                            <div key={am} className="flex items-center space-x-4 bg-white p-6 rounded-[2rem] border-2 border-slate-50 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all">
                              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-xl">
                                ✨
                              </div>
                              <span className="text-base font-bold text-slate-700">{am}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'services' && (
                    <div className="space-y-8 py-4 animate-fadeIn">
                      <h3 className="text-2xl font-black text-slate-900 mb-6 poppins tracking-tight">Curated Event Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {hall.services.length > 0 ? hall.services.map((service, idx) => (
                          <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-2xl transition-all group">
                            <h4 className="font-black text-slate-900 text-xl mb-3 poppins group-hover:text-indigo-600 transition-colors">{service.name}</h4>
                            <p className="text-slate-500 text-base leading-relaxed mb-6 font-medium">{service.description}</p>
                            {service.price && (
                              <div className="inline-flex items-center bg-white px-4 py-2 rounded-xl text-indigo-600 font-black text-xs shadow-sm border border-slate-100">
                                <span className="mr-2 opacity-50">EST. COST:</span> {service.price}
                              </div>
                            )}
                          </div>
                        )) : (
                          <p className="text-slate-400 italic">Contact manager for specific services.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-8 py-4 animate-fadeIn">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-slate-900 poppins tracking-tight">Guest Reviews</h3>
                        <button className="bg-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-200 transition-all text-sm">Write Review</button>
                      </div>
                      <div className="space-y-10">
                        {hall.reviews.length > 0 ? hall.reviews.map((review, idx) => (
                          <div key={idx} className="bg-white border-b border-slate-100 pb-10 last:border-0">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 bg-indigo-50 border-2 border-white rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl shadow-sm">
                                  {review.userName.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900 text-lg">{review.userName}</h4>
                                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center text-yellow-400 space-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={i < review.rating ? "opacity-100" : "opacity-20"}>★</span>
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed italic font-medium">"{review.comment}"</p>
                          </div>
                        )) : (
                          <div className="text-center py-12 text-slate-400">
                             <p className="text-sm italic">No reviews yet for this venue.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area - Sticky Enquiry Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 space-y-8 relative overflow-hidden">
                {showSuccess && (
                  <div className="absolute inset-0 bg-indigo-600 z-50 flex flex-col items-center justify-center text-white text-center p-10 animate-fadeIn">
                    <div className="text-7xl mb-6 animate-bounce">🎊</div>
                    <h3 className="text-3xl font-black poppins mb-3">Enquiry Sent!</h3>
                    <p className="text-indigo-100 font-medium">Our venue specialist will reach out within 24 hours.</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 poppins tracking-tight">Book Your Dates</h3>
                  <p className="text-slate-400 text-sm font-medium">Fill in your event details below</p>
                </div>

                <form onSubmit={handleEnquiryClick} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Event Date</label>
                    <input required type="date" className="w-full p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-black font-bold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Guest Count</label>
                    <input required type="number" placeholder="Estimated attendance" className="w-full p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-black font-bold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Requirements</label>
                    <textarea placeholder="e.g. Vegetarian catering, specific stage setup..." rows={3} className="w-full p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-black font-bold transition-all"></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      label={isSubmitting ? "Processing..." : (user ? "Send Enquiry" : "Login to Send Enquiry")} 
                      fullWidth 
                      disabled={isSubmitting}
                      className={`py-6 text-lg shadow-2xl shadow-indigo-200 ${isSubmitting ? "animate-pulse" : ""}`}
                    />
                  </div>
                </form>

                {!user && (
                  <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-tighter">
                    Login is required to verify your contact information.
                  </p>
                )}

                <div className="pt-8 border-t border-slate-50">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-2xl border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                          <img src={`https://i.pravatar.cc/100?u=${hall.id + i}`} alt="user" />
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Active Interest</p>
                  </div>
                  <p className="text-[11px] text-indigo-400 text-center font-black uppercase tracking-tight">
                    {Math.floor(Math.random() * 15) + 3} users viewed this today
                  </p>
                </div>
              </div>

              {/* Assistance Card */}
              <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 text-8xl opacity-10 -rotate-12 translate-x-8 -translate-y-8 group-hover:rotate-0 transition-transform duration-700">📞</div>
                <h4 className="text-2xl font-black poppins relative z-10">Need Assistance?</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium relative z-10">Our venue experts can help you negotiate better rates and arrange site visits.</p>
                <button className="w-full py-4 rounded-[1.5rem] bg-white text-slate-900 font-black text-sm uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all relative z-10">
                  Call Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-slate-950 z-[100] overflow-y-auto animate-fadeIn flex flex-col">
          <div className="sticky top-0 p-8 flex justify-between items-center text-white bg-gradient-to-b from-slate-950 to-transparent">
            <div className="space-y-1">
              <h2 className="text-2xl font-black poppins uppercase tracking-tighter">{hall.name}</h2>
              <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.4em]">Official Venue Gallery</p>
            </div>
            <button 
              onClick={() => setShowGallery(false)}
              className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-3xl hover:bg-white/20 transition-all border border-white/10"
            >
              ✕
            </button>
          </div>
          <div className="max-w-6xl mx-auto w-full p-8 space-y-12">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {hall.images.map((img, idx) => (
                <div key={idx} className="rounded-[2.5rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] bg-slate-900 break-inside-avoid hover:scale-[1.02] transition-transform duration-500">
                  <img src={img} className="w-full h-auto object-cover" alt={`${hall.name} ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="p-20 text-center text-slate-600 text-sm font-black uppercase tracking-[1em]">
            End of Collection
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
