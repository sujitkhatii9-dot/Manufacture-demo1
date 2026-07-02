import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Shield } from 'lucide-react';
import { ContactDetails } from '../types';
import { CONTACT_DETAILS } from '../data';

interface HeroProps {
  onOpenQuote: (productName?: string) => void;
  onExploreProducts: () => void;
  contactDetails?: ContactDetails;
}

export default function Hero({ onOpenQuote, onExploreProducts, contactDetails }: HeroProps) {
  const displayDetails = contactDetails || CONTACT_DETAILS;
  const bgImage = displayDetails.heroBackground || "/assets/images/lalitpur_copper_hero_bright_1782974326173.jpg";

  return (
    <div id="home-hero-section" className="relative h-screen min-h-[750px] sm:min-h-[850px] flex flex-col justify-between overflow-hidden bg-stone-950 pt-32 pb-6 sm:pb-8">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Lalitpur Copper Workshop"
          className="w-full h-full object-cover object-center opacity-100 scale-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col justify-between h-full w-full">
        
        {/* Upper Brand Info - Shifted higher as requested */}
        <div className="flex-none pt-4 sm:pt-6 pb-4 flex flex-col justify-center">
          {/* Made in Nepal badge - Red background removed as requested */}
          <motion.div
            id="hero-origin-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="border border-white/20 text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] inline-block bg-white/5 rounded-sm">
              100% Traditional Handcraft • Established 1998
            </span>
          </motion.div>

          {/* Brand Main Title - Enhanced elegant design & increased size */}
          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans font-black text-4xl sm:text-6xl lg:text-7.5xl uppercase leading-none tracking-tight mb-6 text-white drop-shadow-md"
          >
            {displayDetails.companyName.split(' ').map((word, idx) => (
              <span key={idx} className={idx >= 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-brand-secondary to-amber-500 font-black" : "font-black text-white"}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Tagline - Beautifully centered short description in the middle between title and lower CTA buttons */}
          <motion.p
            id="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-xs sm:text-sm md:text-base text-slate-300 font-medium max-w-2xl mx-auto mt-4 leading-relaxed normal-case"
          >
            {displayDetails.tagline}
          </motion.p>
        </div>

        {/* Lower Content containing CTAs and Credential Cards - Spaced and Lowered */}
        <div className="space-y-8 sm:space-y-10 mt-auto">
          {/* Call To Actions */}
          <motion.div
            id="hero-cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              id="hero-quote-btn"
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto bg-brand-secondary hover:bg-brand-accent text-white font-sans font-black uppercase tracking-wider text-xs px-8 py-4 rounded-sm shadow-lg transition-colors cursor-pointer"
            >
              Get a Quote
            </button>
            
            <button
              id="hero-explore-btn"
              onClick={onExploreProducts}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-sans font-black uppercase tracking-wider text-xs px-8 py-4 rounded-sm border border-white/10 hover:border-white/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Micro Credential Cards in single horizontal row */}
          <motion.div
            id="hero-credentials"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8"
          >
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-sm border border-white/5 hover:border-brand-secondary/30 transition-all">
              <Shield className="w-5 h-5 text-brand-secondary mb-2" />
              <span className="font-sans text-slate-300 text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-normal">Lead-Free Materials</span>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-sm border border-white/5 hover:border-brand-secondary/30 transition-all">
              <span className="font-mono text-brand-secondary font-black text-sm mb-1.5 leading-none">99.9%</span>
              <span className="font-sans text-slate-300 text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-normal">Pure Red Copper</span>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-sm border border-white/5 hover:border-brand-secondary/30 transition-all">
              <MessageSquare className="w-5 h-5 text-brand-secondary mb-2" />
              <span className="font-sans text-slate-300 text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-normal">Custom Sizes Quoted</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
