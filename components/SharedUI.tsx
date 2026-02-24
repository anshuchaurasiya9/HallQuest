
import React from 'react';

export const Button: React.FC<{
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'darkGradient';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}> = ({ label, onClick, variant = 'primary', fullWidth = false, disabled = false, className = "", icon }) => {
  const baseStyles = "px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center disabled:opacity-50 active:scale-95 text-sm tracking-wider";
  
  const variants = {
    primary: "bg-brand-primary text-white shadow-lg shadow-pink-100 hover:bg-[#D41D66] hover:shadow-pink-200 uppercase",
    secondary: "bg-brand-accent text-brand-primary hover:bg-pink-100 uppercase",
    success: "bg-brand-secondary text-white shadow-lg shadow-green-100 hover:bg-[#219150] uppercase",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-accent uppercase",
    darkGradient: "bg-gradient-to-r from-[#FFF0F6] via-brand-primary to-[#880E4F] text-white shadow-[0_20px_40px_-10px_rgba(231,46,119,0.3)] hover:opacity-95 border-none normal-case font-semibold text-base"
  };

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
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
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white transition-all text-brand-dark font-medium"
    />
  </div>
);
