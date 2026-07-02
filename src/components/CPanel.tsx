import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Unlock, X, Save, Plus, Trash2, Edit2, Download, Upload, 
  Settings, Globe, Shield, User, Image, MessageSquare, RefreshCw, Hammer, Check, Sparkles
} from 'lucide-react';
import { Product, ProcessStep, StrengthsCard, GalleryItem, OwnerMessage, ContactDetails, Review } from '../types';

interface CPanelProps {
  isOpen: boolean;
  onClose: () => void;
  
  contactDetails: ContactDetails;
  setContactDetails: (val: ContactDetails) => void;
  
  manufacturingSteps: ProcessStep[];
  setManufacturingSteps: (val: ProcessStep[]) => void;
  
  whyChooseUs: StrengthsCard[];
  setWhyChooseUs: (val: StrengthsCard[]) => void;
  
  products: Product[];
  setProducts: (val: Product[]) => void;
  
  galleryItems: GalleryItem[];
  setGalleryItems: (val: GalleryItem[]) => void;
  
  ownerDetails: OwnerMessage;
  setOwnerDetails: (val: OwnerMessage) => void;
  
  reviews: Review[];
  setReviews: (val: Review[]) => void;
  
  onResetToDefault: () => void;
}

type TabType = 'branding' | 'highlights' | 'owner' | 'gallery' | 'reviews' | 'backup';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  id: string;
}

function ImageUploadInput({ label, value, onChange, id }: ImageUploadInputProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or Base64 data"
          className="flex-grow font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
        />
        <div className="relative shrink-0">
          <input
            type="file"
            accept="image/*"
            id={id}
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor={id}
            className="h-full bg-stone-850 hover:bg-stone-800 border border-stone-750 hover:border-brand-secondary text-stone-300 font-sans font-black text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all cursor-pointer flex items-center justify-center space-x-1"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </label>
        </div>
      </div>
      {value && (
        <div className="mt-1 relative w-16 h-16 rounded-sm border border-stone-800 bg-stone-950 overflow-hidden">
          <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      )}
    </div>
  );
}

