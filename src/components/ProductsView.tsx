import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CircleCheck, Star, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ProductsViewProps {
  onOpenQuote: (productName?: string) => void;
  products?: Product[];
}

export default function ProductsView({ onOpenQuote, products }: ProductsViewProps) {
  const displayProducts = products || PRODUCTS;

  return (
    <div id="products-page-view" className="bg-brand-light min-h-screen py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
            OUR COLLECTION
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-brand-primary uppercase tracking-tight mt-3 mb-4">
            Handcrafted Masterpieces for Modern Homes
          </h2>
          <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">
            Every piece in our catalog is forged from solid, premium copper or bronze alloy, meticulously balanced, hammered, and polished. Order standard sets or request a custom size.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              id={`product-card-${product.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:border-brand-secondary hover:shadow-md transition-all duration-300 flex flex-col group h-full"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden bg-slate-100 border-b border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                {/* Micro Tag */}
                <div className="absolute top-3 left-3 bg-slate-900/95 text-white px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-widest uppercase flex items-center space-x-1 border border-slate-700">
                  <Sparkles className="w-3 h-3 text-brand-secondary" />
                  <span>Hand Hammered</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-primary leading-tight group-hover:text-brand-secondary transition-colors duration-200">
                      {product.name}
                    </h3>
                  </div>

                  <p className="font-sans text-slate-500 text-xs leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="mb-4 bg-slate-50 p-3.5 rounded-sm border border-slate-200">
                    <span className="block font-mono text-[9px] uppercase text-slate-400 tracking-wider mb-0.5">Estimated Pricing:</span>
                    <span className="font-sans font-black text-sm text-brand-secondary">{product.priceEstimate}</span>
                  </div>

                  {/* Bullet features */}
                  <div className="space-y-1.5 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-slate-600 text-xs">
                        <CircleCheck className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Actions */}
                <div className="flex items-center gap-3 mt-auto">
                  <button
                    id={`product-quote-btn-${product.id}`}
                    onClick={() => onOpenQuote(product.name)}
                    className="flex-1 bg-brand-primary hover:bg-brand-secondary text-white font-sans font-black uppercase tracking-wider text-[10px] py-3 px-4 rounded-sm shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Get a Quote
                  </button>
                  <button
                    id={`product-order-btn-${product.id}`}
                    onClick={() => onOpenQuote(product.name)}
                    className="flex-1 bg-brand-secondary hover:bg-brand-accent text-white font-sans font-black uppercase tracking-wider text-[10px] py-3 px-4 rounded-sm shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Order Box */}
        <div className="mt-16 bg-brand-primary rounded-sm p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
              TAILORED SOLUTIONS
            </span>
            <h3 className="font-sans font-black text-2.5xl sm:text-3.5xl uppercase tracking-tight mt-3 mb-4 text-white">Need custom dimensions or bulk restaurant sets?</h3>
            <p className="font-sans text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              We regularly manufacture bespoke designs for boutique luxury hotels, high-end fine dining spots, and cultural heritage exhibits. Share your technical drawings, hand-sketches, or specific measurements and our designers will prepare a custom proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                id="custom-order-cta"
                onClick={() => onOpenQuote("Custom Bespoke Fabrication")}
                className="w-full sm:w-auto bg-brand-secondary hover:bg-brand-accent text-white font-sans font-black uppercase tracking-wider text-xs px-6 py-3.5 rounded-sm shadow-md transition-colors cursor-pointer"
              >
                Inquire Custom Design
              </button>
              <div className="text-slate-400 text-xs font-medium">
                <span>Or email drawings to </span>
                <a href="mailto:namaste@lalitpurcopper.com" className="text-white hover:text-brand-secondary font-bold underline transition-colors">namaste@lalitpurcopper.com</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
