import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ComponentType<{ className?: string }>;
};
const Input = ({ icon: Icon, ...props }: InputProps) => {
  return (
    <div className="relative mb-2">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-blue-400" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-zinc-900 bg-opacity-50 rounded-lg border-2 border-gray-400 focus:border-prime focus:ring-1 focus:ring-prime text-zinc-200 placeholder-gray-400 transition duration-200 outline-none"
      />
    </div>
  );
};

export default Input;