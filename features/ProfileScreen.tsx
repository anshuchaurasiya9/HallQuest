
import React, { useState, useEffect } from 'react';
import { User, Property, Hall } from '../types';
import { Button } from '../components/SharedUI';
import { fetchFavorites } from '../services/venueService';
import { Heart, MapPin, Star } from 'lucide-react';

const ProfileScreen: React.FC<{ 
  user: User | null; 
  onBack: () => void; 
  onLogout: () => void;
  onSelectHall: (hall: Hall) => void;
}> = ({ user, onBack, onLogout, onSelectHall }) => {
  const [activeView, setActiveView] = useState<'menu' | 'favorites'>('menu');
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeView === 'favorites' && user) {
      loadFavorites();
    }
  }, [activeView, user]);

  const loadFavorites = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await fetchFavorites(user.token);
      if (res.success) {
        setFavorites(res.data);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapPropertyToHall = (property: Property): Hall => {
    return {
      id: property.id,
      name: property.title,
      location: 'Venue Location', // Simplified for profile view
      capacity: `${property.guest_capacity} Guests`,
      price: parseFloat(property.price),
      rating: 4.5,
      images: property.media.filter(m => m.type === 'image').map(m => m.file_url).length > 0
        ? property.media.filter(m => m.type === 'image').map(m => m.file_url)
        : ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'],
      category: 'Venue',
      description: property.description || '',
      amenities: [],
      reviewCount: property.favorite_count || 0,
      priceRange: `₹${property.price}`,
      services: [],
      reviews: [],
      distance: '0.5 km'
    };
  };
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Profile Header Banner */}
      <div className="bg-brand-primary h-32 md:h-64 relative">
        <button 
          onClick={activeView === 'menu' ? onBack : () => setActiveView('menu')} 
          className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-white font-bold transition-all flex items-center space-x-2 z-10 text-xs md:text-sm"
        >
          <span>←</span> <span>{activeView === 'menu' ? 'Back' : 'Back to Menu'}</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-12 -mt-16 md:-mt-24 pb-12 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Sidebar - Personal Info */}
          <div className="md:col-span-4 space-y-4 md:space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[3rem] shadow-xl border border-pink-50 flex flex-col items-center text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-accent border-4 md:border-8 border-white rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center text-4xl md:text-5xl mb-4 md:mb-6 shadow-lg relative">
                 👤
                 <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-brand-primary border-2 md:border-4 border-white rounded-xl md:rounded-2xl flex items-center justify-center text-white text-[10px] md:text-xs cursor-pointer hover:scale-110 transition-transform">✏️</div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 capitalize">{user?.name || 'Guest User'}</h3>
              <p className="text-slate-400 font-medium text-sm md:text-base mb-6 md:mb-8">{user?.email || 'guest@example.com'}</p>
              
              <div className="w-full pt-6 md:pt-8 border-t border-slate-50">
                <Button label="Sign Out" variant="secondary" fullWidth onClick={onLogout} className="text-brand-primary hover:bg-pink-50 border border-transparent hover:border-pink-100 py-3 md:py-4 text-sm md:text-base" />
              </div>
            </div>
          </div>

          {/* Main - Menu Items */}
          <div className="md:col-span-8">
            {activeView === 'menu' ? (
              <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-xl border border-pink-50 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-pink-50">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 poppins">Account Dashboard</h3>
                </div>
                
                <div className="divide-y divide-pink-50">
                  {[
                    { label: 'My Enquiries', icon: '📩', desc: 'Track all your recent venue bookings', count: 3 },
                    { label: 'Saved Halls', icon: '❤️', desc: 'Your collection of dream venues', action: () => setActiveView('favorites') },
                    { label: 'Payment History', icon: '💳', desc: 'Manage invoices and transactions' },
                    { label: 'Account Settings', icon: '⚙️', desc: 'Personal details and security' },
                    { label: 'Help & Support', icon: '❓', desc: '24/7 dedicated concierge' }
                  ].map((item) => (
                    <button 
                      key={item.label} 
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-slate-50 transition-all text-left group"
                    >
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-accent rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl group-hover:bg-pink-100 group-hover:text-brand-primary transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base md:text-lg group-hover:text-brand-primary transition-colors">{item.label}</h4>
                          <p className="text-xs md:text-sm text-slate-400 font-medium line-clamp-1">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 md:space-x-4">
                        {item.count && <span className="bg-brand-primary text-white text-[10px] md:text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-full font-black">{item.count}</span>}
                        <span className="text-slate-300 group-hover:translate-x-1 transition-transform group-hover:text-brand-primary text-sm md:text-base">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[3rem] shadow-xl border border-pink-50">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 poppins">Saved Halls</h3>
                  <p className="text-slate-400 font-medium text-sm md:text-base">Your personal collection of favorite venues</p>
                </div>

                {isLoading ? (
                  <div className="py-20 text-center">
                    <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 font-bold">Loading your favorites...</p>
                  </div>
                ) : favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {favorites.map(property => (
                      <div 
                        key={property.id} 
                        onClick={() => onSelectHall(mapPropertyToHall(property))}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg border border-pink-50 group cursor-pointer hover:shadow-2xl transition-all"
                      >
                        <div className="h-40 overflow-hidden relative">
                          <img 
                            src={property.media.find(m => m.type === 'image')?.file_url || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            alt={property.title} 
                          />
                          <div className="absolute top-3 right-3 bg-brand-primary text-white p-2 rounded-xl shadow-lg">
                            <Heart className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                        <div className="p-5 space-y-3">
                          <h4 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-1">{property.title}</h4>
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-brand-primary">₹{property.price}</span>
                            <span className="text-slate-400 flex items-center"><Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /> 4.5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-12 md:p-20 rounded-3xl md:rounded-[3rem] text-center border-2 border-dashed border-pink-100">
                    <div className="text-5xl md:text-6xl mb-4 md:mb-6 opacity-20">❤️</div>
                    <h4 className="text-lg md:text-xl font-bold text-slate-800">No saved halls yet</h4>
                    <p className="text-slate-400 mt-2 mb-8 max-w-xs mx-auto">Start exploring and save venues you love for quick access later.</p>
                    <Button label="Explore Venues" onClick={() => setActiveView('menu')} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
