
import React, { useState } from 'react';
import { MOCK_HALLS, CATEGORIES } from '../constants';
import { Hall } from '../types';
import { Shimmer } from '../components/SharedUI';

const HomeScreen: React.FC<{ onSelectHall: (hall: Hall) => void; onOpenProfile: () => void }> = ({ onSelectHall, onOpenProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredHalls = MOCK_HALLS.filter(hall => 
    hall.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedCategory || hall.category === selectedCategory)
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-20 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-lg">
              📍
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Location</p>
              <h3 className="text-sm font-bold text-slate-800">Manhattan, NY 🗽</h3>
            </div>
          </div>
          <button onClick={onOpenProfile} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl overflow-hidden hover:ring-2 hover:ring-indigo-300 transition-all">
            👤
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search for halls, hotels, lounges..."
            className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50">🔍</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6 px-6 overflow-x-auto flex space-x-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            className={`flex flex-col items-center space-y-2 p-3 min-w-[80px] rounded-2xl transition-all ${selectedCategory === cat.name ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600'}`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Featured Listing */}
      <div className="px-6 mt-8 space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-slate-900 poppins">Popular Nearby</h2>
          <button className="text-sm text-indigo-600 font-semibold">View All</button>
        </div>

        {filteredHalls.length > 0 ? filteredHalls.map(hall => (
          <div 
            key={hall.id} 
            onClick={() => onSelectHall(hall)}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
          >
            <div className="relative h-48">
              <img src={hall.images[0]} alt={hall.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600">
                ⭐ {hall.rating}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-bold uppercase tracking-wider">
                {hall.category}
              </div>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{hall.name}</h3>
                <span className="text-slate-400 text-sm font-medium whitespace-nowrap">{hall.distance}</span>
              </div>
              <p className="text-sm text-slate-500 flex items-center">
                <span className="mr-1">👥</span> {hall.capacity}
              </p>
              <div className="flex space-x-2 pt-2">
                {hall.amenities.slice(0, 3).map(am => (
                  <span key={am} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-semibold uppercase">{am}</span>
                ))}
              </div>
            </div>
          </div>
        )) : (
          <div className="py-12 text-center text-slate-400 italic">No halls found in this category</div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
