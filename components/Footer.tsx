
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { BRAND_NAME, SOCIAL_LINKS } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Brand Column */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-4 mb-8">
            <Logo className="w-12 h-12" />
            <h2 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">{BRAND_NAME}</h2>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed text-lg font-medium">
            Curating moments of beauty, sunlight, and serenity through fine art. 
            Every stroke is a story, every canvas a window to a peaceful world.
          </p>
        </div>

        {/* Empty Spacer Column for Desktop */}
        <div className="hidden md:block md:col-span-1"></div>

        {/* Navigation Column */}
        <div className="md:col-span-3">
          <h3 className="font-serif text-[11px] uppercase tracking-[0.4em] mb-10 text-slate-400 font-black">Navigation</h3>
          <ul className="space-y-6">
            <li>
              <Link to="/" className="text-slate-600 hover:text-amber-600 font-bold smooth-transition text-lg block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-slate-600 hover:text-amber-600 font-bold smooth-transition text-lg block">
                Art Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-slate-600 hover:text-amber-600 font-bold smooth-transition text-lg block">
                About Artist
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect Column */}
        <div className="md:col-span-3">
          <h3 className="font-serif text-[11px] uppercase tracking-[0.4em] mb-10 text-slate-400 font-black">Connect</h3>
          <div className="flex gap-4">
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-xl hover:border-amber-400 hover:text-amber-600 smooth-transition"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a 
              href={SOCIAL_LINKS.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-xl hover:border-amber-400 hover:text-amber-600 smooth-transition"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`} 
              className="p-4 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-xl hover:border-amber-400 hover:text-amber-600 smooth-transition"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-slate-400">
        <p className="tracking-tight">&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        <p className="mt-4 md:mt-0 italic font-serif text-slate-300">Luxury Fine Art Gallery</p>
      </div>
    </footer>
  );
};

export default Footer;
