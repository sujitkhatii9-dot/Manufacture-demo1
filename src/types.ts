export type Page = 'home' | 'products' | 'about' | 'gallery' | 'contact';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  priceEstimate: string; // Everyday simple language price e.g., "From Rs. 1,200" or "Custom quoted"
  image: string;
  features: string[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface StrengthsCard {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface OwnerMessage {
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface ContactDetails {
  companyName: string;
  tagline: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  aboutText: string;
  googleMapsUrl: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  heroBackground?: string;
  logo?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  productName: string;
  quantity: string;
  notes: string;
}
