
import React, { useState, useEffect } from 'react';
import { LOGO_URL, BRAND_NAME } from '../constants';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  const [storageLogo, setStorageLogo] = useState<string | null>(null);

  useEffect(() => {
    // Check browser's local storage for a custom logo
    // This supports local persistence of a logo uploaded via a browser console or tool
    try {
      const savedLogo = localStorage.getItem('kumkum_custom_logo');
      if (savedLogo) {
        setStorageLogo(savedLogo);
      }
    } catch (error) {
      console.warn('LocalStorage access for logo failed:', error);
    }
  }, []);

  // Priority order: 
  // 1. Logo found in browser LocalStorage (useful for dynamic preview/upload)
  // 2. Logo URL defined in constants.tsx (path to a local file in the project folder)
  // 3. Fallback default SVG
  const logoSource = storageLogo || LOGO_URL;

  if (logoSource && logoSource.trim() !== "") {
    return (
      <img 
        src={logoSource} 
        alt={`${BRAND_NAME} Logo`} 
        className={`${className} object-contain`} 
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        onError={(e) => {
          // If the image fails to load, we can hide it or fall back to SVG
          // For now, we'll hide it to avoid the broken image icon
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  // Fallback to the default artistic SVG logo
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} flex-shrink-0`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stylized Sun/Palette hybrid */}
      <circle cx="50" cy="50" r="48" fill="#fef3c7" />
      <circle cx="50" cy="50" r="35" fill="#f59e0b" className="animate-pulse" />
      <path 
        d="M50 15 L56 44 L85 50 L56 56 L50 85 L44 56 L15 50 L44 44 Z" 
        fill="white" 
        stroke="#d97706" 
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="5" fill="#d97706" />
    </svg>
  );
};

export default Logo;
