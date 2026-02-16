
import React from 'react';
import { BRAND_NAME, ARTIST_NAME, SOCIAL_LINKS } from '../constants';
import { Quote, Sparkles, Heart, Sun, Instagram, Facebook } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-32">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2">
                <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">Meet the Soul Behind the Brush</span>
                <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight text-slate-950">About {ARTIST_NAME}</h1>
                <p className="text-xl text-slate-800 leading-relaxed font-semibold italic">
                    "I believe that art is a silent conversation between the artist's heart and the viewer's soul."
                </p>
            </div>
            <div className="md:w-1/2 relative">
                <OptimizedImage 
                  src="/Kumkum_Photo.JPG" 
                  alt={ARTIST_NAME} 
                  containerClassName="rounded-[4rem] shadow-2xl border-4 border-white"
                  className="w-full h-auto"
                />
                <div className="absolute -bottom-10 -left-10 bg-amber-400 p-8 rounded-3xl shadow-xl hidden md:block border-4 border-white z-10">
                    <span className="text-4xl font-serif font-bold text-slate-950">10+</span>
                    <p className="text-xs uppercase tracking-widest font-bold text-slate-900">Years of Passion</p>
                </div>
            </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="bg-white/60 backdrop-blur-md px-6 py-32 border-y border-white">
        <div className="max-w-3xl mx-auto">
            <Quote className="text-amber-600/20 w-24 h-24 mb-10 -ml-10" />
            <div className="space-y-10 text-lg text-slate-900 leading-relaxed font-medium">
                <p>
                    My journey with <span className="text-slate-950 font-bold">{BRAND_NAME}</span> began in a sun-drenched studio where I realized that color has the power to shift our emotional state. Having spent over a decade exploring different mediums, I found my voice in the interplay of golden yellows and oceanic teals.
                </p>
                <div className="bg-sky-50 p-12 rounded-[3rem] border-l-8 border-amber-400 shadow-inner">
                    <h3 className="text-2xl font-serif font-bold mb-4 text-slate-950 italic">The Inspiration</h3>
                    <p className="text-slate-800">
                        Growing up near the coastline, the daily transformation of the sky during sunrise became my first teacher. The way the light pierces through the morning mist, turning gray waves into sparkling diamonds, is a phenomenon I try to recreate in every piece.
                    </p>
                </div>
                <p>
                    Today, my work is collected by individuals across five continents. Whether it's a large-scale abstract or an intimate portrait, my goal remains the same: to create a piece of art that feels like a warm embrace for your home.
                </p>
            </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/90 backdrop-blur-md p-12 rounded-[3rem] shadow-lg border border-white text-center">
                <Sun className="mx-auto text-amber-500 mb-6" size={48} />
                <h3 className="text-2xl font-serif font-bold mb-4 text-slate-950">Warmth</h3>
                <p className="text-slate-700 leading-relaxed font-medium">Infusing every canvas with the radiant energy of the sun.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-12 rounded-[3rem] shadow-lg border border-white text-center">
                <Heart className="mx-auto text-rose-500 mb-6" size={48} />
                <h3 className="text-2xl font-serif font-bold mb-4 text-slate-950">Authenticity</h3>
                <p className="text-slate-700 leading-relaxed font-medium">Hand-painted with emotional honesty and premium materials.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-12 rounded-[3rem] shadow-lg border border-white text-center">
                <Sparkles className="mx-auto text-sky-500 mb-6" size={48} />
                <h3 className="text-2xl font-serif font-bold mb-4 text-slate-950">Exclusivity</h3>
                <p className="text-slate-700 leading-relaxed font-medium">One-of-a-kind originals that become heirloom pieces.</p>
            </div>
        </div>
      </section>

      {/* Social Connection Section */}
      <section className="px-6 py-20 bg-slate-950 text-white overflow-hidden relative rounded-[4rem] max-w-7xl mx-auto mb-32">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif font-bold">Join the Creative Journey</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Follow along for behind-the-scenes looks into the studio, new artwork reveals, and daily inspirations from nature.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="p-5 bg-white/10 rounded-full group-hover:bg-amber-500 smooth-transition">
                <Instagram size={32} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white smooth-transition">Instagram</span>
            </a>
            <a 
              href={SOCIAL_LINKS.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="p-5 bg-white/10 rounded-full group-hover:bg-sky-500 smooth-transition">
                <Facebook size={32} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white smooth-transition">Facebook</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
