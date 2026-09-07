'use client';

import React from 'react';

export const FloatingClouds: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Pixel Sky Gradient Overlay */}
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-blue-900/30 dark:via-[#0c1427]/40 dark:to-transparent bg-gradient-to-b from-sky-200/40 via-transparent to-transparent" />

      {/* Cloud 1 - Top Left */}
      <div 
        className="absolute top-8 left-[-5%] w-48 sm:w-64 opacity-25 animate-cloud-drift"
        style={{ animationDuration: '40s' }}
      >
        <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <rect x="20" y="10" width="80" height="20" fill="#ffffff" />
          <rect x="30" y="0" width="50" height="10" fill="#ffffff" />
          <rect x="10" y="15" width="100" height="15" fill="#f1f5f9" />
          <rect x="40" y="25" width="40" height="10" fill="#cbd5e1" />
        </svg>
      </div>

      {/* Cloud 2 - Top Center/Right */}
      <div 
        className="absolute top-24 left-[30%] w-36 sm:w-52 opacity-20 animate-cloud-drift"
        style={{ animationDuration: '55s', animationDelay: '-15s' }}
      >
        <svg viewBox="0 0 100 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <rect x="15" y="10" width="70" height="15" fill="#ffffff" />
          <rect x="25" y="0" width="40" height="10" fill="#ffffff" />
          <rect x="5" y="15" width="85" height="10" fill="#e2e8f0" />
        </svg>
      </div>

      {/* Cloud 3 - Lower Sky */}
      <div 
        className="absolute top-48 right-[-10%] w-56 sm:w-72 opacity-15 animate-cloud-drift-reverse"
        style={{ animationDuration: '50s', animationDelay: '-5s' }}
      >
        <svg viewBox="0 0 130 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <rect x="25" y="15" width="80" height="20" fill="#ffffff" />
          <rect x="40" y="5" width="50" height="10" fill="#ffffff" />
          <rect x="15" y="20" width="100" height="15" fill="#e2e8f0" />
        </svg>
      </div>

      {/* Floating Pixel Mini Island Left */}
      <div className="hidden lg:block absolute top-36 left-8 w-24 opacity-60 animate-float" style={{ animationDuration: '4.5s' }}>
        <div className="w-20 h-4 bg-gt-grass border-t-2 border-green-300 rounded-t-sm"></div>
        <div className="w-20 h-8 bg-gt-dirt border-b-2 border-stone-900 flex flex-col justify-end p-1">
          <div className="w-3 h-2 bg-gt-dirtDark ml-2"></div>
        </div>
      </div>

      {/* Floating Pixel Mini Island Right */}
      <div className="hidden lg:block absolute top-28 right-12 w-28 opacity-60 animate-float" style={{ animationDuration: '5.2s', animationDelay: '1.2s' }}>
        <div className="w-24 h-4 bg-gt-grass border-t-2 border-green-300 rounded-t-sm"></div>
        <div className="w-24 h-9 bg-gt-dirt border-b-2 border-stone-900 flex items-center justify-around p-1">
          <div className="w-2.5 h-2.5 bg-gt-dirtDark"></div>
          <div className="w-3 h-3 bg-amber-500/80 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};
