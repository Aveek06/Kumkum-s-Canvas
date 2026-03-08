
import React from 'react';

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
  loading = 'eager'
}) => {
  return (
    <div className={`relative overflow-hidden bg-slate-50 ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        className={`w-full h-full ${className}`}
        onError={(e) => {
          console.error(`[Kumkum's Canvas] Image failed to load: ${src}`);
          // We remove the random fallback to avoid confusion. 
          // If it fails, it will show the alt text or a broken image icon which is more helpful for debugging.
        }}
      />
    </div>
  );
};

export default OptimizedImage;
