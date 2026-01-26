
import React, { useState } from 'react';
import { Button, Input } from '../components/SharedUI';

const AuthScreen: React.FC<{ onLoginSuccess: (user: any) => void }> = ({ onLoginSuccess }) => {
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
    <div className="flex-1 flex flex-col p-8 bg-white">
      <div className="mt-12 space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 poppins">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-500">
          {isLogin ? 'Login to continue finding venues' : 'Sign up to start planning your events'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 space-y-6">
        {!isLogin && <Input label="Full Name" placeholder="John Doe" value="" onChange={() => {}} />}
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="name@example.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {isLogin && (
          <div className="flex justify-end">
            <button type="button" className="text-sm font-medium text-indigo-600 hover:underline">Forgot Password?</button>
          </div>
        )}

        <Button 
          label={isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")} 
          fullWidth 
          disabled={!email || !password || isLoading} 
        />
      </form>

      <div className="mt-auto pt-8 flex justify-center items-center space-x-2">
        <span className="text-slate-500 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-indigo-600 font-bold text-sm hover:underline"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
