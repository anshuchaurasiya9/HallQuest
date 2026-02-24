
import React, { useState } from 'react';
import { MOCK_HALLS, CATEGORIES } from '../constants';
import { Hall, User } from '../types';
import { Button } from '../components/SharedUI';

const CITIES = [
  { name: 'Delhi NCR', img: 'https://images.unsplash.com/photo-1587474260584-1f35a4908f9f?auto=format&fit=crop&q=80&w=200' },
  { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=200' },
  { name: 'Bangalore', img: 'https://images.unsplash.com/photo-1596760411110-381a4b42918b?auto=format&fit=crop&q=80&w=200' },
  { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1572435212746-9b4176513600?auto=format&fit=crop&q=80&w=200' },
  { name: 'Chennai', img: 'https://images.unsplash.com/photo-1582512390367-97597531c309?auto=format&fit=crop&q=80&w=200' },
  { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=200' },
  { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=200' },
  { name: 'Pune', img: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&q=80&w=200' },
  { name: 'Kolkata', img: 'https://images.unsplash.com/photo-1558431382-bb7b38c49051?auto=format&fit=crop&q=80&w=200' },
  { name: 'Lucknow', img: 'https://images.unsplash.com/photo-1588180864337-3742ed456ca9?auto=format&fit=crop&q=80&w=200' }
];

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

  const filteredHalls = MOCK_HALLS.filter(hall => {
    const matchesSearch = (hall.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hall.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = (!selectedCategory || hall.category === selectedCategory);
    const matchesCity = (cityFilter === 'All Cities' || hall.location.includes(cityFilter));
    return matchesSearch && matchesCategory && matchesCity;
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex-1 flex flex-col bg-white pb-20 overflow-y-auto no-scrollbar">
      {/* Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 md:px-12 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-pink-200">
              🏛️
            </div>
            <h1 className="text-xl font-bold text-slate-900 poppins">BookMyFunctionHalls</h1>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600">
              <button onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})} className="hover:text-brand-primary transition-colors">Find Halls</button>
              <button onClick={onServicesClick} className="hover:text-brand-primary transition-colors">Services</button>
              <button onClick={onListVenueClick} className="hover:text-brand-primary transition-colors">List Your Venue</button>
            </nav>
            
            {user ? (
              <button onClick={onOpenProfile} className="flex items-center space-x-2 group">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Welcome</p>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                </div>
                <div className="w-10 h-10 bg-brand-accent border-2 border-white rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:border-pink-200 transition-all overflow-hidden">
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
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-brand-primary' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-brand-primary' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-pink-50 shadow-2xl animate-fadeIn py-6 px-8 space-y-6">
            <nav className="flex flex-col space-y-4 text-lg font-bold text-slate-700">
              <button onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({top: 600, behavior: 'smooth'}); }} className="text-left py-2 hover:text-brand-primary">Find Halls</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onServicesClick(); }} className="text-left py-2 hover:text-brand-primary">Services</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onListVenueClick(); }} className="text-left py-2 hover:text-brand-primary">List Your Venue</button>
              {!user && (
                <button onClick={() => { setIsMobileMenuOpen(false); onLoginClick(); }} className="text-left py-2 text-brand-primary">Login / Signup</button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[550px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-50 scale-105" 
            alt="Venue Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-white"></div>
        </div>

        <div className="relative z-10 w-full px-6 text-center space-y-8">
          <div className="space-y-4 max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white poppins leading-[1.1] tracking-tighter drop-shadow-2xl">
              Celebrate Life in <span className="text-brand-primary">Perfect Venues</span>
            </h2>
            <p className="text-lg md:text-xl text-pink-50 font-medium opacity-90 max-w-3xl mx-auto">
              Discover, Compare & Book premium function halls across your city.
            </p>
          </div>

          {/* Search Module */}
          <div className="bg-white p-2 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl mx-auto border border-pink-50">
            <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-pink-50 group">
              <span className="text-xl mr-3 opacity-40">🔍</span>
              <input 
                type="text" 
                placeholder="Search by hall name..."
                className="w-full bg-transparent border-none focus:outline-none text-slate-900 font-bold placeholder-slate-400 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-[0.6] flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-pink-50">
              <span className="text-xl mr-3 opacity-40 text-brand-primary">📍</span>
              <select 
                className="w-full bg-transparent border-none focus:outline-none text-slate-700 font-bold cursor-pointer appearance-none text-base"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option>All Cities</option>
                {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <Button label="Search" className="py-4 px-8 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* City Filter Carousel */}
      <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12">
        <div className="flex items-center space-x-10 overflow-x-auto no-scrollbar pb-4">
          <button 
            onClick={() => setCityFilter('All Cities')}
            className="flex flex-col items-center space-y-3 shrink-0 group focus:outline-none"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl border-4 transition-all duration-300 ${cityFilter === 'All Cities' ? 'border-brand-primary shadow-lg scale-110 bg-brand-accent' : 'border-white bg-slate-100 shadow-sm group-hover:border-pink-200'}`}>
              🌍
            </div>
            <span className={`text-xs font-bold transition-colors ${cityFilter === 'All Cities' ? 'text-brand-primary' : 'text-slate-500'}`}>
              All Cities
            </span>
          </button>
          
          {CITIES.map((city) => (
            <button 
              key={city.name}
              onClick={() => setCityFilter(city.name)}
              className="flex flex-col items-center space-y-3 shrink-0 group focus:outline-none"
            >
              <div className={`w-20 h-20 rounded-full border-4 transition-all duration-300 overflow-hidden ${cityFilter === city.name ? 'border-brand-primary shadow-lg scale-110' : 'border-white shadow-sm group-hover:border-pink-200'}`}>
                <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
              </div>
              <span className={`text-xs font-bold transition-colors ${cityFilter === city.name ? 'text-brand-primary' : 'text-slate-500'}`}>
                {city.name}
              </span>
            </button>
          ))}
          
          <button className="flex flex-col items-center space-y-3 shrink-0 focus:outline-none cursor-default">
            <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-sm">
              +40
            </div>
            <span className="text-xs font-bold text-slate-500 opacity-0">Hidden</span>
          </button>
        </div>
      </section>

      {/* Featured Section */}
      <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-8 relative z-20">
        
        {/* Quick Filter Categories */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`group flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-[2rem] transition-all duration-500 border-2 ${selectedCategory === cat.name ? 'bg-brand-primary border-brand-primary text-white shadow-xl shadow-pink-100 -translate-y-2' : 'bg-white border-pink-50 text-slate-500 hover:border-pink-200 hover:shadow-lg'}`}
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-pink-50 pb-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 poppins tracking-tighter">
                {cityFilter === 'All Cities' ? 'Premium Spaces' : `Top Venues in ${cityFilter}`}
              </h2>
              <p className="text-slate-500 text-base font-medium">Handpicked luxury venues matching your requirements</p>
            </div>
            <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-pink-50">
              <span>Sort by:</span>
              <select className="bg-transparent text-brand-primary border-none focus:outline-none cursor-pointer font-black">
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
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 cursor-pointer border border-pink-50 flex flex-col h-full ring-1 ring-pink-50"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={hall.images[0]} alt={hall.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-[9px] font-black text-brand-dark shadow-sm border border-pink-50 uppercase tracking-widest">
                    {hall.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-black shadow-lg flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{hall.rating}</span>
                  </div>
                </div>
                
                <div className="p-8 space-y-5 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 text-xl leading-tight group-hover:text-brand-primary transition-colors poppins tracking-tight">{hall.name}</h3>
                    <p className="text-sm text-slate-400 flex items-center font-medium">
                      <span className="mr-2 opacity-60 text-brand-primary">📍</span> {hall.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-pink-50">
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Capacity</p>
                      <p className="text-sm font-black text-slate-700 poppins">{hall.capacity.split(' ')[0]}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Price</p>
                      <p className="text-sm font-black text-brand-primary poppins">{hall.priceRange}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {hall.amenities.slice(0, 2).map(am => (
                      <span key={am} className="text-[8px] bg-brand-accent text-brand-primary px-2 py-1 rounded-md font-black uppercase tracking-widest border border-brand-primary/10">{am}</span>
                    ))}
                    {hall.amenities.length > 2 && (
                      <span className="text-[8px] text-slate-300 font-black uppercase tracking-widest py-1">+{hall.amenities.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-24 text-center bg-brand-accent/20 rounded-[3rem] border-2 border-dashed border-pink-100">
                <div className="text-6xl mb-6 opacity-30">🔍</div>
                <h3 className="text-2xl font-black text-slate-800 poppins">No venues found</h3>
                <p className="text-slate-500 mt-2 text-base font-medium max-w-sm mx-auto">Try clearing filters or selecting a different city.</p>
                <Button label="Reset All" variant="outline" className="mt-8 py-3 px-8 text-xs" onClick={() => {setSearchQuery(''); setSelectedCategory(null); setCityFilter('All Cities');}} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="bg-brand-primary rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-24 bg-white/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-xl space-y-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black poppins tracking-tighter leading-tight">Partner Your Venue</h2>
            <p className="text-base md:text-lg text-pink-100 font-medium opacity-90">Reach thousands of event planners looking for premium spaces every month.</p>
          </div>
          <button 
            onClick={onListVenueClick}
            className="relative z-10 px-10 py-5 bg-white text-brand-primary rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Start Listing
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 px-6 md:px-12 mt-12 text-white w-full">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary text-xl shadow-lg">
                🏛️
              </div>
              <h2 className="text-xl font-black poppins">BookMyHalls</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              India's premium venue discovery platform.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">Discover</h4>
            <ul className="space-y-2 text-slate-400 font-bold text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Find a Hall</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onServicesClick}>Event Services</li>
              <li className="hover:text-white transition-colors cursor-pointer">Corporate</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">Platform</h4>
            <ul className="space-y-2 text-slate-400 font-bold text-sm">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onListVenueClick}>Partner Program</li>
              <li className="hover:text-white transition-colors cursor-pointer">Dashboard</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">Support</h4>
            <p className="text-slate-400 text-sm font-bold">support@bookmyhalls.com</p>
            <div className="flex space-x-3">
              {['f', 't', 'i'].map(i => (
                <div key={i} className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-brand-primary transition-all">
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-10 mt-10 border-t border-white/5 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
          &copy; 2025 BookMyHalls Global
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