export default function CPanel({
  isOpen,
  onClose,
  contactDetails,
  setContactDetails,
  manufacturingSteps,
  setManufacturingSteps,
  whyChooseUs,
  setWhyChooseUs,
  products,
  setProducts,
  galleryItems,
  setGalleryItems,
  ownerDetails,
  setOwnerDetails,
  reviews,
  setReviews,
  onResetToDefault
}: CPanelProps) {
  // Authentication State (simulated client-side admin portal)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('lbc_admin_logged_in') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('branding');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // New product form states
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    longDescription: '',
    priceEstimate: '',
    image: '',
    features: []
  });
  const [newProductFeaturesText, setNewProductFeaturesText] = useState('');

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 4000);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.priceEstimate) {
      showError('Please provide at least a product name and estimated price');
      return;
    }
    const nextId = `prod-${Date.now()}`;
    const featuresArray = newProductFeaturesText
      ? newProductFeaturesText.split(',').map(f => f.trim()).filter(Boolean)
      : [];

    setProducts([
      ...products,
      {
        id: nextId,
        name: newProduct.name,
        description: newProduct.description || '',
        longDescription: newProduct.longDescription || '',
        priceEstimate: newProduct.priceEstimate,
        image: newProduct.image || '',
        features: featuresArray
      }
    ]);

    setNewProduct({
      name: '',
      description: '',
      longDescription: '',
      priceEstimate: '',
      image: '',
      features: []
    });
    setNewProductFeaturesText('');
    showSuccess('New highlight product added!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    showSuccess('Highlight product deleted!');
  };

  const handleProductChange = (index: number, field: keyof Product, value: any) => {
    const updated = [...products];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setProducts(updated);
  };

  const handleProductFeaturesChange = (index: number, text: string) => {
    const featuresArray = text.split(',').map(f => f.trim()).filter(Boolean);
    handleProductChange(index, 'features', featuresArray);
  };

  // Handle simulated passcode check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'admin' || passcode === '1234' || passcode === '') {
      setIsAuthenticated(true);
      localStorage.setItem('lbc_admin_logged_in', 'true');
      setAuthError('');
      setPasscode('');
      showSuccess('Console Unlocked Successfully!');
    } else {
      setAuthError('Invalid passcode. Use "admin" or leave blank to quick unlock.');
    }
  };

  // Lock Console action
  const handleLockConsole = () => {
    localStorage.removeItem('lbc_admin_logged_in');
    localStorage.removeItem('lbc_contact_details');
    localStorage.removeItem('lbc_manufacturing_steps');
    localStorage.removeItem('lbc_why_choose_us');
    localStorage.removeItem('lbc_products');
    localStorage.removeItem('lbc_gallery_items');
    localStorage.removeItem('lbc_owner_details');
    localStorage.removeItem('lbc_reviews');
    
    setIsAuthenticated(false);
    onResetToDefault();
    showSuccess('Console locked and all custom states cleared!');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // 1. Branding Form Submit
  const handleBrandingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactDetails({
      ...contactDetails,
      [name]: value
    });
  };

  // 2. Craftsmanship Steps Managers
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [newStep, setNewStep] = useState<Partial<ProcessStep>>({ title: '', description: '', icon: 'Hammer' });

  const handleSaveStep = (step: ProcessStep) => {
    setManufacturingSteps(manufacturingSteps.map(s => s.id === step.id ? step : s));
    showSuccess('Process step saved!');
  };

  const handleDeleteStep = (id: number) => {
    setManufacturingSteps(manufacturingSteps.filter(s => s.id !== id));
    showSuccess('Process step deleted!');
  };

  const handleAddStep = () => {
    if (!newStep.title || !newStep.description) return;
    const nextId = manufacturingSteps.length > 0 ? Math.max(...manufacturingSteps.map(s => s.id)) + 1 : 1;
    setManufacturingSteps([
      ...manufacturingSteps,
      {
        id: nextId,
        title: `${nextId}. ${newStep.title}`,
        description: newStep.description,
        icon: newStep.icon || 'Hammer'
      }
    ]);
    setNewStep({ title: '', description: '', icon: 'Hammer' });
    showSuccess('New process step added!');
  };

  // Strengths Card edits
  const [editingStrengthId, setEditingStrengthId] = useState<string | null>(null);
  const [newStrength, setNewStrength] = useState<Partial<StrengthsCard>>({ title: '', description: '', icon: 'CheckCircle2' });

  const handleSaveStrength = (strength: StrengthsCard) => {
    setWhyChooseUs(whyChooseUs.map(s => s.id === strength.id ? strength : s));
    showSuccess('Value proposition saved!');
  };

  const handleDeleteStrength = (id: string) => {
    setWhyChooseUs(whyChooseUs.filter(s => s.id !== id));
    showSuccess('Value proposition deleted!');
  };

  const handleAddStrength = () => {
    if (!newStrength.title || !newStrength.description) return;
    const nextId = `strength-${Date.now()}`;
    setWhyChooseUs([
      ...whyChooseUs,
      {
        id: nextId,
        title: newStrength.title,
        description: newStrength.description,
        icon: newStrength.icon || 'CheckCircle2'
      }
    ]);
    setNewStrength({ title: '', description: '', icon: 'CheckCircle2' });
    showSuccess('New value proposition added!');
  };

  // 3. Owner Message Edits
  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOwnerDetails({
      ...ownerDetails,
      [name]: value
    });
  };

  // 4. Gallery Manager
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({ title: '', description: '', image: '' });

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
    showSuccess('Gallery item deleted!');
  };

  const handleAddGalleryItem = () => {
    if (!newGalleryItem.title || !newGalleryItem.image) {
      showError('Please provide at least a title and a valid image URL');
      return;
    }
    const nextId = `gal-${Date.now()}`;
    setGalleryItems([
      ...galleryItems,
      {
        id: nextId,
        title: newGalleryItem.title,
        description: newGalleryItem.description || '',
        image: newGalleryItem.image
      }
    ]);
    setNewGalleryItem({ title: '', description: '', image: '' });
    showSuccess('Gallery item added!');
  };

  // 5. Reviews Manager
  const [newReview, setNewReview] = useState<Partial<Review>>({ author: '', location: '', comment: '', rating: 5 });

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(rev => rev.id !== id));
    showSuccess('Review deleted!');
  };

  const handleAddReview = () => {
    if (!newReview.author || !newReview.comment) {
      showError('Please provide both the client name and review message');
      return;
    }
    const nextId = `rev-${Date.now()}`;
    setReviews([
      ...reviews,
      {
        id: nextId,
        author: newReview.author,
        location: newReview.location || 'Nepal',
        comment: newReview.comment,
        rating: Number(newReview.rating || 5),
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewReview({ author: '', location: '', comment: '', rating: 5 });
    showSuccess('New review added!');
  };

  // 6. JSON Config Export / Import
  const handleExportConfig = () => {
    const configData = {
      contactDetails,
      manufacturingSteps,
      whyChooseUs,
      products,
      galleryItems,
      ownerDetails,
      reviews
    };
    
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lalitpur_copper_config_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showSuccess('Configuration JSON exported!');
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.contactDetails) setContactDetails(parsed.contactDetails);
        if (parsed.manufacturingSteps) setManufacturingSteps(parsed.manufacturingSteps);
        if (parsed.whyChooseUs) setWhyChooseUs(parsed.whyChooseUs);
        if (parsed.products) setProducts(parsed.products);
        if (parsed.galleryItems) setGalleryItems(parsed.galleryItems);
        if (parsed.ownerDetails) setOwnerDetails(parsed.ownerDetails);
        if (parsed.reviews) setReviews(parsed.reviews);
        
        showSuccess('Configuration successfully imported and applied!');
      } catch (err) {
        showError('Error parsing config JSON. Make sure it is a valid backup file.');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div id="cpanel-overlay-wrapper" className="fixed inset-0 z-[100] flex justify-end bg-stone-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="w-full max-w-2xl bg-stone-900 border-l border-stone-800 text-stone-100 h-full flex flex-col justify-between shadow-2xl relative"
      >
        {/* Success & Error Alert Banners */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 z-50 bg-emerald-500 text-stone-950 px-4 py-3 rounded-sm shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-2 text-xs font-black tracking-wider uppercase font-mono">
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>{successMessage}</span>
              </div>
            </motion.div>
          )}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 z-50 bg-rose-600 text-white px-4 py-3 rounded-sm shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-2 text-xs font-black tracking-wider uppercase font-mono">
                <X className="w-4 h-4 stroke-[3px]" />
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-brand-secondary text-white rounded-sm">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-sans font-black text-sm uppercase tracking-wider text-white">
                Administrative Control Panel
              </h2>
              <p className="font-mono text-[9px] text-brand-secondary uppercase tracking-widest mt-0.5">
                cPanel • Live Site Editor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Screen or Admin Panel Content */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col justify-center items-center px-8 text-center bg-stone-900">
            <div className="w-16 h-16 rounded-full bg-stone-950 border border-brand-secondary/30 flex items-center justify-center text-brand-secondary mb-6 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-white mb-2">
              Sign In to Workshop Console
            </h3>
            <p className="font-sans text-stone-400 text-xs max-w-md leading-relaxed mb-8">
              Please enter the workshop administrator passcode. Default passcode is <code className="bg-stone-950 text-brand-secondary px-1.5 py-0.5 rounded-sm font-mono font-bold">admin</code> or leave empty to unlock.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter passcode (e.g. admin)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full font-mono text-center text-sm tracking-widest border border-stone-800 bg-stone-950 text-white focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary px-4 py-3 rounded-sm outline-none transition-all"
                />
              </div>

              {authError && (
                <p className="text-rose-400 text-[10px] font-mono tracking-wider uppercase font-black">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-brand-secondary hover:bg-brand-accent text-white font-sans font-black uppercase tracking-wider text-xs py-3 rounded-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Console</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Top Toolbar Tabs */}
            <div className="flex border-b border-stone-800 bg-stone-950/50 overflow-x-auto scrollbar-none shrink-0">
              {(Object.keys({
                branding: 'Branding & Logo',
                highlights: 'Curated Highlights',
                owner: 'Owner Msg',
                gallery: 'Gallery',
                reviews: 'Reviews',
                backup: 'Backup & Sync'
              }) as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4.5 py-3.5 font-sans font-black text-[10px] uppercase tracking-wider whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'border-brand-secondary text-brand-secondary bg-stone-900'
                      : 'border-transparent text-stone-400 hover:text-white hover:bg-stone-900/40'
                  }`}
                >
                  {tab === 'branding' && <Globe className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                  {tab === 'highlights' && <Sparkles className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                  {tab === 'owner' && <User className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                  {tab === 'gallery' && <Image className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                  {tab === 'reviews' && <MessageSquare className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                  {tab === 'backup' && <Shield className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                  <span>{tab === 'highlights' ? 'Highlights' : tab.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-stone-900/30">
              
              {/* TAB 1: BRANDING & LOGO */}
              {activeTab === 'branding' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-3 flex items-center">
                      <span className="w-1.5 h-3 bg-brand-secondary rounded-sm mr-2 inline-block"></span>
                      Workshop Identity
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Company Name</label>
                        <input
                          type="text"
                          name="companyName"
                          value={contactDetails.companyName}
                          onChange={handleBrandingChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Slogan & Tagline</label>
                        <input
                          type="text"
                          name="tagline"
                          value={contactDetails.tagline}
                          onChange={handleBrandingChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>
                      
                      <ImageUploadInput
                        label="Workshop Custom Logo"
                        value={contactDetails.logo || ''}
                        onChange={(val) => setContactDetails({ ...contactDetails, logo: val })}
                        id="branding-logo-uploader"
                      />

                      <ImageUploadInput
                        label="Homepage Hero Background Image"
                        value={contactDetails.heroBackground || ''}
                        onChange={(val) => setContactDetails({ ...contactDetails, heroBackground: val })}
                        id="branding-hero-uploader"
                      />
                    </div>
                  </div>

                  <hr className="border-stone-800" />

                  <div>
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-3 flex items-center">
                      <span className="w-1.5 h-3 bg-brand-secondary rounded-sm mr-2 inline-block"></span>
                      Social Media Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Facebook URL</label>
                        <input
                          type="text"
                          name="facebook"
                          placeholder="https://facebook.com/..."
                          value={contactDetails.facebook || ''}
                          onChange={handleBrandingChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Instagram URL</label>
                        <input
                          type="text"
                          name="instagram"
                          placeholder="https://instagram.com/..."
                          value={contactDetails.instagram || ''}
                          onChange={handleBrandingChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Twitter / X URL</label>
                        <input
                          type="text"
                          name="twitter"
                          placeholder="https://twitter.com/..."
                          value={contactDetails.twitter || ''}
                          onChange={handleBrandingChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CURATED HIGHLIGHTS (PRODUCTS MANAGER) */}
              {activeTab === 'highlights' && (
                <div className="space-y-8">
                  
                  {/* Part A: Add New Product */}
                  <div className="bg-stone-950/40 p-5 rounded-sm border border-stone-800 space-y-4">
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white flex items-center">
                      <Sparkles className="w-4 h-4 text-brand-secondary mr-2" />
                      Add New Curated Highlight Product
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Product Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Traditional Hand-Hammered Urn"
                          value={newProduct.name || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Price Estimate *</label>
                        <input
                          type="text"
                          placeholder="e.g. From Rs. 4,500 or Custom Quote"
                          value={newProduct.priceEstimate || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, priceEstimate: e.target.value })}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Short Description</label>
                        <input
                          type="text"
                          placeholder="Brief 1-2 sentence description for the product card..."
                          value={newProduct.description || ''}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Bullet Features (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. 99.9% Pure Copper, Double Wall Insulation, Anti-Tarnish Coating"
                          value={newProductFeaturesText}
                          onChange={(e) => setNewProductFeaturesText(e.target.value)}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <ImageUploadInput
                          label="Product Photo"
                          value={newProduct.image || ''}
                          onChange={(val) => setNewProduct({ ...newProduct, image: val })}
                          id="new-product-image-uploader"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleAddProduct}
                        className="bg-brand-secondary hover:bg-brand-accent text-stone-950 font-sans font-black text-xs uppercase tracking-wider px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Product to Showcase</span>
                      </button>
                    </div>
                  </div>

                  <hr className="border-stone-800" />

                  {/* Part B: Manage Existing Products */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white flex items-center">
                        <span className="w-1.5 h-3 bg-brand-secondary rounded-sm mr-2 inline-block"></span>
                        Showcased Highlight Products
                      </h3>
                      <span className="font-mono text-[9px] text-stone-500 uppercase">({products.length} Products)</span>
                    </div>

                    <div className="space-y-6">
                      {products.map((product, index) => (
                        <div key={product.id} className="p-5 bg-stone-950/60 rounded-sm border border-stone-800/80 space-y-4">
                          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                            <span className="font-mono text-[10px] font-black text-brand-secondary uppercase">Product #{index + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-stone-500 hover:text-rose-400 font-sans font-black text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-sm bg-stone-950 border border-stone-800 hover:border-rose-400/30 transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-mono text-[8px] text-stone-400 mb-1">Product Name</label>
                              <input
                                type="text"
                                value={product.name}
                                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none"
                              />
                            </div>

                            <div>
                              <label className="block font-mono text-[8px] text-stone-400 mb-1">Price Estimate</label>
                              <input
                                type="text"
                                value={product.priceEstimate}
                                onChange={(e) => handleProductChange(index, 'priceEstimate', e.target.value)}
                                className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block font-mono text-[8px] text-stone-400 mb-1">Short Description</label>
                              <textarea
                                rows={2}
                                value={product.description}
                                onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                                className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none resize-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block font-mono text-[8px] text-stone-400 mb-1">Bullet Features (comma-separated)</label>
                              <input
                                type="text"
                                value={product.features.join(', ')}
                                onChange={(e) => handleProductFeaturesChange(index, e.target.value)}
                                className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <ImageUploadInput
                                label="Product Photo"
                                value={product.image}
                                onChange={(val) => handleProductChange(index, 'image', val)}
                                id={`prod-image-uploader-${product.id}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: OWNER SECTION */}
              {activeTab === 'owner' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-3 flex items-center">
                      <span className="w-1.5 h-3 bg-brand-secondary rounded-sm mr-2 inline-block"></span>
                      Founder & Master Coppersmith Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 bg-stone-950/40 p-5 rounded-sm border border-stone-800">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Founder Name</label>
                        <input
                          type="text"
                          name="name"
                          value={ownerDetails.name}
                          onChange={handleOwnerChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Professional Title</label>
                        <input
                          type="text"
                          name="title"
                          value={ownerDetails.title}
                          onChange={handleOwnerChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all"
                        />
                      </div>
                      <ImageUploadInput
                        label="Owner Portrait Photo"
                        value={ownerDetails.image}
                        onChange={(val) => setOwnerDetails({ ...ownerDetails, image: val })}
                        id="owner-portrait-uploader"
                      />
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 mb-1.5">Signature Quote</label>
                        <textarea
                          rows={4}
                          name="quote"
                          value={ownerDetails.quote}
                          onChange={handleOwnerChange}
                          className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3.5 py-2.5 rounded-sm focus:border-brand-secondary outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY SECTION */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white flex items-center">
                      <span className="w-1.5 h-3 bg-brand-secondary rounded-sm mr-2 inline-block"></span>
                      Gallery Portfolio Items
                    </h3>
                    <span className="font-mono text-[9px] text-stone-500 uppercase">({galleryItems.length} Images)</span>
                  </div>

                  <div className="space-y-4">
                    {/* Add new item */}
                    <div className="p-4 bg-brand-secondary/5 rounded-sm border border-brand-secondary/20 space-y-3">
                      <span className="font-sans font-black text-[10px] text-brand-secondary uppercase tracking-wider block">Add New Portfolio Image</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-stone-400 mb-1">Image Title *</label>
                          <input
                            type="text"
                            placeholder="e.g. Copper Water Urn"
                            value={newGalleryItem.title}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                            className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <ImageUploadInput
                            label="Gallery Image *"
                            value={newGalleryItem.image}
                            onChange={(val) => setNewGalleryItem({ ...newGalleryItem, image: val })}
                            id="gallery-image-uploader"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block font-mono text-[8px] text-stone-400 mb-1">Caption / Short Description</label>
                          <textarea
                            rows={1}
                            placeholder="Give a short story or technical spec..."
                            value={newGalleryItem.description}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                            className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none resize-none"
                          />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={handleAddGalleryItem}
                            className="bg-brand-secondary hover:bg-brand-accent text-stone-950 px-4 py-2 rounded-sm font-sans font-black text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add to Gallery
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Gallery Items List */}
                    <div className="grid grid-cols-1 gap-4">
                      {galleryItems.map((item) => (
                        <div key={item.id} className="p-4 bg-stone-950/60 rounded-sm border border-stone-800 flex items-start gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-sm border border-stone-800 shrink-0 bg-stone-900"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-sans font-black text-xs text-white uppercase">{item.title}</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteGalleryItem(item.id)}
                                className="text-stone-500 hover:text-rose-400 p-1 rounded-sm transition-colors cursor-pointer"
                                title="Delete Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="font-sans text-stone-400 text-xs leading-normal">
                              {item.description || 'No description provided.'}
                            </p>
                            <div className="font-mono text-[8px] text-stone-500 break-all select-all">
                              URL: {item.image}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS SECTION */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white flex items-center">
                      <span className="w-1.5 h-3 bg-brand-secondary rounded-sm mr-2 inline-block"></span>
                      Client Reviews & Testimonials
                    </h3>
                    <span className="font-mono text-[9px] text-stone-500 uppercase">({reviews.length} Reviews)</span>
                  </div>

                  <div className="space-y-4">
                    {/* Add new review */}
                    <div className="p-4 bg-brand-secondary/5 rounded-sm border border-brand-secondary/20 space-y-3">
                      <span className="font-sans font-black text-[10px] text-brand-secondary uppercase tracking-wider block">Add Customer Review</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-stone-400 mb-1">Author Name *</label>
                          <input
                            type="text"
                            placeholder="e.g. Manoj Tamrakar"
                            value={newReview.author}
                            onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                            className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-stone-400 mb-1">Location *</label>
                          <input
                            type="text"
                            placeholder="e.g. Lalitpur, Nepal"
                            value={newReview.location}
                            onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                            className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-stone-400 mb-1">Rating (Stars)</label>
                          <select
                            value={newReview.rating}
                            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            className="w-full font-mono text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none"
                          >
                            <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                            <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                            <option value="3">⭐⭐⭐ (3 Stars)</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block font-mono text-[8px] text-stone-400 mb-1">Comment / Feedback Message *</label>
                          <textarea
                            rows={2}
                            placeholder="Type client's review here..."
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            className="w-full font-sans text-xs border border-stone-800 bg-stone-950 text-stone-200 px-3 py-2 rounded-sm focus:border-brand-secondary outline-none resize-none"
                          />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={handleAddReview}
                            className="bg-brand-secondary hover:bg-brand-accent text-stone-950 px-4 py-2 rounded-sm font-sans font-black text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Review list */}
                    <div className="space-y-3">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-4 bg-stone-950/60 rounded-sm border border-stone-800">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="block font-sans font-black text-xs text-white uppercase">{rev.author}</span>
                              <span className="block font-mono text-[8px] text-slate-500 uppercase">{rev.location} • {rev.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-xs text-brand-secondary">{"★".repeat(rev.rating)}</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id)}
                                className="text-stone-500 hover:text-rose-400 p-1 rounded-sm transition-colors cursor-pointer"
                                title="Delete Review"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="font-sans text-stone-400 text-xs leading-relaxed italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: BACKUP & SYSTEM (DOWNLOAD/UPLOAD JSON CONFIG & REVERT) */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-3 flex items-center">
                      <span className="w-1.5 h-3 bg-brand-secondary rounded-sm mr-2 inline-block"></span>
                      JSON Backup (Import & Export Config)
                    </h3>
                    
                    <div className="bg-stone-950/40 p-5 rounded-sm border border-stone-800 space-y-6">
                      <p className="font-sans text-stone-400 text-xs leading-relaxed">
                        Export your current dynamically edited content into a local file, or restore/import a previous configuration file to apply updates across all sections.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Download Block */}
                        <div className="p-4 bg-stone-950 rounded-sm border border-stone-800 flex flex-col justify-between space-y-4">
                          <div>
                            <span className="block font-sans font-black text-xs text-white uppercase mb-1">Export State</span>
                            <span className="block font-sans text-stone-500 text-[10px] leading-normal">
                              Save logo, home bg, craftsmanship steps, gallery section, reviews, and maps config to JSON.
                            </span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={handleExportConfig}
                            className="bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white font-sans font-black uppercase tracking-wider text-[10px] py-2.5 px-4 rounded-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download config.json</span>
                          </button>
                        </div>

                        {/* Upload Block */}
                        <div className="p-4 bg-stone-950 rounded-sm border border-stone-800 flex flex-col justify-between space-y-4">
                          <div>
                            <span className="block font-sans font-black text-xs text-white uppercase mb-1">Import State</span>
                            <span className="block font-sans text-stone-500 text-[10px] leading-normal">
                              Upload a previously exported config JSON file to instantly overwrite all dynamic data blocks.
                            </span>
                          </div>

                          <div className="relative">
                            <input
                              type="file"
                              accept=".json"
                              onChange={handleImportConfig}
                              className="hidden"
                              id="config-json-upload-input"
                            />
                            <label
                              htmlFor="config-json-upload-input"
                              className="bg-brand-secondary hover:bg-brand-accent text-stone-950 font-sans font-black uppercase tracking-wider text-[10px] py-2.5 px-4 rounded-sm transition-colors cursor-pointer flex items-center justify-center space-x-2"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Upload config.json</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-stone-800" />

                  {/* System Commands */}
                  <div>
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-white mb-3 flex items-center">
                      <span className="w-1.5 h-3 bg-rose-500 rounded-sm mr-2 inline-block"></span>
                      Factory Danger Zone
                    </h3>
                    <div className="p-4 bg-stone-950/60 rounded-sm border border-rose-950/30 space-y-4">
                      <p className="font-sans text-stone-400 text-xs leading-relaxed">
                        Revert all custom data back to default template configurations stored in the file system, or lock the console.
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {!showResetConfirm ? (
                          <button
                            type="button"
                            onClick={() => setShowResetConfirm(true)}
                            className="bg-stone-900 hover:bg-stone-850 text-stone-300 font-sans font-black uppercase tracking-wider text-[10px] py-2.5 px-4 rounded-sm border border-stone-800 transition-all cursor-pointer"
                          >
                            Restore Factory Defaults
                          </button>
                        ) : (
                          <div className="flex items-center space-x-2 bg-stone-900 p-2 rounded-sm border border-rose-950/40">
                            <span className="font-mono text-[9px] text-rose-400 uppercase font-black mr-2">Are you sure?</span>
                            <button
                              type="button"
                              onClick={() => {
                                onResetToDefault();
                                setShowResetConfirm(false);
                                showSuccess('Restored to default settings!');
                              }}
                              className="bg-rose-900 hover:bg-rose-800 text-white font-sans font-black uppercase tracking-wider text-[9px] py-1.5 px-3 rounded-sm transition-all cursor-pointer"
                            >
                              Yes, Reset
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowResetConfirm(false)}
                              className="bg-stone-800 hover:bg-stone-750 text-stone-400 font-sans font-black uppercase tracking-wider text-[9px] py-1.5 px-3 rounded-sm transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        
                        <button
                          type="button"
                          onClick={handleLockConsole}
                          className="bg-rose-900/20 hover:bg-rose-900 text-rose-200 border border-rose-900/30 hover:border-rose-700 font-sans font-black uppercase tracking-wider text-[10px] py-2.5 px-4 rounded-sm transition-all cursor-pointer flex items-center space-x-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Lock Console</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Lock Console footer inside panel */}
        {isAuthenticated && (
          <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-between items-center shrink-0">
            <span className="font-mono text-[8px] text-emerald-400 uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-ping"></span>
              Secure Session Active
            </span>
            <button
              onClick={handleLockConsole}
              id="lock-console-btn-inside-panel"
              className="bg-rose-950 hover:bg-rose-900 text-rose-200 font-mono text-[9px] uppercase tracking-wider py-1.5 px-3 rounded-sm border border-rose-900/30 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Lock className="w-3 h-3" />
              <span>Lock Console</span>
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
