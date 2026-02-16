
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset state if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-slate-50 ${containerClassName}`}>
      {/* Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-100">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite] -translate-x-full"></div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[inherit]">
          <div className="w-12 h-12 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-xl">🖼️</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Image Missing</p>
          <code className="text-[9px] text-amber-600 font-mono bg-amber-50 px-2 py-1 rounded border border-amber-100 break-all max-w-full">
            {src}
          </code>
          <p className="mt-4 text-[9px] text-slate-300 leading-relaxed">
            Check if the filename in your folder matches exactly (case-sensitive).
          </p>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          console.warn(`[Kumkum's Canvas] 404: Image not found at path "${src}". Ensure this file exists in your project root.`);
        }}
        className={`smooth-transition duration-700 ${className} ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } ${hasError ? 'hidden' : ''}`}
      />
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
