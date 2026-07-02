import React from 'react';
import { Hammer, Mail, Phone, MapPin, Heart, Settings } from 'lucide-react';
import { CONTACT_DETAILS } from '../data';
import { Page, ContactDetails } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  onOpenQuote: () => void;
  contactDetails?: ContactDetails;
  onOpenCPanel?: () => void;
}

export default function Footer({ setCurrentPage, onOpenQuote, contactDetails, onOpenCPanel }: FooterProps) {
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayDetails = contactDetails || CONTACT_DETAILS;

  return (
    <footer id="global-app-footer" className="bg-stone-950 text-stone-400 border-t border-stone-900 font-sans py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-10 sm:pb-12 border-b border-stone-900">
          
          {/* Logo Column */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center space-x-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-sm bg-brand-secondary flex items-center justify-center text-white shadow-md shadow-brand-secondary/20 transition-transform duration-300 group-hover:rotate-6 overflow-hidden">
                {displayDetails.logo ? (
                  <img src={displayDetails.logo} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Hammer className="w-4.5 h-4.5" />
                )}
              </div>
              <div>
                <span className="block font-sans font-black text-base uppercase leading-none tracking-tight text-white">
                  {displayDetails.companyName}
                </span>
                <span className="block font-mono text-[9px] tracking-widest uppercase text-brand-secondary mt-1">
                  PATAN WORKSHOP
                </span>
              </div>
            </button>
            <p className="text-xs text-stone-450 leading-relaxed max-w-sm">
              Authentic hand-hammered copper vessels and heavy bronze tableware forged by veteran master metalworkers in Lalitpur, Nepal. Built for health, design, and generations of durability.
            </p>
          </div>

          {/* Quick Nav Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-white border-b border-stone-900 pb-1">Quick Shortcuts</h4>
            <div className="flex flex-col space-y-2">
              {(['home', 'products', 'about', 'gallery', 'contact'] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => handleNavigate(p)}
                  className="w-fit text-left text-xs text-stone-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wider font-mono"
                >
                  {p} page
                </button>
              ))}
              <button
                onClick={onOpenQuote}
                className="w-fit text-left text-xs font-bold text-brand-secondary hover:text-brand-accent transition-colors cursor-pointer uppercase tracking-wider font-mono"
              >
                Inquire a Quote
              </button>
              {onOpenCPanel && (
                <button
                  onClick={onOpenCPanel}
                  className="w-fit text-left text-xs text-stone-500 hover:text-slate-300 transition-colors cursor-pointer uppercase tracking-wider font-mono flex items-center space-x-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>
          </div>

          {/* Address details shortcuts Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-white border-b border-stone-900 pb-1">Our Patan Workshop</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-secondary shrink-0 mt-0.5" />
                <span>{displayDetails.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                <span>{displayDetails.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                <a href={`mailto:${displayDetails.email}`} className="hover:text-white transition-colors">
                  {displayDetails.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright column */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-stone-500">
          <p>© 2026 {displayDetails.companyName}. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Sustaining local Newar artisan livelihoods with</span>
            <Heart className="w-3 h-3 text-brand-secondary fill-brand-secondary" />
            <span>in Nepal.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
