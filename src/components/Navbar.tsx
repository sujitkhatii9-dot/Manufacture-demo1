import React, { useState, useEffect } from 'react';
import { Menu, X, Hammer, Settings } from 'lucide-react';
import { Page, ContactDetails } from '../types';
import { CONTACT_DETAILS } from '../data';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onOpenQuote: (productName?: string) => void;
  contactDetails?: ContactDetails;
  onOpenCPanel: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, onOpenQuote, contactDetails, onOpenCPanel }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const displayDetails = contactDetails || CONTACT_DETAILS;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Products', value: 'products' },
    { label: 'About', value: 'about' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparent = (currentPage === 'home' || currentPage === 'gallery') && !isScrolled;

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-5'
          : 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Branding - Logo and company name at the top, workshop below */}
          <button
            id="nav-logo"
            onClick={() => handleNavigate('home')}
            className="flex items-center space-x-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-7.5 h-7.5 rounded-sm bg-brand-secondary flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:rotate-12 shrink-0 overflow-hidden">
              {displayDetails.logo ? (
                <img src={displayDetails.logo} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <Hammer className="w-4 h-4" />
              )}
            </div>
            <div>
              <span className={`block font-sans font-black text-sm sm:text-base uppercase leading-none tracking-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-brand-primary'
              }`}>
                {displayDetails.companyName}
              </span>
              <span className="block font-mono text-[9px] tracking-widest uppercase text-brand-secondary mt-1 font-black leading-none">
                Patan Workshop
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`nav-item-${item.value}`}
                onClick={() => handleNavigate(item.value)}
                className={`font-sans font-bold text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer relative py-1 ${
                  currentPage === item.value
                    ? 'text-brand-secondary'
                    : isTransparent ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-brand-primary'
                }`}
              >
                {item.label}
                {currentPage === item.value && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-sm bg-brand-secondary" />
                )}
              </button>
            ))}
            
            {/* cPanel Button */}
            <button
              id="desktop-cpanel-btn"
              onClick={onOpenCPanel}
              className={`p-2.5 rounded-sm transition-colors cursor-pointer ${
                isTransparent 
                  ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                  : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
              }`}
              title="Open Admin Console"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
            </button>

            <button
              id="desktop-quote-cta"
              onClick={() => onOpenQuote()}
              className={`font-sans font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-sm shadow-sm transition-all duration-200 cursor-pointer ${
                isTransparent
                  ? 'bg-white/10 border border-white/25 text-white hover:bg-brand-secondary hover:border-brand-secondary'
                  : 'bg-slate-900 text-white hover:bg-brand-secondary'
              }`}
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-sm focus:outline-none transition-colors ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      {isOpen && (
        <div id="mobile-navigation-tray" className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-4 px-4 transition-all">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                id={`mobile-nav-item-${item.value}`}
                onClick={() => handleNavigate(item.value)}
                className={`w-full text-left font-sans font-bold text-xs uppercase tracking-widest px-4 py-3 rounded-sm transition-colors ${
                  currentPage === item.value
                    ? 'bg-brand-secondary/10 text-brand-secondary font-black'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <hr className="border-slate-100 my-2" />
            <button
              id="mobile-cpanel-btn"
              onClick={() => {
                setIsOpen(false);
                onOpenCPanel();
              }}
              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs uppercase tracking-widest py-3 rounded-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin cPanel Console</span>
            </button>
            <button
              id="mobile-quote-cta"
              onClick={() => {
                setIsOpen(false);
                onOpenQuote();
              }}
              className="w-full text-center bg-slate-900 hover:bg-brand-secondary text-white font-sans font-bold text-xs uppercase tracking-widest py-3 rounded-sm transition-colors cursor-pointer"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
