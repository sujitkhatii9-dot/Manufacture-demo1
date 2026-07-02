import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calculator, PhoneCall, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export default function QuoteModal({ isOpen, onClose, preselectedProduct }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productName: '',
    quantity: '1',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        productName: preselectedProduct || PRODUCTS[0]?.name || 'Custom Bespoke Design',
        quantity: '1',
        notes: '',
      });
      setIsSubmitted(false);
    }
  }, [isOpen, preselectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    // Simulate API registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setGeneratedId(`LBC-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="quote-request-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark Overlay Background */}
      <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Wrapper Box */}
      <div className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl border border-slate-300 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Ribbon */}
        <div className="bg-brand-primary text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-sm bg-brand-secondary flex items-center justify-center">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-black text-xs uppercase tracking-wider leading-none">Instant Quote Estimator</h3>
              <p className="font-mono text-[8px] text-brand-secondary mt-1 uppercase tracking-widest">Fast-Response Pricing</p>
            </div>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-sm hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body / Success details */}
        <div className="p-5 sm:p-6">
          {isSubmitted ? (
            <div id="quote-success-panel" className="text-center space-y-5 py-4">
              <div className="w-12 h-12 rounded-sm bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-black text-base uppercase tracking-tight text-slate-900">Estimation Request Logged!</h4>
                <p className="font-sans text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
                  Namaste, <strong className="text-brand-primary">{formData.name}</strong>. Your estimate ticket has been successfully registered. We will call you at <strong className="text-brand-primary">{formData.phone}</strong> shortly.
                </p>
              </div>

              {/* Receipt / Details summary */}
              <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 text-left space-y-2 max-w-sm mx-auto font-sans">
                <div className="flex justify-between border-b border-slate-200 pb-1.5 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                  <span>Ticket Reference:</span>
                  <span className="font-bold text-brand-primary">{generatedId}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Selected Item:</span>
                  <span className="font-bold text-brand-primary">{formData.productName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Quantity Ordered:</span>
                  <span className="font-bold text-brand-primary">{formData.quantity} unit(s)</span>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-200 pt-1.5 text-[10px]">
                  <span className="text-slate-500">Response Speed:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Within 1 hr
                  </span>
                </div>
              </div>

              <button
                id="modal-success-close-btn"
                onClick={onClose}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-sans font-black uppercase text-xs tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form id="quote-modal-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-0.5">
                <h4 className="font-sans font-black text-base uppercase tracking-tight text-brand-primary">Request Pricing Proposal</h4>
                <p className="font-sans text-slate-500 text-[11px] leading-normal">
                  Provide your contacts and we will calculate the manufacture and freight costs immediately.
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                    value={formData.phone}
                    onChange={handleInputChange}
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
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all"
                  >
                    {PRODUCTS.map((prod) => (
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
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Custom specs */}
              <div className="space-y-1">
                <label className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                  Special Custom Requests (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. 'Engrave my family crest on the plate' or 'Include extra custom glasses'"
                  className="w-full text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary px-3.5 py-2.5 rounded-sm outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                id="quote-modal-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-brand-secondary hover:bg-brand-accent text-white font-sans font-black uppercase tracking-wider text-xs py-3.5 rounded-sm shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Estimate...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Final Estimate</span>
                    <PhoneCall className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
