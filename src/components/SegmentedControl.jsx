import React from 'react';

export function SegmentedControl({ options, active, onChange }) {
  return (
    <div className="flex bg-[#E5E5EA] p-1.5 rounded-2xl mx-auto max-w-md w-full relative">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`flex-1 py-3 px-4 text-lg font-medium rounded-xl transition-all duration-300 z-10 ${
            active === option.id ? 'text-[#1D1D1F] shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
          style={{ backgroundColor: active === option.id ? '#FFFFFF' : 'transparent' }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
