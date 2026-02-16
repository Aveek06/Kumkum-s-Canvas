
import React, { useEffect, useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPersistentArtworks } from '../constants';
import ArtworkCard from '../components/ArtworkCard';
import { Artwork } from '../types';

const Gallery: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  
  useEffect(() => {
    setArtworks(getPersistentArtworks());
  }, []);

  return (
    <div className="pt-24 md:pt-36 pb-20 md:pb-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation / Back Button */}
        <div className="mb-8 md:mb-12">
            <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black px-6 py-4 border border-slate-200 bg-white/50 hover:bg-white hover:border-amber-400 hover:text-amber-600 smooth-transition text-slate-900 rounded-lg shadow-sm"
            >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 smooth-transition" /> 
            Back
            </Link>
        </div>

        {/* Header */}
        <div className="mb-14 md:mb-24 text-center">
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3 md:mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">The Collection</span>
          <h1 className="text-4xl md:text-8xl font-serif font-bold mb-6 md:mb-8 text-slate-950 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Nature-Inspired <br className="hidden md:block" /> Masterpieces
          </h1>
          <div className="max-w-3xl mx-auto px-2 md:px-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            <p className="text-slate-700 leading-relaxed font-medium text-base md:text-xl mb-4 italic">
              "In every walk with nature, one receives far more than he seeks."
            </p>
            <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-lg">
              Step into a sanctuary where every brushstroke echoes the whispers of the forest and the rhythm of the tides. 
              Each unique <span className="text-[#d97706] font-bold italic">canvas</span> is a testament to the raw, untamed beauty 
              of our world.
            </p>
          </div>
        </div>

        {/* Grid */}
        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24">
            {artworks.map((art, index) => (
              <div 
                key={art.id} 
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ArtworkCard artwork={art} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center animate-in zoom-in duration-1000">
             <Search size={48} className="mx-auto text-slate-200 mb-6" />
             <h3 className="text-2xl font-serif text-slate-400">Our gallery is currently being curated.</h3>
             <p className="mt-4 text-slate-500">Please check back soon for new arrivals.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
