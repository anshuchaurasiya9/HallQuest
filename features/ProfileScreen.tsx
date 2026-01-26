
import React from 'react';
import { User } from '../types';
import { Button } from '../components/SharedUI';

const ProfileScreen: React.FC<{ user: User | null; onBack: () => void; onLogout: () => void }> = ({ user, onBack, onLogout }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="bg-white p-6 pt-12 shadow-sm rounded-b-[3rem]">
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={onBack} className="text-2xl p-2 hover:bg-slate-50 rounded-full transition-colors">←</button>
          <h2 className="text-xl font-bold text-slate-900 poppins">My Profile</h2>
        </div>
        
        <div className="flex flex-col items-center pb-8">
          <div className="w-24 h-24 bg-indigo-100 border-4 border-indigo-50 rounded-full flex items-center justify-center text-4xl mb-4 relative">
             👤
             <div className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 border-4 border-white rounded-full flex items-center justify-center text-white text-[10px]">✏️</div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 capitalize">{user?.name || 'Guest User'}</h3>
          <p className="text-slate-400 font-medium">{user?.email || 'No email associated'}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
         <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            {[
              { label: 'My Enquiries', icon: '📩', count: 3 },
              { label: 'Saved Halls', icon: '❤️', count: 8 },
              { label: 'Account Settings', icon: '⚙️' },
              { label: 'Help & Support', icon: '❓' }
            ].map((item, i) => (
              <button key={item.label} className={`w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors ${i !== 3 ? 'border-b border-slate-50' : ''}`}>
                 <div className="flex items-center space-x-4">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-semibold text-slate-700">{item.label}</span>
                 </div>
                 {item.count && <span className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full font-bold">{item.count}</span>}
              </button>
            ))}
         </div>

         <div className="pt-8">
            <Button label="Sign Out" variant="secondary" fullWidth onClick={onLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600" />
         </div>

         <div className="pt-12 text-center opacity-30">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">HallQuest v1.0.42</p>
         </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
