import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Hammer, ShieldCheck, CheckCircle2, Truck, Heart, ArrowLeft, ArrowRight, Sparkles, ChevronRight, MapPin, Phone, Mail, Clock, ExternalLink, Calculator, PhoneCall, Settings } from 'lucide-react';

import { Page, Product, ProcessStep, StrengthsCard, GalleryItem, OwnerMessage, ContactDetails, Review } from './types';
import {
  CONTACT_DETAILS,
  MANUFACTURING_STEPS,
  WHY_CHOOSE_US,
  PRODUCTS,
  GALLERY_ITEMS,
  OWNER_DETAILS,
  DEFAULT_REVIEWS
} from './data';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutView from './components/AboutView';
import ProductsView from './components/ProductsView';
import GalleryView from './components/GalleryView';
import ContactView from './components/ContactView';
import QuoteModal from './components/QuoteModal';
import Footer from './components/Footer';
import CPanel from './components/CPanel';

// Icons mapping helper for Raw Material, Production, Quality Check
const PROCESS_ICON_MAP: Record<string, React.ComponentType<any>> = {
  Layers: Layers,
  Hammer: Hammer,
  ShieldCheck: ShieldCheck,
};

// Icons mapping helper for Strengths
const STRENGTH_ICON_MAP: Record<string, React.ComponentType<any>> = {
  CheckCircle2: CheckCircle2,
  Truck: Truck,
  Heart: Heart,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string | undefined>(undefined);
  const [isCPanelOpen, setIsCPanelOpen] = useState(false);

  // DYNAMIC STATES (cPanel Editable State Manager)
  const [contactDetails, setContactDetails] = useState<ContactDetails>(() => {
    const saved = localStorage.getItem('lbc_contact_details');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tagline === "Hammered to Perfection. Handcrafted for Generations." || parsed.tagline === "Handcrafted Nepalese copperware, made for generations.") {
          parsed.tagline = CONTACT_DETAILS.tagline;
        }
        if (parsed.aboutText && parsed.aboutText.includes("We are a premier manufacturing workshop in Lalitpur, Nepal")) {
          parsed.aboutText = CONTACT_DETAILS.aboutText;
        }
        if (parsed.heroBackground && parsed.heroBackground.startsWith('/src/assets/')) {
          parsed.heroBackground = parsed.heroBackground.replace('/src/assets/', '/assets/');
        }
        if (!parsed.heroBackground || 
            parsed.heroBackground === "/assets/images/workshop_hero_1782904334846.jpg" || 
            parsed.heroBackground === "/assets/images/workshop_hero_bright_1782914207481.jpg") {
          parsed.heroBackground = CONTACT_DETAILS.heroBackground;
        }
        return parsed;
      } catch (e) {
        return CONTACT_DETAILS;
      }
    }
    return CONTACT_DETAILS;
  });

  const [manufacturingSteps, setManufacturingSteps] = useState<ProcessStep[]>(() => {
    const saved = localStorage.getItem('lbc_manufacturing_steps');
    return saved ? JSON.parse(saved) : MANUFACTURING_STEPS;
  });

  const [whyChooseUs, setWhyChooseUs] = useState<StrengthsCard[]>(() => {
    const saved = localStorage.getItem('lbc_why_choose_us');
    return saved ? JSON.parse(saved) : WHY_CHOOSE_US;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lbc_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Product[];
        return parsed.map(p => ({
          ...p,
          image: p.image && p.image.startsWith('/src/assets/') ? p.image.replace('/src/assets/', '/assets/') : p.image
        }));
      } catch (e) {
        return PRODUCTS;
      }
    }
    return PRODUCTS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('lbc_gallery_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GalleryItem[];
        return parsed.map(g => ({
          ...g,
          image: g.image && g.image.startsWith('/src/assets/') ? g.image.replace('/src/assets/', '/assets/') : g.image
        }));
      } catch (e) {
        return GALLERY_ITEMS;
      }
    }
    return GALLERY_ITEMS;
  });

  const [ownerDetails, setOwnerDetails] = useState<OwnerMessage>(() => {
    const saved = localStorage.getItem('lbc_owner_details');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as OwnerMessage;
        if (parsed.image && parsed.image.startsWith('/src/assets/')) {
          parsed.image = parsed.image.replace('/src/assets/', '/assets/');
        }
        return parsed;
      } catch (e) {
        return OWNER_DETAILS;
      }
    }
    return OWNER_DETAILS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('lbc_reviews');
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });

  // LOCAL STORAGE SYNCHRONIZERS
  useEffect(() => {
    localStorage.setItem('lbc_contact_details', JSON.stringify(contactDetails));
  }, [contactDetails]);

  useEffect(() => {
    localStorage.setItem('lbc_manufacturing_steps', JSON.stringify(manufacturingSteps));
  }, [manufacturingSteps]);

  useEffect(() => {
    localStorage.setItem('lbc_why_choose_us', JSON.stringify(whyChooseUs));
  }, [whyChooseUs]);

  useEffect(() => {
    localStorage.setItem('lbc_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lbc_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('lbc_owner_details', JSON.stringify(ownerDetails));
  }, [ownerDetails]);

  useEffect(() => {
    localStorage.setItem('lbc_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // RESET TO DEFAULT UTILITY
  const handleResetToDefault = () => {
    localStorage.removeItem('lbc_contact_details');
    localStorage.removeItem('lbc_manufacturing_steps');
    localStorage.removeItem('lbc_why_choose_us');
    localStorage.removeItem('lbc_products');
    localStorage.removeItem('lbc_gallery_items');
    localStorage.removeItem('lbc_owner_details');
    localStorage.removeItem('lbc_reviews');

    setContactDetails(CONTACT_DETAILS);
    setManufacturingSteps(MANUFACTURING_STEPS);
    setWhyChooseUs(WHY_CHOOSE_US);
    setProducts(PRODUCTS);
    setGalleryItems(GALLERY_ITEMS);
    setOwnerDetails(OWNER_DETAILS);
    setReviews(DEFAULT_REVIEWS);
  };

  // Home Page Gallery Preview Index state
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleOpenQuote = (productName?: string) => {
    setQuoteProduct(productName);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setQuoteProduct(undefined);
  };

  const handleNextPreview = () => {
    if (!galleryItems.length) return;
    setPreviewIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrevPreview = () => {
    if (!galleryItems.length) return;
    setPreviewIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  // Inline CTA form states
  const [inlineFormData, setInlineFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productName: PRODUCTS[0]?.name || 'Classic Hammered Copper Carafe Set',
    quantity: '1',
    notes: '',
  });
  const [isInlineSubmitting, setIsInlineSubmitting] = useState(false);
  const [isInlineSubmitted, setIsInlineSubmitted] = useState(false);
  const [inlineGeneratedId, setInlineGeneratedId] = useState('');

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineFormData.name || !inlineFormData.email || !inlineFormData.phone) return;

    setIsInlineSubmitting(true);
    setTimeout(() => {
      setIsInlineSubmitting(false);
      setIsInlineSubmitted(true);
      setInlineGeneratedId(`LBC-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  const handleInlineInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInlineFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-brand-light text-brand-primary font-sans antialiased selection:bg-brand-secondary/20 min-h-screen flex flex-col justify-between">
      
      {/* Dynamic Header / Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenQuote={handleOpenQuote}
        contactDetails={contactDetails}
        onOpenCPanel={() => setIsCPanelOpen(true)}
      />

      {/* Main Page Rendering */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* SECTION 1: HERO (Built in Hero.tsx) */}
              <Hero
                onOpenQuote={handleOpenQuote}
                onExploreProducts={() => {
                  setCurrentPage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                contactDetails={contactDetails}
              />

              {/* SECTION 3: WHY CHOOSE US (3 cards with icon, bold heading, 1-2 line reason) */}
              <section id="why-choose-us" className="py-20 sm:py-24 bg-brand-light border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
                    <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
                      OUR PROMISE
                    </span>
                    <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight mt-3 mb-3">
                      Why Choose Us
                    </h2>
                    <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
                      We bridge antique Newar metalworking secrets with modern food-grade material verification.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {whyChooseUs.map((strength) => {
                      const IconComp = STRENGTH_ICON_MAP[strength.icon] || CheckCircle2;
                      return (
                        <div
                          key={strength.id}
                          id={`strength-card-${strength.id}`}
                          className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm hover:border-brand-secondary hover:shadow-md transition-all duration-300 group"
                        >
                          <div className="w-10 h-10 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-5 group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <h3 className="font-sans font-black text-sm uppercase tracking-wider text-brand-primary mb-2">
                            {strength.title}
                          </h3>
                          <p className="font-sans text-slate-500 text-xs leading-relaxed">
                            {strength.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SECTION 4: FEATURED PRODUCTS (3 product cards with image, name, short description, "Order Now" button) */}
              <section id="featured-products" className="py-20 sm:py-24 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-4">
                    <div className="max-w-2xl">
                      <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
                        CURATED HIGHLIGHTS
                      </span>
                      <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight mt-3 mb-3">
                        Featured Craftsmanship
                      </h2>
                      <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
                        Browse our highly requested masterpieces. Made with heavy thick-gauge copper and bell bronze alloys.
                      </p>
                    </div>
                    <button
                      id="view-all-products-btn"
                      onClick={() => {
                        setCurrentPage('products');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center space-x-1 text-brand-secondary hover:text-brand-accent font-sans font-bold text-xs uppercase tracking-wider group cursor-pointer shrink-0"
                    >
                      <span>View Full Collection</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {products.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        id={`featured-card-${product.id}`}
                        className="bg-brand-light rounded-sm overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group h-full hover:border-brand-secondary hover:shadow-md transition-all duration-300"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-slate-100 border-b border-slate-200">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="font-sans font-black text-base uppercase tracking-tight text-brand-primary mb-2">
                              {product.name}
                            </h3>
                            <p className="font-sans text-slate-500 text-xs leading-relaxed mb-4">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 mt-auto border-t border-slate-200 pt-4">
                            <div>
                              <span className="block font-mono text-[8px] uppercase tracking-widest text-slate-400">Nepal Pricing</span>
                              <span className="font-sans font-black text-sm text-brand-secondary">{product.priceEstimate}</span>
                            </div>
                            <button
                              id={`featured-order-btn-${product.id}`}
                              onClick={() => handleOpenQuote(product.name)}
                              className="bg-slate-900 hover:bg-brand-secondary text-white font-sans font-black uppercase tracking-wider text-[10px] py-2.5 px-4.5 rounded-sm transition-colors cursor-pointer"
                            >
                              Order Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 2: HOW WE MANUFACTURE (3-step process section with icons) */}
              <section id="how-we-manufacture" className="py-20 sm:py-24 bg-brand-light border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
                    <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
                      THE PROCESS
                    </span>
                    <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight mt-3 mb-3">
                      How We Manufacture
                    </h2>
                    <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
                      Every piece goes through an arduous, master-led cycle inside our Patan foundry to meet culinary-grade and heirloom durability standards.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
                    {/* Visual connect lines between steps (desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-slate-100 -translate-y-12 z-0" />

                    {manufacturingSteps.map((step, idx) => {
                      const IconComp = PROCESS_ICON_MAP[step.icon] || Hammer;
                      return (
                        <div
                          key={step.id}
                          id={`process-step-card-${step.id}`}
                          className="relative z-10 flex flex-col items-center text-center group bg-white p-6 rounded-sm border border-slate-200 hover:border-brand-secondary hover:shadow-sm transition-all duration-300"
                        >
                          {/* Step Icon circle */}
                          <div className="w-14 h-14 rounded-sm bg-brand-primary text-white flex items-center justify-center mb-5 shadow-sm group-hover:bg-brand-secondary group-hover:scale-103 transition-all duration-300">
                            <IconComp className="w-5 h-5" />
                          </div>
                          
                          <h3 className="font-sans font-black text-xs uppercase tracking-wider text-brand-primary mb-2">
                            {step.title}
                          </h3>
                          
                          <p className="font-sans text-slate-500 text-xs leading-relaxed max-w-xs">
                            {step.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SECTION 6: OWNER SECTION (owner photo, name, short quote (2-3 lines), title) */}
              <section id="owner-statement" className="py-20 sm:py-24 bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
                    
                    {/* Owner Portrait Photo */}
                    <div className="md:col-span-5">
                      <div className="aspect-square rounded-sm overflow-hidden border border-slate-200 shadow-md">
                        <img
                          src={ownerDetails.image}
                          alt={ownerDetails.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Owner Details & Message */}
                    <div className="md:col-span-7 space-y-4">
                      <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
                        MEET THE MAKER
                      </span>
                      <h2 className="font-sans font-black text-2xl sm:text-3xl text-brand-primary uppercase tracking-tight">
                        Authentic Handcrafted Promise
                      </h2>
                      <blockquote className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed italic border-l-2 border-brand-secondary pl-4">
                        "{ownerDetails.quote}"
                      </blockquote>
                      <div>
                        <h4 className="font-sans font-black text-sm uppercase tracking-wider text-brand-primary leading-none">
                          {ownerDetails.name}
                        </h4>
                        <p className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest mt-1.5">
                          {ownerDetails.title}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* SECTION 5: GALLERY PREVIEW (horizontal image slideshow with left/right arrow buttons, no grid) */}
              <section id="gallery-preview-section" className="py-20 sm:py-24 bg-slate-950 text-white overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Slider Header */}
                  <div className="text-center mb-10 sm:mb-12">
                    <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
                      WORKSHOP SNIPPETS
                    </span>
                    <h2 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-3 mb-3">
                      Gallery Preview
                    </h2>
                    <p className="font-sans text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                      Step inside our Patan District foundry. Use the arrow keys below to slide through our manufacturing processes.
                    </p>
                  </div>

                  {/* Horizontal Slider Display */}
                  <div className="relative max-w-6xl mx-auto aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full min-h-[450px] sm:min-h-[580px] md:min-h-[640px] rounded-sm overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
                    {galleryItems.length > 0 ? (
                      <>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={galleryItems[previewIndex]?.id || 'empty'}
                            src={galleryItems[previewIndex]?.image || ''}
                            alt={galleryItems[previewIndex]?.title || ''}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/45" />

                        {/* Navigation Arrows */}
                        <button
                          id="preview-slider-prev-btn"
                          onClick={handlePrevPreview}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/60 hover:bg-brand-secondary text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/10 cursor-pointer"
                          aria-label="Previous image"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>

                        <button
                          id="preview-slider-next-btn"
                          onClick={handleNextPreview}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/60 hover:bg-brand-secondary text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/10 cursor-pointer"
                          aria-label="Next image"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        {/* Capsule details */}
                        <div className="absolute bottom-6 left-6 right-6 text-left">
                          <h3 className="font-sans font-black text-sm uppercase tracking-wider text-white mb-1">
                            {galleryItems[previewIndex]?.title}
                          </h3>
                          <p className="font-sans text-slate-300 text-xs max-w-md leading-relaxed">
                            {galleryItems[previewIndex]?.description}
                          </p>
                        </div>

                        {/* Slides Indicator Dots */}
                        <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md text-[10px] font-mono px-2.5 py-1 rounded-sm border border-white/10">
                          {previewIndex + 1} / {galleryItems.length}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 font-sans text-sm">
                        <span>No gallery slides available. Open cPanel to upload slides.</span>
                      </div>
                    )}
                  </div>

                  {/* Button to go to the full gallery view */}
                  <div className="mt-10 text-center">
                    <button
                      id="go-to-full-gallery-btn"
                      onClick={() => {
                        setCurrentPage('gallery');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white/5 hover:bg-white/10 text-white font-sans font-black uppercase tracking-wider text-xs px-6 py-3 rounded-sm border border-white/10 transition-colors cursor-pointer"
                    >
                      Open Full Interactive Gallery Slideshow
                    </button>
                  </div>

                </div>
              </section>

              {/* SECTION: CLIENT REVIEWS & TESTIMONIALS */}
              <section id="homepage-testimonials" className="py-20 sm:py-24 bg-brand-light border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
                    <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
                      TESTIMONIALS
                    </span>
                    <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-primary uppercase tracking-tight mt-3 mb-3">
                      Reviews from Collectors & Chefs
                    </h2>
                    <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
                      Sustaining livelihoods in Lalitpur, Nepalese copperware has won heart-felt reviews globally. Read direct quotes from our patrons.
                    </p>
                  </div>

                  {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                      {reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm relative flex flex-col justify-between group hover:border-brand-secondary hover:shadow-md transition-all duration-300"
                        >
                          <div className="space-y-4">
                            {/* Stars */}
                            <div className="flex items-center space-x-1 text-amber-500">
                              {Array.from({ length: Math.min(5, Math.max(1, rev.rating)) }).map((_, i) => (
                                <span key={i} className="text-lg">★</span>
                              ))}
                            </div>
                            
                            {/* Comment */}
                            <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                              "{rev.comment}"
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-150 flex items-center justify-between">
                            <div>
                              <h4 className="font-sans font-black text-xs uppercase text-brand-primary leading-none">
                                {rev.author}
                              </h4>
                              <p className="font-mono text-[9px] text-brand-secondary uppercase mt-1">
                                {rev.location}
                              </p>
                            </div>
                            {rev.date && (
                              <span className="font-mono text-[9px] text-slate-400">
                                {rev.date}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-12 bg-white rounded-sm border border-slate-200">
                      <p className="font-sans text-slate-400 text-sm">No reviews registered. Open cPanel to add reviews.</p>
                    </div>
                  )}

                </div>
              </section>

              {/* SECTION 7: READY TO ORDER & CONTACT DETAILS (Full CTA Box and direct details on page) */}
              <section id="homepage-cta-banner" className="py-20 sm:py-24 bg-brand-primary text-white relative overflow-hidden border-t border-slate-800">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left Column: Bold Text & Full Contact Information */}
                    <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                      <div className="space-y-3">
                        <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5 inline-block">
                          GET IN TOUCH
                        </span>
                        <h2 className="font-sans font-black text-2.5xl sm:text-4xl uppercase tracking-tighter leading-none text-white">
                          Ready to Order Custom Copperware?
                        </h2>
                        <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed">
                          Sustaining local Patan copper-smithing livelihoods. We manufacture and supply worldwide. Send a request or reach our workshop directly using the coordinates below.
                        </p>
                      </div>

                      {/* Contact Coordinates on the Page */}
                      <div className="space-y-4">
                        {/* Address */}
                        <div className="flex items-start space-x-3.5 p-4 rounded-sm bg-white/5 border border-white/5 hover:border-brand-secondary/25 transition-all">
                          <div className="w-9 h-9 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-1">Our Forge & Office</h4>
                            <p className="font-sans text-slate-300 text-xs leading-normal">
                              {contactDetails.address}
                            </p>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-3.5 p-4 rounded-sm bg-white/5 border border-white/5 hover:border-brand-secondary/25 transition-all">
                          <div className="w-9 h-9 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-1">Call Our Desk</h4>
                            <p className="font-sans text-slate-300 text-xs">
                              Direct Line: <a href={`tel:${contactDetails.phone}`} className="font-bold text-white hover:text-brand-secondary transition-colors">{contactDetails.phone}</a>
                            </p>
                            <p className="font-sans text-slate-400 text-[10px] mt-1">
                              Speak with Gyanendra or our desk managers in Patan.
                            </p>
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-3.5 p-4 rounded-sm bg-white/5 border border-white/5 hover:border-brand-secondary/25 transition-all">
                          <div className="w-9 h-9 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-1">Send an Email</h4>
                            <a
                              href={`mailto:${contactDetails.email}`}
                              className="font-sans font-black text-xs uppercase tracking-wider text-brand-secondary hover:text-brand-accent transition-colors"
                            >
                              {contactDetails.email}
                            </a>
                            <p className="font-sans text-slate-400 text-[10px] mt-1">
                              We reply to standard email inquiries within 12 business hours.
                            </p>
                          </div>
                        </div>

                        {/* Working Hours */}
                        <div className="flex items-start space-x-3.5 p-4 rounded-sm bg-white/5 border border-white/5 hover:border-brand-secondary/25 transition-all">
                          <div className="w-9 h-9 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-1">Business Hours</h4>
                            <p className="font-sans text-slate-300 text-xs">
                              Sunday – Friday: 9:00 AM – 6:00 PM
                            </p>
                            <p className="font-sans text-slate-400 text-[10px] mt-1">
                              Saturdays: Closed (Artisans' Weekly Rest Day)
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right Column: Full CTA Box (Inline Quote Request Form) */}
                    <div className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-8 rounded-sm shadow-2xl border border-slate-200 relative">
                      
                      {isInlineSubmitted ? (
                        <div id="inline-quote-success-panel" className="text-center space-y-6 py-6 animate-in fade-in duration-350">
                          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-sans font-black text-lg uppercase tracking-tight text-slate-900">Estimation Request Logged!</h4>
                            <p className="font-sans text-slate-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                              Namaste, <strong className="text-brand-primary">{inlineFormData.name}</strong>. Your estimate request has been registered. We will call you at <strong className="text-brand-primary">{inlineFormData.phone}</strong> shortly.
                            </p>
                          </div>

                          {/* Ticket Summary Details */}
                          <div className="bg-slate-50 p-5 rounded-sm border border-slate-200 text-left space-y-2.5 max-w-md mx-auto font-sans">
                            <div className="flex justify-between border-b border-slate-200 pb-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                              <span>Ticket Reference:</span>
                              <span className="font-bold text-brand-primary">{inlineGeneratedId}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Selected Item:</span>
                              <span className="font-bold text-brand-primary">{inlineFormData.productName}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Quantity Ordered:</span>
                              <span className="font-bold text-brand-primary">{inlineFormData.quantity} unit(s)</span>
                            </div>
                            <div className="flex justify-between text-xs border-t border-slate-200 pt-2 text-[10px]">
                              <span className="text-slate-500">Response Speed:</span>
                              <span className="text-emerald-600 font-bold flex items-center gap-1 uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Within 1 hr
                              </span>
                            </div>
                          </div>

                          <button
                            id="inline-quote-reset-btn"
                            onClick={() => setIsInlineSubmitted(false)}
                            className="bg-brand-primary hover:bg-brand-secondary text-white font-sans font-black uppercase text-xs tracking-wider px-6 py-3 rounded-sm transition-colors cursor-pointer inline-block"
                          >
                            Submit Another Request
                          </button>
                        </div>
                      ) : (
                        <form id="inline-cta-form" onSubmit={handleInlineSubmit} className="space-y-4">
                          <div className="space-y-1">
                            <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-primary leading-none">
                              Request Pricing Proposal
                            </h3>
                            <p className="font-sans text-slate-500 text-xs leading-normal">
                              Provide your details below to get an instant volume price and shipping cost estimation directly from our workshop managers.
                            </p>
                          </div>

                          {/* Full Name */}
                          <div className="space-y-1">
                            <label className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                              Your Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={inlineFormData.name}
                              onChange={handleInlineInputChange}
                              placeholder="e.g. Sujit Khati"
                              className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all"
                            />
                          </div>

                          {/* Grid: Phone & Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Phone */}
                            <div className="space-y-1">
                              <label className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                required
                                value={inlineFormData.phone}
                                onChange={handleInlineInputChange}
                                placeholder="e.g. +977 98510XXXXX"
                                className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all"
                              />
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                              <label className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                name="email"
                                required
                                value={inlineFormData.email}
                                onChange={handleInlineInputChange}
                                placeholder="e.g. sujit@gmail.com"
                                className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all"
                              />
                            </div>
                          </div>

                          {/* Grid: Product and Quantity */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            {/* Product Select */}
                            <div className="space-y-1 sm:col-span-8">
                              <label className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                                Select Product
                              </label>
                              <select
                                name="productName"
                                value={inlineFormData.productName}
                                onChange={handleInlineInputChange}
                                className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all"
                              >
                                {products.map((prod) => (
                                  <option key={prod.id} value={prod.name}>
                                    {prod.name}
                                  </option>
                                ))}
                                <option value="Custom Bespoke Copper Fabrication">Custom Copper Fabrication</option>
                                <option value="Custom Brass Dinner Set (Wholesale)">Custom Brass Set (Wholesale)</option>
                                <option value="Other / Singing Bowl Sizing">Other Singing Bowls</option>
                              </select>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-1 sm:col-span-4">
                              <label className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                                Quantity
                              </label>
                              <input
                                type="number"
                                name="quantity"
                                min="1"
                                max="1000"
                                required
                                value={inlineFormData.quantity}
                                onChange={handleInlineInputChange}
                                className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all"
                              />
                            </div>
                          </div>

                          {/* Custom specs */}
                          <div className="space-y-1">
                            <label className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                              Special Custom Requests / Size Sizing (Optional)
                            </label>
                            <textarea
                              name="notes"
                              rows={3}
                              value={inlineFormData.notes}
                              onChange={handleInlineInputChange}
                              placeholder="e.g. 'Custom hammered design' or 'Looking for 15 thali sets with customized engravings'..."
                              className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            id="inline-cta-submit-btn"
                            disabled={isInlineSubmitting}
                            className="w-full bg-brand-secondary hover:bg-brand-accent text-white font-sans font-black uppercase tracking-wider text-xs py-4 rounded-sm shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
                          >
                            {isInlineSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Generating Estimate Ticket...</span>
                              </>
                            ) : (
                              <>
                                <span>Get Your Free Proposal</span>
                                <Calculator className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </form>
                      )}

                    </div>

                  </div>

                  {/* Embedded Google Map right below CTA form box */}
                  <div className="mt-12 sm:mt-16 rounded-sm overflow-hidden border border-white/10 shadow-2xl relative">
                    <iframe
                      src="https://maps.google.com/maps?q=Patan%20Industrial%20Estate,%20Lalitpur,%20Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-[350px] sm:h-[450px] border-0 bg-slate-900"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lalitpur Brass & Copper Workshop Map"
                    ></iframe>
                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {currentPage === 'products' && (
            <motion.div
              key="products-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductsView onOpenQuote={handleOpenQuote} products={products} />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AboutView contactDetails={contactDetails} whyChooseUs={whyChooseUs} ownerDetails={ownerDetails} />
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GalleryView galleryItems={galleryItems} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ContactView contactDetails={contactDetails} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onOpenQuote={() => handleOpenQuote()}
        contactDetails={contactDetails}
        onOpenCPanel={() => setIsCPanelOpen(true)}
      />

      {/* Persistent Quote / Fast Order Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        preselectedProduct={quoteProduct}
      />

      {/* Dynamic Client-Side cPanel Modal */}
      <CPanel
        isOpen={isCPanelOpen}
        onClose={() => setIsCPanelOpen(false)}
        contactDetails={contactDetails}
        setContactDetails={setContactDetails}
        manufacturingSteps={manufacturingSteps}
        setManufacturingSteps={setManufacturingSteps}
        whyChooseUs={whyChooseUs}
        setWhyChooseUs={setWhyChooseUs}
        products={products}
        setProducts={setProducts}
        galleryItems={galleryItems}
        setGalleryItems={setGalleryItems}
        ownerDetails={ownerDetails}
        setOwnerDetails={setOwnerDetails}
        reviews={reviews}
        setReviews={setReviews}
        onResetToDefault={handleResetToDefault}
      />

      {/* Subtle Floating Admin FAB */}
      <button
        onClick={() => setIsCPanelOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-brand-primary text-white hover:bg-brand-secondary rounded-full shadow-lg border border-slate-800 flex items-center justify-center cursor-pointer transition-all duration-300 group hover:rotate-45"
        title="Admin Control Panel"
      >
        <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

    </div>
  );
}
