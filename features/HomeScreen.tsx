
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

  const filteredHalls = MOCK_HALLS.filter(hall => 
    (hall.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     hall.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedCategory || hall.category === selectedCategory)
  );

  return (
    <div className="flex-1 flex flex-col bg-white pb-20 overflow-y-auto no-scrollbar">
      {/* Navigation Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 md:px-12 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-200">
              🏛️
            </div>
            <h1 className="text-xl font-bold text-slate-900 poppins hidden sm:block">BookMyFunctionHalls</h1>
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
              <Button label="Login / Signup" onClick={onLoginClick} className="py-2.5 px-5 text-sm" />
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[550px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-50 scale-105" 
            alt="Venue Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-white"></div>
        </div>

        <div className="relative z-10 max-w-4xl w-full px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white poppins leading-tight drop-shadow-xl">
              Celebrate Life in <span className="text-indigo-400">Perfect Venues</span>
            </h2>
            <p className="text-lg md:text-xl text-indigo-50 font-medium opacity-90">
              Discover, Compare & Book the most premium function halls across your city.
            </p>
          </div>

          {/* Search Module */}
          <div className="bg-white p-3 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100 group">
              <span className="text-xl mr-3 opacity-40 group-focus-within:opacity-100 transition-opacity">🔍</span>
              <input 
                type="text" 
                placeholder="Search by hall name or locality..."
                className="w-full bg-transparent border-none focus:outline-none text-slate-900 font-medium placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
              <span className="text-xl mr-3 opacity-40">📍</span>
              <select 
                className="w-full bg-transparent border-none focus:outline-none text-slate-700 font-semibold cursor-pointer appearance-none"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option>All Cities</option>
                <option>New York</option>
                <option>Mumbai</option>
                <option>London</option>
              </select>
            </div>
            <Button label="Search Now" className="py-4 px-8 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Categories & Results */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-12 py-16 -mt-12 relative z-20">
        
        {/* Quick Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`group flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-3xl transition-all border-2 ${selectedCategory === cat.name ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 -translate-y-2' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-100 hover:shadow-xl'}`}
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 poppins tracking-tight">Popular Function Halls</h2>
              <p className="text-slate-500 font-medium italic">Handpicked premium venues for your special day</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <span>Sorted by</span>
              <select className="bg-transparent text-indigo-600 border-none focus:outline-none cursor-pointer">
                <option>Recommended</option>
                <option>Rating (High to Low)</option>
                <option>Price (Low to High)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredHalls.length > 0 ? filteredHalls.map(hall => (
              <div 
                key={hall.id} 
                onClick={() => onSelectHall(hall)}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-50 flex flex-col h-full ring-1 ring-slate-100"
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={hall.images[0]} alt={hall.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 flex space-x-2">
                    <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-900 shadow-sm border border-slate-100 uppercase tracking-tighter">
                      {hall.category}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{hall.rating}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white text-sm font-medium">Click to view details & photos</p>
                  </div>
                </div>
                
                <div className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-xl leading-tight group-hover:text-indigo-600 transition-colors poppins">{hall.name}</h3>
                    <p className="text-sm text-slate-400 flex items-center font-medium">
                      <span className="mr-1">📍</span> {hall.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacity</p>
                      <p className="text-sm font-bold text-slate-700">{hall.capacity.split(' ')[0]} PPL</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price Point</p>
                      <p className="text-sm font-bold text-indigo-600">{hall.priceRange} (Premium)</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hall.amenities.slice(0, 3).map(am => (
                      <span key={am} className="text-[9px] bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg font-black uppercase tracking-tight border border-slate-100">{am}</span>
                    ))}
                    {hall.amenities.length > 3 && (
                      <span className="text-[9px] text-slate-300 font-black uppercase tracking-tight py-1.5">+{hall.amenities.length - 3} More</span>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="text-7xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-slate-800 poppins">No venues found</h3>
                <p className="text-slate-500 mt-2 font-medium">Try broadening your search or choosing a different category.</p>
                <Button label="Clear Filters" variant="outline" className="mt-8" onClick={() => {setSearchQuery(''); setSelectedCategory(null);}} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="bg-slate-900 py-20 px-6 md:px-12 mt-20 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 text-2xl shadow-xl">
                🏛️
              </div>
              <h2 className="text-2xl font-black poppins">BookMyFunctionHalls</h2>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              We are dedicated to making venue booking simple, transparent, and luxury-focused. Find the perfect space for every milestone.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold poppins">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact Support</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold poppins">Contact Us</h4>
            <p className="text-slate-400 font-medium">support@bookmyfunctionhalls.com<br/>+1 (800) 123-4567</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-colors">f</div>
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-colors">t</div>
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-colors">i</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">
          &copy; 2025 BookMyFunctionHalls Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;
