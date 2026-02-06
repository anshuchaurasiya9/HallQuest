
import React, { useState } from 'react';
import { Button, Input } from '../components/SharedUI';

const AuthScreen: React.FC<{ 
  onLoginSuccess: (user: any) => void; 
  onBack?: () => void;
}> = ({ onLoginSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLoginSuccess({
        id: 'u1',
        name: email.split('@')[0],
        email: email,
        token: 'fake-jwt-token'
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 relative">
      {onBack && (
        <button 
          onClick={onBack} 
          className="absolute top-8 left-8 p-4 bg-white rounded-2xl shadow-sm text-slate-600 font-bold hover:text-indigo-600 transition-all border border-slate-100"
        >
          ← Exit
        </button>
      )}

      <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 space-y-10 relative">
        <div className="space-y-3 text-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-4xl mx-auto shadow-2xl shadow-indigo-200 mb-8 transform rotate-3">
            🏛️
          </div>
          <h2 className="text-3xl font-black text-slate-900 poppins tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 font-medium">
            {isLogin ? 'Login to continue your booking' : 'Join our premium venue network'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-black font-bold transition-all" />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-black font-bold transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 text-black font-bold transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Forgot Password?</button>
            </div>
          )}

          <div className="pt-4">
            <Button 
              label={isLoading ? "Authenticating..." : (isLogin ? "Sign In" : "Sign Up")} 
              fullWidth 
              disabled={!email || !password || isLoading} 
              className="py-5 shadow-xl shadow-indigo-100"
            />
          </div>
        </form>

        <div className="pt-8 flex flex-col items-center space-y-4 border-t border-slate-50">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm font-medium">
              {isLogin ? "New to the platform?" : "Already a member?"}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-indigo-600 font-black text-sm hover:underline uppercase tracking-tighter"
            >
              {isLogin ? "Create Account" : "Log In"}
            </button>
          </div>
          <p className="text-[10px] text-slate-300 font-medium text-center px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
