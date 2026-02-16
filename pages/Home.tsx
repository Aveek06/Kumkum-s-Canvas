
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Palette, ArrowUpRight, Leaf, Heart } from 'lucide-react';
import { ARTWORKS, ARTIST_NAME, BRAND_NAME } from '../constants';
import OptimizedImage from '../components/OptimizedImage';

const FloatingLeaf = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <div 
    className={`absolute pointer-events-none opacity-20 text-emerald-800/40 animate-[float_6s_ease-in-out_infinite] ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <Leaf size={48} />
  </div>
);

const Home: React.FC = () => {
  const featured = ARTWORKS.filter(a => a.isFeatured).slice(0, 3);

  useEffect(() => {
    document.title = 'Kumkum’s Canvas | Buy Original Canvas Paintings Online';
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white px-6 overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-5xl h-[700px]">
            {/* The Sky/Ocean Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[75%] -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[100px] animate-pulse duration-[8s]"></div>
            {/* The Sun Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-1/2 w-[550px] h-[550px] bg-amber-100/50 rounded-full blur-[90px] animate-pulse duration-[10s] delay-1000"></div>
            {/* The Meadow Element */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-50/30 rounded-[100%] blur-[80px]"></div>
          </div>
        </div>

        {/* Floating Nature Particles */}
        <FloatingLeaf className="top-1/4 left-[10%]" delay={0} />
        <FloatingLeaf className="bottom-1/4 right-[12%] -rotate-45" delay={2} />
        <FloatingLeaf className="top-1/3 right-[20%] rotate-90" delay={4} />
        
        {/* Subtle Sun Glints */}
        <div className="absolute top-1/4 right-[15%] w-2 h-2 bg-amber-300 rounded-full blur-sm animate-ping duration-[4s]"></div>
        <div className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 bg-sky-300 rounded-full blur-sm animate-ping duration-[3s] delay-700"></div>

        <div className="relative z-10 text-center max-w-4xl pt-20">
          <div className="mb-12">
            <h1 className="text-5xl md:text-8xl font-serif font-black text-slate-950 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
              Where Nature <br className="hidden md:block" /> Meets the <br className="hidden md:block" />
              <span className="text-[#d97706] italic font-serif relative inline-block">
                Canvas
                <div className="absolute -right-8 md:-right-12 -top-6 md:-top-8 text-emerald-600/30 rotate-12 animate-bounce">
                  <Leaf size={40} strokeWidth={1} />
                </div>
              </span>
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed animate-[fade-pulse_4s_ease-in-out_infinite]">
              Discover a collection of premium contemporary artworks inspired by 
              the <span className="text-amber-700 border-b border-amber-200/50">warmth of the sun</span>, the <span className="text-sky-700 border-b border-sky-200/50">depth of the ocean</span>, 
              and the <span className="text-emerald-700 border-b border-emerald-200/50">whispers of the wild</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/gallery" className="bg-slate-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600 smooth-transition shadow-2xl hover:scale-105 active:scale-95">
                Explore Gallery
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(15deg); }
          }
          @keyframes fade-pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>
      </section>

      {/* Featured Artwork Section */}
      <section className="py-32 bg-white/40 backdrop-blur-sm px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">Curated Selection</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900">Featured Masterpieces</h2>
            </div>
            <Link to="/gallery" className="group flex items-center gap-3 font-bold text-sm uppercase tracking-widest border-b-2 border-slate-900 pb-2 hover:text-amber-600 hover:border-amber-600 smooth-transition text-slate-900">
              View Full Gallery <ArrowRight size={18} className="group-hover:translate-x-2 smooth-transition" />
            </Link>
          </div>

          <div className="space-y-40">
            {featured.map((artwork, index) => (
              <div key={artwork.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
                <div className="w-full md:w-2/3">
                  <Link to={`/artwork/${artwork.id}`} className="group block relative overflow-hidden rounded-[3rem] bg-white shadow-2xl border-8 border-white">
                    <div className="aspect-[16/10] overflow-hidden">
                      <OptimizedImage 
                        src={artwork.imageUrl} 
                        alt={artwork.title} 
                        className={`w-full h-full object-cover group-hover:scale-110 ${!artwork.available ? 'grayscale-[0.3]' : ''}`}
                      />
                    </div>
                    
                    {!artwork.available && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="bg-slate-950/80 backdrop-blur-md text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-2xl border border-white/20 transform -rotate-2">
                          Sold Out
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 z-10 bg-slate-950/20 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                      <div className="bg-white text-slate-950 p-6 rounded-full shadow-2xl scale-75 group-hover:scale-100 smooth-transition">
                        <ArrowUpRight size={32} />
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="w-full md:w-1/3 space-y-8">
                  <div className="space-y-4">
                    <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs block">{artwork.category}</span>
                    <h3 className="text-5xl md:text-6xl font-serif font-bold text-slate-950 leading-tight">{artwork.title}</h3>
                  </div>
                  
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    {artwork.description}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <p className="text-4xl font-black text-slate-950">₹{artwork.price.toLocaleString('en-IN')}</p>
                    <span className="w-12 h-px bg-slate-200"></span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{artwork.medium}</span>
                  </div>

                  <Link 
                    to={`/artwork/${artwork.id}`} 
                    className="inline-flex items-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600 smooth-transition shadow-2xl hover:scale-105 active:scale-95"
                  >
                    Experience Artwork <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 bg-sky-50/50 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <OptimizedImage 
                src="https://picsum.photos/seed/artist/800/1000" 
                alt={ARTIST_NAME} 
                className="w-full grayscale hover:grayscale-0" 
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border-4 border-amber-400 rounded-full z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-sky-200/50 rounded-full z-0"></div>
          </div>
          
          <div className="md:w-1/2">
            <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">The Heart Behind the Brush</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight text-slate-950">About {ARTIST_NAME}</h2>
            <p className="text-lg text-slate-800 mb-8 leading-relaxed font-medium">
              For me, art isn't just about paint on a surface. It's about capturing a vibration, a warmth, or a feeling that words can't quite touch. "{BRAND_NAME}" was born from a desire to bring more light into domestic spaces.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="flex gap-4">
                    <div className="p-3 bg-white shadow-sm rounded-xl h-fit text-amber-600"><Palette size={24} /></div>
                    <div>
                        <h4 className="font-bold text-slate-950">Handcrafted Originals</h4>
                        <p className="text-sm text-slate-600">Pure artistic expression on canvas.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="p-3 bg-white shadow-sm rounded-xl h-fit text-sky-600"><Sun size={24} /></div>
                    <div>
                        <h4 className="font-bold text-slate-950">Global Delivery</h4>
                        <p className="text-sm text-slate-600">Shipped with care worldwide.</p>
                    </div>
                </div>
            </div>
            <Link to="/about" className="bg-slate-950 text-white px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600 smooth-transition shadow-2xl">
              Read My Journey
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-amber-400 p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-slate-950">Bring Harmony to Your Home</h2>
            <p className="text-lg md:text-xl text-slate-900/80 mb-12 max-w-2xl mx-auto leading-relaxed font-bold">
              Whether it’s a living room focal point or a bedroom sanctuary, find the piece that speaks to your soul.
            </p>
            <Link to="/gallery" className="inline-block bg-slate-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 smooth-transition shadow-2xl">
               Shop the Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
