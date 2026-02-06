
import React, { useState } from 'react';
import { MOCK_HALLS, CATEGORIES } from '../constants';
import { Hall, User } from '../types';
import { Button } from '../components/SharedUI';

const HomeScreen: React.FC<{ 
  user: User | null; 
  onSelectHall: (hall: Hall) => void; 
  onOpenProfile: () => void;
  onLoginClick: () => void;
  onServicesClick: () => void;
  onListVenueClick: () => void;
}> = ({ user, onSelectHall, onOpenProfile, onLoginClick, onServicesClick, onListVenueClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredHalls = MOCK_HALLS.filter(hall => 
    (hall.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     hall.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedCategory || hall.category === selectedCategory)
  );

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex-1 flex flex-col bg-white pb-20 overflow-y-auto no-scrollbar">
      {/* Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 md:px-12 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-200">
              🏛️
            </div>
            <h1 className="text-xl font-bold text-slate-900 poppins">BookMyFunctionHalls</h1>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600">
              <button onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})} className="hover:text-indigo-600 transition-colors">Find Halls</button>
              <button onClick={onServicesClick} className="hover:text-indigo-600 transition-colors">Services</button>
              <button onClick={onListVenueClick} className="hover:text-indigo-600 transition-colors">List Your Venue</button>
            </nav>
            
            {user ? (
              <button onClick={onOpenProfile} className="flex items-center space-x-2 group">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Welcome</p>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                </div>
                <div className="w-10 h-10 bg-indigo-50 border-2 border-white rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:border-indigo-200 transition-all overflow-hidden">
                  👤
                </div>
              </button>
            ) : (
              <div className="hidden sm:block">
                <Button label="Login / Signup" onClick={onLoginClick} className="py-2.5 px-5 text-sm" />
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
            >
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-fadeIn py-6 px-8 space-y-6">
            <nav className="flex flex-col space-y-4 text-lg font-bold text-slate-700">
              <button onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({top: 600, behavior: 'smooth'}); }} className="text-left py-2 hover:text-indigo-600">Find Halls</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onServicesClick(); }} className="text-left py-2 hover:text-indigo-600">Services</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onListVenueClick(); }} className="text-left py-2 hover:text-indigo-600">List Your Venue</button>
              {!user && (
                <button onClick={() => { setIsMobileMenuOpen(false); onLoginClick(); }} className="text-left py-2 text-indigo-600">Login / Signup</button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[650px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-50 scale-105" 
            alt="Venue Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-white"></div>
        </div>

        <div className="relative z-10 w-full px-6 text-center space-y-8">
          <div className="space-y-4 max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black text-white poppins leading-[1.1] tracking-tighter drop-shadow-2xl">
              Celebrate Life in <span className="text-indigo-400">Perfect Venues</span>
            </h2>
            <p className="text-xl md:text-2xl text-indigo-50 font-medium opacity-90 max-w-3xl mx-auto">
              Discover, Compare & Book the most premium function halls across your city with our effortless platform.
            </p>
          </div>

          {/* Search Module */}
          <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl mx-auto border border-slate-100">
            <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-slate-100 group">
              <span className="text-2xl mr-4 opacity-40 group-focus-within:opacity-100 transition-opacity">🔍</span>
              <input 
                type="text" 
                placeholder="Search by hall name or locality..."
                className="w-full bg-transparent border-none focus:outline-none text-slate-900 font-bold placeholder-slate-400 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-[0.6] flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-slate-100">
              <span className="text-2xl mr-4 opacity-40">📍</span>
              <select 
                className="w-full bg-transparent border-none focus:outline-none text-slate-700 font-bold cursor-pointer appearance-none text-lg"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option>All Cities</option>
                <option>New York</option>
                <option>Mumbai</option>
                <option>London</option>
              </select>
            </div>
            <Button label="Search Now" className="py-5 px-10 rounded-[1.8rem] text-lg" />
          </div>
        </div>
      </section>

      {/* Categories & Results */}
      <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 -mt-16 relative z-20">
        
        {/* Quick Filter Categories */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`group flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] transition-all duration-500 border-2 ${selectedCategory === cat.name ? 'bg-indigo-600 border-indigo-600 text-white shadow-3xl shadow-indigo-200 -translate-y-4' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-100 hover:shadow-2xl'}`}
            >
              <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
              <span className="text-[12px] font-black uppercase tracking-[0.2em]">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-50 pb-8">
            <div className="space-y-3">
              <div className="inline-block px-4 py-1.5 bg-indigo-50 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100">Recommended</div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 poppins tracking-tighter">Premium Spaces</h2>
              <p className="text-slate-500 text-lg font-medium italic">Handpicked luxury venues for your next grand event</p>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-400 font-black uppercase tracking-widest bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
              <span>Sort by:</span>
              <select className="bg-transparent text-indigo-600 border-none focus:outline-none cursor-pointer font-black">
                <option>Recommended</option>
                <option>Rating (High to Low)</option>
                <option>Price (Low to High)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredHalls.length > 0 ? filteredHalls.map(hall => (
              <div 
                key={hall.id} 
                onClick={() => onSelectHall(hall)}
                className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 cursor-pointer border border-slate-50 flex flex-col h-full ring-1 ring-slate-100"
              >
                <div className="relative h-72 xl:h-64 overflow-hidden">
                  <img src={hall.images[0]} alt={hall.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 flex space-x-2">
                    <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black text-slate-900 shadow-sm border border-slate-100 uppercase tracking-widest">
                      {hall.category}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg flex items-center space-x-1.5">
                    <span>⭐</span>
                    <span>{hall.rating}</span>
                  </div>
                </div>
                
                <div className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <h3 className="font-black text-slate-900 text-2xl leading-tight group-hover:text-indigo-600 transition-colors poppins tracking-tight">{hall.name}</h3>
                    <p className="text-base text-slate-400 flex items-center font-medium">
                      <span className="mr-2">📍</span> {hall.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Guest Capacity</p>
                      <p className="text-base font-black text-slate-700 poppins">{hall.capacity.split(' ')[0]}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Price Range</p>
                      <p className="text-base font-black text-indigo-600 poppins">{hall.priceRange}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {hall.amenities.slice(0, 3).map(am => (
                      <span key={am} className="text-[9px] bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg font-black uppercase tracking-widest border border-slate-100">{am}</span>
                    ))}
                    {hall.amenities.length > 3 && (
                      <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest py-1.5">+{hall.amenities.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-32 text-center bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200">
                <div className="text-8xl mb-8">🔍</div>
                <h3 className="text-3xl font-black text-slate-800 poppins">No results found</h3>
                <p className="text-slate-500 mt-4 text-xl font-medium max-w-md mx-auto">Try changing your filters or searching for something else.</p>
                <Button label="Reset Filters" variant="outline" className="mt-10 py-5 px-12" onClick={() => {setSearchQuery(''); setSelectedCategory(null);}} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="bg-indigo-600 rounded-[5rem] p-12 md:p-24 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-all duration-700"></div>
          <div className="max-w-2xl space-y-6 relative z-10">
            <h2 className="text-4xl md:text-7xl font-black poppins tracking-tighter leading-none">Own a venue?<br/>Let's grow together.</h2>
            <p className="text-xl md:text-2xl text-indigo-100 font-medium">List your function hall today and reach thousands of potential customers looking for the perfect space.</p>
          </div>
          <button 
            onClick={onListVenueClick}
            className="relative z-10 px-12 py-6 bg-white text-indigo-600 rounded-3xl font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Start Listing
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-24 px-6 md:px-12 mt-20 text-white w-full">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 text-2xl shadow-xl">
                🏛️
              </div>
              <h2 className="text-2xl font-black poppins">BookMyFunctionHalls</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              We are reimagining the venue discovery experience. Elegant, transparent, and built for the most important moments of your life.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-xl font-black poppins uppercase tracking-widest text-indigo-400">Discover</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-lg">
              <li className="hover:text-white transition-colors cursor-pointer">Find a Hall</li>
              <li className="hover:text-white transition-colors cursor-pointer">Event Services</li>
              <li className="hover:text-white transition-colors cursor-pointer">Corporate Bookings</li>
              <li className="hover:text-white transition-colors cursor-pointer">Wedding Packages</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xl font-black poppins uppercase tracking-widest text-indigo-400">Platform</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-lg">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onListVenueClick}>Partner Program</li>
              <li className="hover:text-white transition-colors cursor-pointer">Manager Dashboard</li>
              <li className="hover:text-white transition-colors cursor-pointer">Success Stories</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms & Safety</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-xl font-black poppins uppercase tracking-widest text-indigo-400">Support</h4>
            <p className="text-slate-400 text-lg font-bold">concierge@bookmyhalls.com<br/>+1 (800) VENUE-01</p>
            <div className="flex space-x-4">
              {[1,2,3].map(i => (
                <div key={i} className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-indigo-600 hover:scale-110 transition-all text-xl">
                  {['f', 't', 'i'][i-1]}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-16 mt-16 border-t border-white/5 text-center text-slate-500 text-xs font-black uppercase tracking-[0.5em]">
          &copy; 2025 BookMyFunctionHalls Global Inc.
        </div>
      </footer>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default HomeScreen;
