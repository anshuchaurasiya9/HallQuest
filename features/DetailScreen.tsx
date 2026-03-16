
import React, { useState, useEffect } from 'react';
import { Hall, User } from '../types';
import { Button } from '../components/SharedUI';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, Star, MessageSquare, Info, ShieldCheck, Camera } from 'lucide-react';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hall.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hall.images.length) % hall.images.length);
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
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="p-3 bg-brand-accent rounded-xl text-brand-primary text-lg hover:scale-110 transition-transform active:scale-95"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        <div className="space-y-8 md:space-y-12">
            
            {/* Image Carousel */}
            <div className="relative h-[350px] md:h-[600px] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img 
                    src={hall.images[currentImageIndex]} 
                    className="w-full h-full object-cover" 
                    alt={`${hall.name} - ${currentImageIndex + 1}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 md:p-8 pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all active:scale-90 pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all active:scale-90 pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
                {hall.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${i === currentImageIndex ? 'w-8 md:w-12 bg-white' : 'w-1.5 md:w-2 bg-white/40'}`}
                  />
                ))}
              </div>

              {/* Badge & Gallery Trigger */}
              <div className="absolute top-6 left-6 z-10">
                 <div className="bg-brand-primary text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-xl">Premium Venue</div>
              </div>
              
              <button 
                onClick={() => setShowGallery(true)}
                className="absolute top-6 right-6 z-10 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span className="hidden md:inline">View All Photos</span>
                <span className="md:hidden">{hall.images.length}</span>
              </button>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2 space-y-8 md:space-y-10 bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] shadow-sm border border-pink-50">
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-3xl md:text-5xl font-black text-brand-dark poppins tracking-tighter leading-tight">{hall.name}</h1>
                  <p className="text-slate-500 font-medium text-base md:text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-brand-primary opacity-70" /> {hall.location} 
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-6 md:py-8 border-y border-pink-50">
                  <div className="space-y-0.5 md:space-y-1">
                    <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">Capacity</p>
                    <p className="text-base md:text-lg font-black text-brand-dark poppins">{hall.capacity}</p>
                  </div>
                  <div className="space-y-0.5 md:space-y-1 border-l border-pink-50 pl-4 md:pl-8">
                    <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">Category</p>
                    <p className="text-base md:text-lg font-black text-brand-dark poppins">{hall.category}</p>
                  </div>
                  <div className="space-y-0.5 md:space-y-1 border-l border-pink-50 pl-4 md:pl-8">
                    <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">Rating</p>
                    <p className="text-base md:text-lg font-black text-brand-secondary poppins flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" /> {hall.rating}
                    </p>
                  </div>
                  <div className="space-y-0.5 md:space-y-1 border-l border-pink-50 pl-4 md:pl-8">
                    <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">Reviews</p>
                    <p className="text-base md:text-lg font-black text-brand-dark poppins">{localReviews.length}+</p>
                  </div>
                </div>

                {/* Tabs Header */}
                <div className="flex space-x-6 md:space-x-10 border-b border-pink-50 overflow-x-auto no-scrollbar">
                  {(['overview', 'services', 'reviews'] as const).map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 md:pb-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] relative transition-colors shrink-0 ${activeTab === tab ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {tab}
                      {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-full animate-scaleX"></div>}
                    </button>
                  ))}
                </div>

                {/* Tabs Content */}
                <div className="min-h-[250px] md:min-h-[300px] animate-fadeIn">
                  {activeTab === 'overview' && (
                    <div className="space-y-8 md:space-y-10">
                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-xl md:text-2xl font-black text-brand-dark poppins">About the Venue</h3>
                        <p className="text-slate-600 leading-relaxed text-base md:text-lg">{hall.description}</p>
                      </div>

                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-xl md:text-2xl font-black text-brand-dark poppins">Amenities</h3>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                          {hall.amenities.map(am => (
                            <span key={am} className="bg-brand-accent px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-brand-primary/10 text-brand-primary font-bold text-xs md:text-sm">✨ {am}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'services' && (
                    <div className="space-y-6 md:space-y-8">
                      <h3 className="text-xl md:text-2xl font-black text-brand-dark poppins">Available Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {hall.services.map((service, i) => (
                          <div key={i} className="p-5 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border border-pink-50 space-y-2 md:space-y-3 group hover:border-brand-primary/30 transition-all">
                             <div className="flex items-center justify-between">
                                <h4 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-sm md:text-base">{service.name}</h4>
                                {service.price && <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest bg-brand-secondary/10 text-brand-secondary px-2 md:px-3 py-1 rounded-lg">{service.price}</span>}
                             </div>
                             <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{service.description}</p>
                          </div>
                        ))}
                      </div>
                      {hall.services.length === 0 && (
                        <p className="text-slate-400 italic text-sm">No specific external services listed. Please contact the manager for custom requirements.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-8 md:space-y-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <h3 className="text-xl md:text-2xl font-black text-brand-dark poppins">What Users Say</h3>
                          <div className="flex items-center space-x-2 bg-brand-secondary text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-lg shadow-green-100">
                            <span className="font-black text-sm md:text-base">{hall.rating}</span>
                            <span className="text-[10px] md:text-xs">/ 5.0</span>
                          </div>
                        </div>
                        <Button 
                          label={isReviewFormOpen ? "Cancel Review" : "Write a Review"} 
                          variant={isReviewFormOpen ? "outline" : "primary"}
                          onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                          className="text-[9px] md:text-[10px] px-4 md:px-6 py-2.5 md:py-3"
                        />
                      </div>

                      {/* Review Form */}
                      {isReviewFormOpen && (
                        <div className="bg-brand-accent/30 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border-2 border-dashed border-brand-primary/20 space-y-4 md:space-y-6 animate-fadeIn">
                          <h4 className="font-black text-brand-dark poppins text-sm md:text-base">Your Experience Matters</h4>
                          <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div className="flex items-center space-x-3 md:space-x-4">
                               <p className="text-xs md:text-sm font-bold text-slate-600">Rate your visit:</p>
                               <div className="flex space-x-1.5 md:space-x-2">
                                 {[1, 2, 3, 4, 5].map(star => (
                                   <button 
                                     key={star} 
                                     type="button" 
                                     onClick={() => setNewReview({...newReview, rating: star})}
                                     className={`text-xl md:text-2xl transition-all ${star <= newReview.rating ? 'text-yellow-400 scale-110' : 'text-slate-200 grayscale'}`}
                                   >
                                     ★
                                   </button>
                                 ))}
                               </div>
                            </div>
                            <textarea 
                              required 
                              rows={3}
                              placeholder="Tell us about the ambiance, service, and food..."
                              className="w-full p-4 md:p-5 bg-white border border-pink-100 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/10"
                              value={newReview.comment}
                              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            ></textarea>
                            <Button label="Post My Review" fullWidth className="py-3 md:py-4" />
                          </form>
                        </div>
                      )}

                      <div className="space-y-6 md:space-y-8">
                        {localReviews.map((r, i) => (
                          <div key={i} className="bg-slate-50 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-pink-50 space-y-3 md:space-y-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-pink-50">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 md:space-x-4">
                                   <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl border border-pink-100 flex items-center justify-center text-lg md:text-xl font-black text-brand-primary shadow-sm">
                                      {r.userName.charAt(0)}
                                   </div>
                                   <div>
                                      <p className="font-bold text-slate-900 text-sm md:text-base">{r.userName}</p>
                                      <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">{r.date}</p>
                                   </div>
                                </div>
                                <div className="flex text-yellow-400 text-xs md:text-sm">
                                   {Array.from({ length: 5 }).map((_, idx) => (
                                     <span key={idx} className={idx < r.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                                   ))}
                                </div>
                             </div>
                             <p className="text-slate-600 font-medium italic leading-relaxed text-sm md:text-base">"{r.comment}"</p>
                          </div>
                        ))}
                        {localReviews.length === 0 && !isReviewFormOpen && (
                          <div className="py-12 md:py-20 text-center space-y-3 md:space-y-4">
                             <div className="text-4xl md:text-6xl grayscale opacity-20">✍️</div>
                             <p className="text-slate-400 font-bold text-sm md:text-base">Be the first to review this venue!</p>
                             <button onClick={() => setIsReviewFormOpen(true)} className="text-brand-primary font-black uppercase text-[10px] md:text-xs tracking-[0.2em] underline underline-offset-4">Start Writing</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Booking Card */}
              <div className="space-y-6 md:space-y-8">
                <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] shadow-2xl border border-brand-primary/5 space-y-6 md:space-y-8 lg:sticky lg:top-32">
                  <div className="space-y-1">
                    <h4 className="text-lg md:text-xl font-black poppins text-brand-dark">Direct Enquiry</h4>
                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Bookings for 2025 now open</p>
                  </div>

                  <form onSubmit={handleEnquiryClick} className="space-y-4 md:space-y-5">
                    <input required placeholder="Your Full Name" className="w-full p-4 md:p-5 bg-slate-50 border border-pink-50 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    <input required placeholder="Phone Number" className="w-full p-4 md:p-5 bg-slate-50 border border-pink-50 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    <input required type="date" className="w-full p-4 md:p-5 bg-slate-50 border border-pink-50 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    
                    <Button label={isSubmitting ? "Sending..." : "Request Call Back"} fullWidth variant="primary" className="py-4 md:py-5 shadow-xl shadow-pink-100 text-sm md:text-base" />
                  </form>
                  
                  {showSuccess && <p className="text-center text-brand-secondary font-black animate-bounce text-sm">Request Sent Successfully! 🎉</p>}
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
