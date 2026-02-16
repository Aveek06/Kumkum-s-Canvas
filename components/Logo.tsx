
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => (
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

export default Logo;
