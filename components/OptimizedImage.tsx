
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
  // Helper to convert Google Drive sharing links to direct image links
  const getDirectImageUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const id = url.match(/\/d\/(.+?)\//)?.[1] || url.match(/id=(.+?)(&|$)/)?.[1];
      if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
    }
    return url;
  };

  const processedSrc = getDirectImageUrl(src);

  return (
    <div className={`relative overflow-hidden bg-slate-50 ${containerClassName}`}>
      <img
        src={processedSrc}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        className={`w-full h-full ${className}`}
        onError={(e) => {
          console.error(`[Kumkum's Canvas] Image failed to load: ${processedSrc}`);
        }}
      />
    </div>
  );
};

export default OptimizedImage;
