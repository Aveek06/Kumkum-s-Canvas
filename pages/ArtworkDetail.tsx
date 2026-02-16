
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Ruler, Palette, CheckCircle2, Sparkles, BookOpen, X, Maximize2, Layout, Heart } from 'lucide-react';
import { getPersistentArtworks, WHATSAPP_NUMBER, SOCIAL_LINKS } from '../constants';
import OptimizedImage from '../components/OptimizedImage';
import { Artwork, PrintOption } from '../types';

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

type PurchaseOption = 'original' | 'print';

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [purchaseType, setPurchaseType] = useState<PurchaseOption>('original');
  const [selectedPrintOption, setSelectedPrintOption] = useState<PrintOption | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const arts = getPersistentArtworks();
    const found = arts.find(a => a.id === id);
    if (found) {
      setArtwork(found);
      if (found.printPrices && found.printPrices.length > 0) {
        setSelectedPrintOption(found.printPrices[0]);
      }
      if (!found.available) {
        setPurchaseType('print');
      }
    }
  }, [id]);

  if (!artwork) {
    return (
      <div className="pt-40 pb-40 text-center px-6">
        <h2 className="text-3xl font-serif mb-6 text-slate-900">Piece Not Found</h2>
        <Link to="/gallery" className="text-amber-600 font-bold flex items-center gap-2 mx-auto hover:gap-4 smooth-transition w-fit">
          <ArrowLeft size={18} /> Back to Gallery
        </Link>
      </div>
    );
  }

  const currentPrice = purchaseType === 'original' 
    ? artwork.price 
    : (selectedPrintOption?.price || 0);

  const handleInquiry = () => {
    const detail = purchaseType === 'original' 
      ? `Original Artwork` 
      : `Fine Art Print (Size: ${selectedPrintOption?.size})`;
      
    const message = encodeURIComponent(`Hi Kumkum! I'm absolutely in love with "${artwork.title}". I'd like to inquire about purchasing the ${detail}. Price quoted: ₹${currentPrice.toLocaleString('en-IN')}. Please let me know the next steps!`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleEmailInquiry = () => {
    const detail = purchaseType === 'original' 
      ? `Original Piece` 
      : `Fine Art Print (${selectedPrintOption?.size})`;
    
    const subject = `Enquiry: ${artwork.title} (${detail})`;
    const body = `Hi Kumkum,\n\nI am interested in acquiring your artwork "${artwork.title}".\n\nOption: ${detail}\nQuoted Price: ₹${currentPrice.toLocaleString('en-IN')}\n\nPlease share the payment details and estimated shipping time.\n\nBest regards,`;
    
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="pt-24 md:pt-36 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
            <Link 
            to="/gallery" 
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black px-6 py-4 border border-slate-200 bg-white/50 hover:bg-white hover:border-amber-400 hover:text-amber-600 smooth-transition text-slate-900 rounded-lg shadow-sm"
            >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 smooth-transition" /> 
            Back
            </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full lg:w-3/5">
            <div className="sticky top-32">
              <button 
                onClick={() => setIsLightboxOpen(true)}
                className="w-full relative rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-4 md:border-8 border-white group cursor-zoom-in"
              >
                <OptimizedImage 
                  src={artwork.imageUrl} 
                  alt={artwork.title} 
                  loading="eager"
                  className={`w-full h-auto object-cover group-hover:scale-105 duration-1000 ${!artwork.available && purchaseType === 'original' ? 'opacity-80' : ''}`}
                />
                {!artwork.available && purchaseType === 'original' && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="bg-slate-950/80 backdrop-blur-md text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-2xl border border-white/20 -rotate-3">
                      Sold Out
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 z-10 bg-slate-950/20 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-full shadow-2xl">
                    <Maximize2 size={24} className="text-slate-950" />
                  </div>
                </div>
              </button>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-12">
                <div className="flex gap-4">
                    <Ruler className="text-amber-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Dimensions</h4>
                      <p className="font-bold text-slate-950">{artwork.size}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Palette className="text-sky-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Medium</h4>
                      <p className="font-bold text-slate-950">{artwork.medium}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Original</h4>
                      <p className={`font-bold ${artwork.available ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {artwork.available ? 'Available' : 'Sold Out'}
                      </p>
                    </div>
                </div>
              </div>

              <div className="mt-16 bg-white/40 backdrop-blur-md rounded-[3rem] p-10 border border-white shadow-xl">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-amber-400 rounded-2xl text-slate-950 shadow-lg">
                       <Layout size={28} />
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Styling Guide</h3>
                      <h2 className="text-2xl font-serif font-bold text-slate-950">Home Décor Inspiration</h2>
                    </div>
                 </div>
                 <p className="text-slate-800 leading-relaxed text-lg font-medium mb-8">
                   {artwork.decorInspiration}
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <span className="bg-slate-950/5 text-slate-950 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-950/10">#InteriorStyling</span>
                    <span className="bg-slate-950/5 text-slate-950 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-950/10">#GalleryWall</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col">
            <div className="bg-amber-400 p-8 md:p-12 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(251,191,36,0.3)] border-4 border-white relative animate-in fade-in zoom-in duration-700">
              <div className="absolute top-12 right-12 text-slate-950/20">
                <Sparkles size={60} strokeWidth={1} />
              </div>

              <span className="text-slate-950 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{artwork.category} Collection</span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-slate-950 leading-[1.1]">{artwork.title}</h1>
              
              <div className="mb-10 flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black text-slate-950 tracking-tight">₹{currentPrice.toLocaleString('en-IN')}</span>
                  <span className="text-slate-950/70 text-sm font-black uppercase tracking-widest">INR</span>
              </div>

              <div className="mb-10 p-1.5 bg-white/30 backdrop-blur-md rounded-[2.5rem] flex border border-white/40 shadow-inner">
                <button 
                  onClick={() => artwork.available && setPurchaseType('original')}
                  disabled={!artwork.available}
                  className={`flex-1 py-6 px-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] smooth-transition flex flex-col items-center gap-1 ${
                    purchaseType === 'original' 
                      ? 'bg-slate-950 text-white shadow-xl scale-[1.02]' 
                      : !artwork.available ? 'text-slate-950/30 cursor-not-allowed' : 'text-slate-950 hover:bg-white/40'
                  }`}
                >
                  <span>Original Piece</span>
                </button>
                <button 
                  onClick={() => artwork.printPrices && artwork.printPrices.length > 0 && setPurchaseType('print')}
                  disabled={!artwork.printPrices || artwork.printPrices.length === 0}
                  className={`flex-1 py-6 px-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] smooth-transition flex flex-col items-center gap-1 ${
                    purchaseType === 'print' 
                      ? 'bg-slate-950 text-white shadow-xl scale-[1.02]' 
                      : (!artwork.printPrices || artwork.printPrices.length === 0) ? 'text-slate-950/30 cursor-not-allowed' : 'text-slate-950 hover:bg-white/40'
                  }`}
                >
                  <span>Fine Art Print</span>
                </button>
              </div>

              {purchaseType === 'print' && artwork.printPrices && (
                <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                   <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-950 mb-4">Select Print Size</h3>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {artwork.printPrices.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedPrintOption(option)}
                          className={`p-4 border-2 rounded-2xl smooth-transition text-center group ${
                            selectedPrintOption?.size === option.size 
                              ? 'border-slate-950 bg-white shadow-lg' 
                              : 'border-white/20 bg-white/10 hover:border-white/60'
                          }`}
                        >
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedPrintOption?.size === option.size ? 'text-slate-950' : 'text-slate-900'}`}>{option.size}</p>
                          <p className="text-[9px] text-slate-950/60 font-black">₹{option.price.toLocaleString('en-IN')}</p>
                        </button>
                      ))}
                   </div>
                </div>
              )}

              <div className="bg-white/20 rounded-[3rem] p-8 md:p-10 space-y-12 border border-white/30 mb-12">
                  <div>
                      <h3 className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-slate-950 mb-5">
                          <BookOpen size={20} className="text-amber-900" /> Story behind the painting
                      </h3>
                      <p className="text-slate-950 leading-relaxed font-bold text-sm md:text-base">
                        {artwork.story}
                      </p>
                  </div>
                  
                  <div>
                      <h3 className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-slate-950 mb-5">
                          <Sparkles size={20} className="text-indigo-800" /> Inspiration
                      </h3>
                      <p className="text-slate-950 leading-relaxed italic font-black text-base md:text-lg">
                        "{artwork.inspiration}"
                      </p>
                  </div>
              </div>

              <div className="space-y-4">
                <button 
                    onClick={handleInquiry}
                    className="w-full bg-slate-950 text-white py-8 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-slate-950 flex items-center justify-center gap-4 shadow-2xl hover:scale-105 active:scale-95 smooth-transition group mb-2"
                >
                    <WhatsAppIcon size={24} className="group-hover:rotate-12 transition-transform" />
                    Enquire on WhatsApp
                </button>
                <button 
                    onClick={handleEmailInquiry}
                    className="w-full bg-white/40 backdrop-blur-sm text-slate-950 py-8 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-950 hover:text-white flex items-center justify-center gap-4 shadow-sm border border-white/40 hover:scale-105 active:scale-95 smooth-transition group"
                >
                    <Mail size={24} className="group-hover:-rotate-12 transition-transform" />
                    Enquire via Email
                </button>
              </div>

              <div className="mt-8 flex justify-center items-center gap-3 text-slate-950/60 font-black text-[9px] uppercase tracking-[0.2em]">
                <Heart size={14} className="text-rose-600" />
                Complimentary Gift Wrapping Included
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 mt-12">
              <p className="text-center text-[9px] text-slate-400 uppercase tracking-[0.3em] font-black flex items-center gap-4 w-full">
                <span className="flex-grow h-px bg-slate-200"></span> 
                Handcrafted & Authentic
                <span className="flex-grow h-px bg-slate-200"></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            className="absolute top-10 right-10 text-white/50 hover:text-white smooth-transition p-3 rounded-full bg-white/5"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X size={40} />
          </button>
          
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={artwork.imageUrl} alt={artwork.title} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in duration-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
