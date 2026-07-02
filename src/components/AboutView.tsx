import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Truck, Heart, Users, MapPin, ShieldAlert, Award } from 'lucide-react';
import { ContactDetails, StrengthsCard, OwnerMessage } from '../types';
import { CONTACT_DETAILS, WHY_CHOOSE_US, OWNER_DETAILS } from '../data';

// Map icon string names to actual Lucide Icon components
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  CheckCircle2: CheckCircle2,
  Truck: Truck,
  Heart: Heart,
};

interface AboutViewProps {
  contactDetails?: ContactDetails;
  whyChooseUs?: StrengthsCard[];
  ownerDetails?: OwnerMessage;
}

export default function AboutView({ contactDetails, whyChooseUs, ownerDetails }: AboutViewProps) {
  const displayDetails = contactDetails || CONTACT_DETAILS;
  const displayStrengths = whyChooseUs || WHY_CHOOSE_US;
  const displayOwner = ownerDetails || OWNER_DETAILS;

  return (
    <div id="about-page-view" className="bg-brand-light min-h-screen py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
            OUR HERITAGE
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-brand-primary uppercase tracking-tight mt-3 mb-4">
            Preserving Lalitpur's Sacred Metalworking Heritage
          </h2>
          <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">
            For centuries, the craftsmen of Patan, Lalitpur, have hammered raw metals into exquisite objects of utility and devotion. We are proud to carry this flame forward in the modern era.
          </p>
        </div>

        {/* Who We Are & Factory Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-20 sm:mb-24">
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-brand-primary">
              Where Ancient Craft Meets Food-Safe Engineering
            </h3>
            <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
              {displayDetails.aboutText}
            </p>
            <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our workshop is staffed by 14 master metalworkers representing generations of sacred brass-smiths (Shakyas and Tamrakars). Unlike cheap mass-manufactured imports, our vessels are designed with modern thick-gauge, non-reactive alloys that do not pit, leach, or rust, making them ideal for everyday residential kitchens and fine-dining restaurants alike.
            </p>

            {/* Micro Stats inside About */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200">
              <div>
                <span className="block font-sans font-black text-2xl text-brand-secondary">100%</span>
                <span className="block font-mono text-[9px] text-slate-500 uppercase mt-1">Lead-Free</span>
              </div>
              <div>
                <span className="block font-sans font-black text-2xl text-brand-secondary">14+</span>
                <span className="block font-mono text-[9px] text-slate-500 uppercase mt-1">Master Artisans</span>
              </div>
              <div>
                <span className="block font-sans font-black text-2xl text-brand-secondary">10,000+</span>
                <span className="block font-mono text-[9px] text-slate-500 uppercase mt-1">Items Forged</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-sm overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/assets/images/workshop_closeup_1782904397845.jpg"
                alt="Artisan shaping copper vessel"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-4 -left-4 bg-brand-primary text-white p-4 rounded-sm shadow-lg max-w-[220px] border border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-secondary rounded-sm shrink-0">
                  <Award className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h4 className="font-sans font-black text-xs uppercase tracking-wider">Certified Quality</h4>
                  <p className="font-mono text-[10px] text-slate-400 mt-0.5">Heavy Gauge Metal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-[10px] font-black tracking-widest text-brand-secondary uppercase border border-brand-secondary/30 px-3 py-1 rounded-sm bg-brand-secondary/5">
              OUR EDGE
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-brand-primary uppercase tracking-tight mt-2">
              Why Global Collectors and Cooks Choose Us
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayStrengths.map((strength) => {
              const IconComp = ICON_MAP[strength.icon] || CheckCircle2;
              return (
                <div
                  key={strength.id}
                  id={`about-strength-card-${strength.id}`}
                  className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm hover:border-brand-secondary hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans font-black text-sm uppercase tracking-wider text-brand-primary mb-2">
                    {strength.title}
                  </h4>
                  <p className="font-sans text-slate-500 text-xs leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Owner Message Section */}
        <div className="bg-brand-primary rounded-sm overflow-hidden shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Owner Image */}
            <div className="lg:col-span-5 h-80 lg:h-auto min-h-[350px] relative">
              <img
                src={displayOwner.image}
                alt={displayOwner.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-brand-primary" />
            </div>

            {/* Message Details */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center text-white space-y-5">
              <div className="inline-flex items-center space-x-2 text-brand-secondary font-mono text-[10px] font-black tracking-widest uppercase">
                <span>FOUNDER'S MESSAGE</span>
              </div>
              <blockquote className="font-sans text-sm sm:text-base leading-relaxed italic text-slate-300">
                "{displayOwner.quote}"
              </blockquote>
              <div>
                <h4 className="font-sans font-black text-sm uppercase tracking-wider text-white leading-none">
                  {displayOwner.name}
                </h4>
                <p className="font-mono text-[9px] text-brand-secondary uppercase tracking-widest mt-1.5">
                  {displayOwner.title}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
