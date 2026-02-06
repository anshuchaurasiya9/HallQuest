
import React from 'react';
import { User } from '../types';
import { Button } from '../components/SharedUI';

const ProfileScreen: React.FC<{ user: User | null; onBack: () => void; onLogout: () => void }> = ({ user, onBack, onLogout }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Profile Header Banner */}
      <div className="bg-indigo-600 h-48 md:h-64 relative">
        <button onClick={onBack} className="absolute top-8 left-8 bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2 rounded-2xl text-white font-bold transition-all flex items-center space-x-2 z-10">
          <span>←</span> <span>Back</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 md:px-12 -mt-24 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Sidebar - Personal Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-indigo-50 border-8 border-white rounded-[2.5rem] flex items-center justify-center text-5xl mb-6 shadow-lg relative">
                 👤
                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 border-4 border-white rounded-2xl flex items-center justify-center text-white text-xs cursor-pointer hover:scale-110 transition-transform">✏️</div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 capitalize">{user?.name || 'Guest User'}</h3>
              <p className="text-slate-400 font-medium mb-8">{user?.email || 'guest@example.com'}</p>
              
              <div className="w-full pt-8 border-t border-slate-50">
                <Button label="Sign Out" variant="secondary" fullWidth onClick={onLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100" />
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl">
               <h4 className="font-bold text-lg mb-4 poppins">Platinum Member</h4>
               <p className="text-sm text-slate-400 leading-relaxed mb-6">Enjoy exclusive priority support and early access to popular dates.</p>
               <button className="w-full py-3 rounded-xl border border-slate-700 font-bold hover:bg-slate-800 transition-all">View Benefits</button>
            </div>
          </div>

          {/* Main - Menu Items */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50">
                <h3 className="text-xl font-bold text-slate-900 poppins">Account Dashboard</h3>
              </div>
              
              <div className="divide-y divide-slate-50">
                {[
                  { label: 'My Enquiries', icon: '📩', desc: 'Track all your recent venue bookings', count: 3 },
                  { label: 'Saved Halls', icon: '❤️', desc: 'Your collection of dream venues', count: 8 },
                  { label: 'Payment History', icon: '💳', desc: 'Manage invoices and transactions' },
                  { label: 'Account Settings', icon: '⚙️', desc: 'Personal details and security' },
                  { label: 'Help & Support', icon: '❓', desc: '24/7 dedicated concierge' }
                ].map((item) => (
                  <button key={item.label} className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-all text-left group">
                    <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.label}</h4>
                        <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {item.count && <span className="bg-indigo-50 text-indigo-600 text-xs px-4 py-1.5 rounded-full font-black">{item.count}</span>}
                      <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-slate-300">BookMyFunctionHalls • Version 1.0.42 • Made for celebrations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
