
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Review form state
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [localReviews, setLocalReviews] = useState(hall.reviews);

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
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: hall.name,
      text: `Check out this amazing venue: ${hall.name} in ${hall.location}`,
      url: url,
    };

    try {
      // The Web Share API often rejects non-HTTP(S) URLs like blob: or data:
      const isSharableUrl = url.startsWith('http');

      if (navigator.share && isSharableUrl) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard for restricted environments or missing API
        await navigator.clipboard.writeText(url);
        alert('Venue link copied to clipboard!');
      }
    } catch (err: any) {
      // Ignore AbortError which occurs when user cancels the share sheet
      if (err.name !== 'AbortError') {
        console.error('Sharing failed:', err);
        // Secondary fallback to ensure user gets the link regardless of error
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (clipboardErr) {
          console.error('Clipboard fallback also failed:', clipboardErr);
        }
      }
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onAuthRequired();
      return;
    }
    const review = {
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    setLocalReviews([review, ...localReviews]);
    setIsReviewFormOpen(false);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto no-scrollbar pb-20">
      {/* Detail Header Navigation */}
      <nav className="bg-white/95 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-40 border-b border-pink-100">
        <button onClick={onBack} className="flex items-center space-x-3 text-brand-primary font-black uppercase text-xs tracking-widest hover:opacity-70 transition-opacity">
          <span>← Back to search</span>
        </button>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-3 rounded-xl text-lg transition-all active:scale-90 ${isWishlisted ? 'bg-brand-primary text-white shadow-lg shadow-pink-200' : 'bg-brand-accent text-brand-primary'}`}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
          <button 
            onClick={handleShare}
            className="p-3 bg-brand-accent rounded-xl text-brand-primary text-lg hover:scale-110 transition-transform active:scale-95"
          >
            🔗
          </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-10">
        <div className="space-y-12">
            
            {/* Gallery Montage */}
            <div 
              onClick={() => setShowGallery(true)}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl relative group"
            >
              <div className="absolute top-6 left-6 z-10">
                 <div className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-xl shadow-xl">Premium Venue</div>
              </div>
              <div className="md:col-span-8 h-full relative overflow-hidden">
                <img src={hall.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={hall.name} />
              </div>
              <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-4 h-full">
                <div className="overflow-hidden">
                  <img src={hall.images[1] || hall.images[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={hall.name} />
                </div>
                <div className="relative overflow-hidden">
                  <img src={hall.images[2] || hall.images[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={hall.name} />
                  <div className="absolute inset-0 bg-brand-dark/40 flex flex-col items-center justify-center text-white backdrop-blur-[1px] hover:backdrop-blur-0 transition-all">
                    <span className="text-3xl font-black mb-1">+{hall.images.length - 2}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Photos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10 bg-white p-10 rounded-[3rem] shadow-sm border border-pink-50">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-black text-brand-dark poppins tracking-tighter leading-none">{hall.name}</h1>
                  <p className="text-slate-500 font-medium text-lg flex items-center">
                    <span className="mr-2 opacity-50 text-brand-primary text-2xl">📍</span> {hall.location} 
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-pink-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Capacity</p>
                    <p className="text-lg font-black text-brand-dark poppins">{hall.capacity}</p>
                  </div>
                  <div className="space-y-1 border-l border-pink-50 pl-8">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Category</p>
                    <p className="text-lg font-black text-brand-dark poppins">{hall.category}</p>
                  </div>
                  <div className="space-y-1 border-l border-pink-50 pl-8">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Rating</p>
                    <p className="text-lg font-black text-brand-secondary poppins flex items-center">⭐ {hall.rating}</p>
                  </div>
                  <div className="space-y-1 border-l border-pink-50 pl-8">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Reviews</p>
                    <p className="text-lg font-black text-brand-dark poppins">{localReviews.length}+</p>
                  </div>
                </div>

                {/* Tabs Header */}
                <div className="flex space-x-10 border-b border-pink-50 overflow-x-auto no-scrollbar">
                  {(['overview', 'services', 'reviews'] as const).map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] relative transition-colors ${activeTab === tab ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {tab}
                      {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-full animate-scaleX"></div>}
                    </button>
                  ))}
                </div>

                {/* Tabs Content */}
                <div className="min-h-[300px] animate-fadeIn">
                  {activeTab === 'overview' && (
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-black text-brand-dark poppins">About the Venue</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{hall.description}</p>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-2xl font-black text-brand-dark poppins">Amenities</h3>
                        <div className="flex flex-wrap gap-4">
                          {hall.amenities.map(am => (
                            <span key={am} className="bg-brand-accent px-6 py-3 rounded-2xl border border-brand-primary/10 text-brand-primary font-bold text-sm">✨ {am}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'services' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-black text-brand-dark poppins">Available Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hall.services.map((service, i) => (
                          <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-pink-50 space-y-3 group hover:border-brand-primary/30 transition-all">
                             <div className="flex items-center justify-between">
                                <h4 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{service.name}</h4>
                                {service.price && <span className="text-[10px] font-black uppercase tracking-widest bg-brand-secondary/10 text-brand-secondary px-3 py-1 rounded-lg">{service.price}</span>}
                             </div>
                             <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                          </div>
                        ))}
                      </div>
                      {hall.services.length === 0 && (
                        <p className="text-slate-400 italic">No specific external services listed. Please contact the manager for custom requirements.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <h3 className="text-2xl font-black text-brand-dark poppins">What Users Say</h3>
                          <div className="flex items-center space-x-2 bg-brand-secondary text-white px-4 py-2 rounded-xl shadow-lg shadow-green-100">
                            <span className="font-black">{hall.rating}</span>
                            <span className="text-xs">/ 5.0</span>
                          </div>
                        </div>
                        <Button 
                          label={isReviewFormOpen ? "Cancel Review" : "Write a Review"} 
                          variant={isReviewFormOpen ? "outline" : "primary"}
                          onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                          className="text-[10px] px-6 py-3"
                        />
                      </div>

                      {/* Review Form */}
                      {isReviewFormOpen && (
                        <div className="bg-brand-accent/30 p-8 rounded-[2.5rem] border-2 border-dashed border-brand-primary/20 space-y-6 animate-fadeIn">
                          <h4 className="font-black text-brand-dark poppins">Your Experience Matters</h4>
                          <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div className="flex items-center space-x-4">
                               <p className="text-sm font-bold text-slate-600">Rate your visit:</p>
                               <div className="flex space-x-2">
                                 {[1, 2, 3, 4, 5].map(star => (
                                   <button 
                                     key={star} 
                                     type="button" 
                                     onClick={() => setNewReview({...newReview, rating: star})}
                                     className={`text-2xl transition-all ${star <= newReview.rating ? 'text-yellow-400 scale-110' : 'text-slate-200 grayscale'}`}
                                   >
                                     ★
                                   </button>
                                 ))}
                               </div>
                            </div>
                            <textarea 
                              required 
                              rows={4}
                              placeholder="Tell us about the ambiance, service, and food..."
                              className="w-full p-5 bg-white border border-pink-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
                              value={newReview.comment}
                              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            ></textarea>
                            <Button label="Post My Review" fullWidth />
                          </form>
                        </div>
                      )}

                      <div className="space-y-8">
                        {localReviews.map((r, i) => (
                          <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-pink-50 space-y-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-pink-50">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                   <div className="w-12 h-12 bg-white rounded-2xl border border-pink-100 flex items-center justify-center text-xl font-black text-brand-primary shadow-sm">
                                      {r.userName.charAt(0)}
                                   </div>
                                   <div>
                                      <p className="font-bold text-slate-900">{r.userName}</p>
                                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{r.date}</p>
                                   </div>
                                </div>
                                <div className="flex text-yellow-400 text-sm">
                                   {Array.from({ length: 5 }).map((_, idx) => (
                                     <span key={idx} className={idx < r.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                                   ))}
                                </div>
                             </div>
                             <p className="text-slate-600 font-medium italic leading-relaxed">"{r.comment}"</p>
                          </div>
                        ))}
                        {localReviews.length === 0 && !isReviewFormOpen && (
                          <div className="py-20 text-center space-y-4">
                             <div className="text-6xl grayscale opacity-20">✍️</div>
                             <p className="text-slate-400 font-bold">Be the first to review this venue!</p>
                             <button onClick={() => setIsReviewFormOpen(true)} className="text-brand-primary font-black uppercase text-xs tracking-[0.2em] underline underline-offset-4">Start Writing</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Booking Card */}
              <div className="space-y-8">
                <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-brand-primary/5 space-y-8 sticky top-32">
                  <div className="space-y-1">
                    <h4 className="text-xl font-black poppins text-brand-dark">Direct Enquiry</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bookings for 2025 now open</p>
                  </div>

                  <form onSubmit={handleEnquiryClick} className="space-y-5">
                    <input required placeholder="Your Full Name" className="w-full p-5 bg-slate-50 border border-pink-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    <input required placeholder="Phone Number" className="w-full p-5 bg-slate-50 border border-pink-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    <input required type="date" className="w-full p-5 bg-slate-50 border border-pink-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    
                    <Button label={isSubmitting ? "Sending..." : "Request Call Back"} fullWidth variant="primary" className="py-5 shadow-xl shadow-pink-100" />
                  </form>
                  
                  {showSuccess && <p className="text-center text-brand-secondary font-black animate-bounce">Request Sent Successfully! 🎉</p>}
                  
                  <div className="pt-4 flex justify-center">
                    <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-brand-primary transition-colors">Safety Policy & Privacy</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-brand-dark/95 z-[100] p-10 overflow-y-auto animate-fadeIn backdrop-blur-md">
           <div className="flex justify-between items-center text-white mb-10 max-w-6xl mx-auto">
              <div>
                 <h2 className="text-3xl font-black poppins tracking-tighter">{hall.name}</h2>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Official Gallery Montage</p>
              </div>
              <button onClick={() => setShowGallery(false)} className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl hover:bg-white/20 transition-all">✕</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {hall.images.map((img, i) => (
               <div key={i} className="rounded-3xl overflow-hidden shadow-2xl h-80">
                  <img src={img} className="w-full h-full object-cover" alt="Venue" />
               </div>
             ))}
           </div>
        </div>
      )}

      <style>{`
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-scaleX { animation: scaleX 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DetailScreen;
