
import React from 'react';
import { User } from '../types';
import { Button } from '../components/SharedUI';

const ProfileScreen: React.FC<{ user: User | null; onBack: () => void; onLogout: () => void }> = ({ user, onBack, onLogout }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Profile Header Banner */}
      <div className="bg-brand-primary h-32 md:h-64 relative">
        <button onClick={onBack} className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-white font-bold transition-all flex items-center space-x-2 z-10 text-xs md:text-sm">
          <span>←</span> <span>Back</span>
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
            <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-xl border border-pink-50 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-pink-50">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 poppins">Account Dashboard</h3>
              </div>
              
              <div className="divide-y divide-pink-50">
                {[
                  { label: 'My Enquiries', icon: '📩', desc: 'Track all your recent venue bookings', count: 3 },
                  { label: 'Saved Halls', icon: '❤️', desc: 'Your collection of dream venues', count: 8 },
                  { label: 'Payment History', icon: '💳', desc: 'Manage invoices and transactions' },
                  { label: 'Account Settings', icon: '⚙️', desc: 'Personal details and security' },
                  { label: 'Help & Support', icon: '❓', desc: '24/7 dedicated concierge' }
                ].map((item) => (
                  <button key={item.label} className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-slate-50 transition-all text-left group">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
