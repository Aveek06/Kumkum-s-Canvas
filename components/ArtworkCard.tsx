
import React from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../types';
import OptimizedImage from './OptimizedImage';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  return (
    <Link to={`/artwork/${artwork.id}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-white aspect-[4/5] mb-5 md:mb-7 shadow-xl shadow-slate-200/50 border-[6px] md:border-[10px] border-white group-hover:shadow-amber-200/40 smooth-transition">
        <OptimizedImage
          src={artwork.imageUrl}
          alt={artwork.title}
          containerClassName="w-full h-full"
          className={`w-full h-full object-cover group-hover:scale-110 ${!artwork.available ? 'grayscale-[0.3]' : ''}`}
        />
        
        {/* Sold Out Overlay */}
        {!artwork.available && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="bg-slate-950/80 backdrop-blur-md text-white px-6 md:px-10 py-2.5 md:py-4 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-2xl border border-white/20 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
              Sold Out
            </div>
          </div>
        )}
        
        {/* Desktop-only Hover Details */}
        <div className="absolute inset-0 z-10 bg-slate-950/20 opacity-0 group-hover:opacity-100 hidden md:flex smooth-transition items-center justify-center">
          <span className="bg-white text-slate-950 px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 smooth-transition shadow-2xl">
            {artwork.available ? 'Explore Work' : 'View Archive'}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 md:space-y-3 px-1 md:px-2">
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="font-serif text-2xl md:text-3xl text-slate-950 group-hover:text-amber-600 smooth-transition font-bold truncate leading-tight">
            {artwork.title}
          </h3>
          <p className="font-black text-xl md:text-2xl text-slate-950 shrink-0">
            ₹{artwork.price.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{artwork.category}</span>
          <span className="w-1 h-1 bg-amber-400 rounded-full"></span> 
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest truncate">{artwork.medium}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;
