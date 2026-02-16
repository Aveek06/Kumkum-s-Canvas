
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Copy, Check, X, MessageCircle, Facebook, Twitter } from 'lucide-react';
import { Artwork } from '../types';
import OptimizedImage from './OptimizedImage';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const artworkUrl = `${window.location.origin}/#/artwork/${artwork.id}`;

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(artworkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      url: `https://wa.me/?text=${encodeURIComponent(`Check out this stunning artwork "${artwork.title}" at Kumkum's Canvas: ${artworkUrl}`)}`,
      color: 'hover:bg-[#25D366] hover:text-white'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(artworkUrl)}`,
      color: 'hover:bg-[#1877F2] hover:text-white'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Captivated by "${artwork.title}" at Kumkum's Canvas. Check it out:`)}&url=${encodeURIComponent(artworkUrl)}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white'
    }
  ];

  return (
    <>
      <Link to={`/artwork/${artwork.id}`} className="group block h-full relative">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-white aspect-[4/5] mb-5 md:mb-7 shadow-xl shadow-slate-200/50 border-[6px] md:border-[10px] border-white group-hover:shadow-amber-200/40 smooth-transition">
          <OptimizedImage
            src={artwork.imageUrl}
            alt={artwork.title}
            containerClassName="w-full h-full"
            className={`w-full h-full object-cover group-hover:scale-110 ${!artwork.available ? 'grayscale-[0.3]' : ''}`}
          />
          
          {/* Share Button Trigger */}
          <button 
            onClick={handleShareClick}
            className="absolute top-4 right-4 z-20 p-3 bg-white/80 backdrop-blur-md text-slate-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 smooth-transition hover:bg-amber-400 hover:scale-110"
            aria-label="Share artwork"
          >
            <Share2 size={18} />
          </button>
          
          {/* Sold Out Overlay */}
          {!artwork.available && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="bg-slate-950/80 backdrop-blur-md text-white px-6 md:px-10 py-2.5 md:py-4 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-2xl border border-white/20 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                Sold Out
              </div>
            </div>
          )}
          
          {/* Desktop-only Hover Details */}
          <div className="absolute inset-0 z-10 bg-slate-950/20 opacity-0 group-hover:opacity-100 hidden md:flex smooth-transition items-center justify-center pointer-events-none">
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

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" 
            onClick={() => setIsShareModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 md:p-10 animate-in zoom-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-slate-950">Share Artwork</h2>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="p-2 bg-slate-50 text-slate-400 hover:text-slate-950 rounded-full smooth-transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">Copy Link</label>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <input 
                    type="text" 
                    readOnly 
                    value={artworkUrl}
                    className="flex-grow bg-transparent border-none text-[10px] font-bold text-slate-600 outline-none px-2 truncate"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className={`p-3 rounded-xl smooth-transition ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-amber-600'}`}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">Spread the word</label>
                <div className="grid grid-cols-3 gap-3">
                  {shareLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 smooth-transition text-slate-500 ${link.color}`}
                    >
                      {link.icon}
                      <span className="text-[9px] font-black uppercase tracking-widest">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title} 
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <p className="font-bold text-slate-950 text-sm">{artwork.title}</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{artwork.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtworkCard;
