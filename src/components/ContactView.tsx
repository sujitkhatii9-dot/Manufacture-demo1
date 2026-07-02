import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink, CheckCircle2, Clock, Landmark } from 'lucide-react';
import { ContactDetails } from '../types';
import { CONTACT_DETAILS } from '../data';

interface ContactViewProps {
  contactDetails?: ContactDetails;
}

export default function ContactView({ contactDetails }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const displayDetails = contactDetails || CONTACT_DETAILS;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="contact-page-view" className="bg-brand-light min-h-screen py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
            CONNECT
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-brand-primary uppercase tracking-tight mt-3 mb-4">
            Get in Touch With Our Workshop
          </h2>
          <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">
            Have questions about copper care, shipping costs, or custom dimensions? Reach out directly via phone, email, or our interactive form below.
          </p>
        </div>

        {/* Info & Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-primary mb-6">
              Workshop Contact Information
            </h3>

            {/* Address Card */}
            <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-sans font-black text-sm uppercase tracking-wider text-slate-900 mb-1">Our Forge & Office</h4>
                <p className="font-sans text-slate-600 text-xs leading-relaxed">
                  {displayDetails.address}
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-black text-sm uppercase tracking-wider text-slate-900 mb-1">Call Our Desk</h4>
                <p className="font-sans text-slate-600 text-xs leading-relaxed mb-1">
                  Landline: <span className="font-bold text-brand-primary">{displayDetails.phone}</span>
                </p>
                <p className="font-sans text-slate-400 text-[11px] leading-normal">
                  Speak directly with Gyanendra or our desk managers in Nepali, Newari, or English.
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-black text-sm uppercase tracking-wider text-slate-900 mb-1">Send an Email</h4>
                <a
                  href={`mailto:${displayDetails.email}`}
                  className="font-sans font-black text-xs uppercase tracking-wider text-brand-secondary hover:text-brand-accent transition-colors"
                >
                  {displayDetails.email}
                </a>
                <p className="font-sans text-slate-400 text-[11px] leading-normal mt-1">
                  We reply to all standard email quotes within 12 business hours.
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-brand-primary text-white p-5 rounded-sm border border-slate-800 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-black text-sm uppercase tracking-wider text-white mb-1">Business Hours</h4>
                <p className="font-sans text-slate-300 text-xs leading-relaxed">
                  Sunday – Friday: 9:00 AM – 6:00 PM
                </p>
                <p className="font-sans text-slate-400 text-[11px] mt-1">
                  Saturdays: Closed (Artisans Day Off)
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm relative">
            
            {isSubmitted ? (
              <div id="contact-success-state" className="text-center py-12 space-y-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight text-slate-950">Thank you! Message Sent</h3>
                  <p className="font-sans text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Namaste, we have received your inquiry. One of our workshop representatives will review the details and get back to you within 12 hours.
                  </p>
                </div>
                <button
                  id="contact-reset-btn"
                  onClick={() => setIsSubmitted(false)}
                  className="bg-brand-primary hover:bg-brand-secondary text-white font-sans font-black text-[10px] uppercase tracking-wider px-6 py-3 rounded-sm transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form id="contact-form-inner" onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-primary">
                  Inquire Now
                </h3>
                <p className="font-sans text-slate-400 text-xs leading-relaxed mb-4">
                  Fill in your details below and our team will get in touch to assist with your order.
                </p>

                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Suman Shakya"
                    className="w-full font-sans text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/10 px-3.5 py-2.5 rounded-sm outline-none transition-all"
                  />
                </div>

                {/* Grid: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. suman@gmail.com"
                      className="w-full font-sans text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/10 px-3.5 py-2.5 rounded-sm outline-none transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +977 98510-12345"
                      className="w-full font-sans text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/10 px-3.5 py-2.5 rounded-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="space-y-1">
                  <label htmlFor="subject" className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                    Inquiry Topic
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full font-sans text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/10 px-3.5 py-2.5 rounded-sm outline-none transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Sizing & Pricing">Product Sizing & Pricing</option>
                    <option value="Bulk Order for Hotel/Restaurant">Bulk Order (Hotel / Restaurant)</option>
                    <option value="Bespoke Metal Sculpture">Bespoke Metal Fabrication</option>
                    <option value="Overseas Shipping Logistics">Overseas Shipping Logistics</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="block font-mono text-[9px] font-black text-slate-700 uppercase tracking-widest">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what you are looking for (e.g., standard copper carafes, specific thali counts, custom engraving text, etc.)"
                    className="w-full font-sans text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/10 px-3.5 py-2.5 rounded-sm outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  disabled={isSubmitting}
                  className="w-full bg-brand-secondary hover:bg-brand-accent text-white font-sans font-black uppercase tracking-wider text-xs py-3.5 rounded-sm shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Embedded Google Map at the bottom of contact details */}
        <div className="mt-12 sm:mt-16 rounded-sm overflow-hidden border border-slate-200 shadow-md">
          <iframe
            src="https://maps.google.com/maps?q=Patan%20Industrial%20Estate,%20Lalitpur,%20Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[350px] sm:h-[450px] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lalitpur Brass & Copper Workshop Map"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
