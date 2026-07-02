import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Camera, Grid, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';

interface GalleryViewProps {
  galleryItems?: GalleryItem[];
}

export default function GalleryView({ galleryItems }: GalleryViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayItems = galleryItems || GALLERY_ITEMS;

  const handleNext = () => {
    if (!displayItems.length) return;
    setActiveIndex((prev) => (prev + 1) % displayItems.length);
  };

  const handlePrev = () => {
    if (!displayItems.length) return;
    setActiveIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  };

  const activeItem = displayItems[activeIndex] || { id: 'fallback', title: 'Patan Workshop', description: 'Traditional craftsmanship', image: '' };

  return (
    <div id="gallery-page-view" className="bg-brand-primary text-white min-h-screen py-20 sm:py-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
            VISUAL STORY
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mt-3 mb-4">
            Forged in Flame, Crafted by Hand
          </h2>
          <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed">
            A window into our Patan industrial district workshop, showcasing the raw craftsmanship behind our premium brassware, copper carafes, and resonant singing bowls.
          </p>
        </div>

        {/* Master Slideshow Container */}
        {displayItems.length > 0 ? (
          <div className="relative max-w-6xl mx-auto bg-slate-900 rounded-sm overflow-hidden shadow-2xl border border-slate-800">
            
            {/* Main Slide Area */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full min-h-[450px] sm:min-h-[580px] md:min-h-[640px] overflow-hidden bg-black flex items-center justify-center">
              
              {/* Slide Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Slide Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/45" />

              {/* Left Control Arrow */}
              <button
                id="gallery-nav-prev-btn"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/60 hover:bg-brand-secondary text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/10 cursor-pointer"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Right Control Arrow */}
              <button
                id="gallery-nav-next-btn"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/60 hover:bg-brand-secondary text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/10 cursor-pointer"
                aria-label="Next image"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Image Count Badge */}
              <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1.5 rounded-sm border border-white/10">
                {activeIndex + 1} / {displayItems.length}
              </div>

              {/* Active Caption Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-left">
                <motion.div
                  key={`caption-${activeItem.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-2xl"
                >
                  <div className="flex items-center space-x-2 text-brand-secondary font-mono text-[9px] tracking-widest uppercase mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Lalitpur Workshop Feature</span>
                  </div>
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight text-white mb-1.5 leading-snug">
                    {activeItem.title}
                  </h3>
                  <p className="font-sans text-slate-300 text-xs leading-relaxed">
                    {activeItem.description}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Thumbnail Track */}
            <div className="bg-slate-900 border-t border-slate-800 p-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {displayItems.map((item, index) => (
                  <button
                    key={item.id}
                    id={`gallery-thumb-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`relative w-16 sm:w-20 aspect-video rounded-sm overflow-hidden shrink-0 border transition-all duration-200 cursor-pointer ${
                      activeIndex === index
                        ? 'border-brand-secondary scale-103 shadow-md shadow-brand-secondary/25'
                        : 'border-transparent opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900 rounded-sm border border-slate-800">
            <p className="font-sans text-slate-400 text-sm">No gallery items registered. Open cPanel to add items.</p>
          </div>
        )}

        {/* Informative craftsmanship caption at the bottom of Gallery page */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-500 mb-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] tracking-wider uppercase">Authentic Workshop Media</span>
          </div>
          <p className="font-sans text-slate-400 text-xs italic leading-relaxed">
            All photography captured in-house at our Patan Industrial District plant. We welcome client visits by appointment to view our smelting and hand-beating processes first-hand.
          </p>
        </div>

      </div>
    </div>
  );
}
