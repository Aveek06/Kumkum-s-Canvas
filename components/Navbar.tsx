
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-xl py-3 md:py-4' 
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group relative z-[70]">
            <Logo className="w-10 h-10 group-hover:rotate-6 transition-transform duration-500" />
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors duration-500">
              {BRAND_NAME}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] uppercase tracking-[0.3em] font-black hover:text-amber-600 smooth-transition relative group ${
                  location.pathname === link.path ? 'text-amber-600' : 'text-slate-900'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            <Link to="/gallery" className="bg-slate-950 text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:scale-105 active:scale-95 smooth-transition flex items-center gap-2 shadow-2xl">
              <ShoppingBag size={14} />
              Shop Now
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden text-slate-950 p-2 hover:bg-slate-100 rounded-full smooth-transition relative z-[70]" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-[60] bg-white/95 backdrop-blur-3xl transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center p-10 space-y-12">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-5xl font-serif font-bold transition-all duration-700 transform ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              } ${
                location.pathname === link.path ? 'text-amber-600' : 'text-slate-950'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/gallery"
            onClick={() => setIsOpen(false)}
            className={`bg-slate-950 text-white text-center py-6 px-12 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-2xl active:scale-95 transition-all duration-700 transform ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </>
  );
};

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
];

export default Navbar;
