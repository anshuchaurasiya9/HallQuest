
import React, { useState } from 'react';
import { Button, Input } from '../components/SharedUI';
import { register, login } from '../services/authService';

const AuthScreen: React.FC<{ 
  onLoginSuccess: (user: any) => void; 
  onBack?: () => void;
}> = ({ onLoginSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const response = await login({
          email,
          password,
        });

        if (response.success) {
          onLoginSuccess({
            ...response.data.user,
            token: response.data.token,
          });
        } else {
          setError(response.message || 'Login failed');
        }
      } else {
        const response = await register({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        });

        if (response.success) {
          onLoginSuccess({
            ...response.data.user,
            token: response.data.token,
          });
        } else {
          setError(response.message || 'Registration failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-slate-50 relative">
      {onBack && (
        <button 
          onClick={onBack} 
          className="absolute top-4 left-4 md:top-8 md:left-8 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm text-slate-600 font-bold hover:text-brand-primary transition-all border border-slate-100 text-xs md:text-sm"
        >
          ← Exit
        </button>
      )}

      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-slate-100 space-y-8 md:space-y-10 relative">
        <div className="space-y-2 md:space-y-3 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white text-3xl md:text-4xl mx-auto shadow-2xl shadow-pink-100 mb-6 md:mb-8 transform rotate-3">
            🏛️
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 poppins tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 font-medium text-sm md:text-base">
            {isLogin ? 'Login to continue your booking' : 'Join our premium venue network'}
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs md:text-sm font-bold rounded-2xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {!isLogin && (
            <Input 
              label="Full Name" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <Input 
              label="Confirm Password" 
              type="password" 
              placeholder="••••••••" 
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          )}
          
          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-[10px] md:text-xs font-black text-brand-primary hover:underline uppercase tracking-widest">Forgot Password?</button>
            </div>
          )}

          <div className="pt-2 md:pt-4">
            <Button 
              label={isLoading ? "Authenticating..." : (isLogin ? "Sign In" : "Sign Up")} 
              fullWidth 
              variant="darkGradient"
              disabled={isLoading} 
              className="py-4 md:py-5 text-sm md:text-base"
            />
          </div>
        </form>

        <div className="pt-6 md:pt-8 flex flex-col items-center space-y-3 md:space-y-4 border-t border-slate-50">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-xs md:text-sm font-medium">
              {isLogin ? "New to the platform?" : "Already a member?"}
            </span>
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }} 
              className="text-brand-primary font-black text-xs md:text-sm hover:underline uppercase tracking-tighter"
            >
              {isLogin ? "Create Account" : "Log In"}
            </button>
          </div>
          <p className="text-[8px] md:text-[10px] text-slate-300 font-medium text-center px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
