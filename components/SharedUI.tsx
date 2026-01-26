
import React from 'react';

export const Button: React.FC<{
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}> = ({ label, onClick, variant = 'primary', fullWidth = false, disabled = false, className = "" }) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 active:scale-95";
  const variants = {
    primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
  };

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {label}
    </button>
  );
};

export const Input: React.FC<{
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type = "text", placeholder, value, onChange }) => (
  <div className="flex flex-col space-y-1 w-full">
    <label className="text-sm font-medium text-slate-600 ml-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all"
    />
  </div>
);

export const Shimmer: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`}></div>
);
