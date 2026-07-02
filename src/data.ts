import { Product, ProcessStep, StrengthsCard, GalleryItem, OwnerMessage, ContactDetails, Review } from './types';

export const CONTACT_DETAILS: ContactDetails = {
  companyName: "Lalitpur Brass & Copper",
  tagline: "Premium hand-hammered copperware and brassware crafted in Lalitpur, Nepal. We make durable, non-toxic kitchenware, vessels, and custom art pieces.",
  location: "Lalitpur, Nepal",
  address: "Industrial District Ward 4, Patan, Lalitpur 44700, Nepal",
  phone: "+977 1-5521234",
  email: "namaste@lalitpurcopper.com",
  aboutText: "Premium hand-hammered copperware and brassware crafted in Lalitpur, Nepal. We make durable, non-toxic kitchenware, vessels, and custom art pieces.",
  googleMapsUrl: "https://maps.google.com/?q=Patan+Industrial+Estate,Lalitpur,Nepal",
  facebook: "https://facebook.com/lalitpurcopper",
  instagram: "https://instagram.com/lalitpurcopper",
  twitter: "https://twitter.com/lalitpurcopper",
  heroBackground: "/assets/images/lalitpur_copper_hero_bright_1782974326173.jpg",
  logo: ""
};

export const MANUFACTURING_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "1. Raw Material Selection",
    description: "We source 99.9% pure, lead-free copper and brass sheets tested for high-grade food safety.",
    icon: "Layers"
  },
  {
    id: 2,
    title: "2. Precision Hammering",
    description: "Master artisans heat and hand-hammer each piece hundreds of times to achieve incredible strength and signature textures.",
    icon: "Hammer"
  },
  {
    id: 3,
    title: "3. Rigorous Quality Check",
    description: "Every item undergoes non-toxic polishing, leakage tests, and structural alignment checks before leaving our workshop.",
    icon: "ShieldCheck"
  }
];

export const WHY_CHOOSE_US: StrengthsCard[] = [
  {
    id: "strength-1",
    title: "Quality Assured",
    description: "Built for daily use, our thick-gauge products are naturally anti-microbial, corrosion-resistant, and strictly lead-free.",
    icon: "CheckCircle2"
  },
  {
    id: "strength-2",
    title: "Fast Delivery",
    description: "With an organized workshop right in Patan Industrial District, we dispatch bulk orders across Nepal and globally with speed.",
    icon: "Truck"
  },
  {
    id: "strength-3",
    title: "Made in Nepal",
    description: "100% authentic Himalayan craft that supports local Newari copper-smithing families and sustains ancient metalcraft heritage.",
    icon: "Heart"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-copper-carafe",
    name: "Classic Hammered Copper Carafe Set",
    description: "Stunning hand-beaten pure copper water pitcher with a matching glass tumbler. Perfect for daily healthy hydration.",
    longDescription: "Our signature copper pitcher is crafted from heavy-gauge pure copper, hand-beaten by veteran artisans in Lalitpur. Storing water overnight in copper vessels (known as Tamra Jal in Ayurveda) helps naturally purify water, boost digestion, and support immune health.",
    priceEstimate: "Rs. 3,850 / set",
    image: "/assets/images/copper_carafe_1782904346674.jpg",
    features: ["99.9% Pure Certified Copper", "Handcrafted in Patan", "Leakproof jointless design", "Natural health benefits"]
  },
  {
    id: "prod-brass-thali",
    name: "Royal Patan Brass Dinner Thali Set",
    description: "Traditional 5-piece bronze brassware plate set designed to elevate Nepali dining with absolute elegance.",
    longDescription: "Experience authentic Nepalese heritage with this premium, weighty brass thali set. Features a wide presentation plate, double-walled curry bowls, a pickle dish, and a traditional brass drinking glass. Polished to a high, glowing gold standard.",
    priceEstimate: "Rs. 6,200 / set",
    image: "/assets/images/brass_thali_1782904357230.jpg",
    features: ["Heavy thick-gauge Kansya brass", "Perfect heat-retention properties", "Traditional Newari hand-polish", "Includes plate, bowls & glass"]
  },
  {
    id: "prod-singing-bowl",
    name: "Artisanal Healing Singing Bowl",
    description: "A beautifully hand-tuned bell-metal singing bowl decorated with sacred hand-carved Nepalese symbols.",
    longDescription: "Forged in our workshop from an optimum 7-metal alloy, this meditation bowl produces deep, resonant, and long-lasting therapeutic tones. Individually hand-hammered and acoustic-tested by Lalitpur sound masters. Includes a genuine wooden mallet and felt ring cushion.",
    priceEstimate: "Rs. 4,500 each",
    image: "/assets/images/singing_bowl_1782904367715.jpg",
    features: ["Hand-carved Newari relief patterns", "Vibrated to exact sound frequencies", "Made from high-resonance bell brass", "Comes with premium leather mallet"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Our Craftsmen Workshop",
    description: "Where raw metal is forged into everyday culinary art inside Patan Industrial Estate.",
    image: "/assets/images/workshop_hero_1782904334846.jpg"
  },
  {
    id: "gal-2",
    title: "Precision Shaping",
    description: "Every copper curve takes thousands of accurate hammer blows to withstand generations of use.",
    image: "/assets/images/workshop_closeup_1782904397845.jpg"
  },
  {
    id: "gal-3",
    title: "Pure Copper Water Carafe",
    description: "The exquisite textured finish reflects local artisan craftsmanship in its purest form.",
    image: "/assets/images/copper_carafe_1782904346674.jpg"
  },
  {
    id: "gal-4",
    title: "Shining Brassware Set",
    description: "Traditional tableware, carefully hand-polished using organic ash to maintain a beautiful golden gleam.",
    image: "/assets/images/brass_thali_1782904357230.jpg"
  },
  {
    id: "gal-5",
    title: "Tibetan Bell Singing Bowl",
    description: "Rich harmonic tones, individually calibrated for spiritual mindfulness and wellness practitioners.",
    image: "/assets/images/singing_bowl_1782904367715.jpg"
  }
];

export const OWNER_DETAILS: OwnerMessage = {
  name: "Master Coppersmith Gyanendra Shakya",
  title: "Founder & Master Artisan",
  quote: "Lalitpur is the world's heart of metalwork. Every vessel we forge contains our sweat, our heritage, and a promise of lifetime durability. We do not mass-produce; we sculpt utensils that tell a story on your dining table.",
  image: "/assets/images/owner_portrait_1782904379653.jpg"
};

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Ramesh Rajbhandari",
    location: "Kathmandu, Nepal",
    rating: 5,
    comment: "Absolutely top-tier craftsmanship. The hammered copper carafe keeps water refreshing and cool, and you can feel the heavy-gauge metal quality immediately.",
    date: "2026-06-15"
  },
  {
    id: "rev-2",
    author: "Sarah Jenkins",
    location: "London, UK",
    rating: 5,
    comment: "The brass dinner set is the centerpiece of our dining table now. Beautifully hand-polished. Service was incredibly fast and professional.",
    date: "2026-05-28"
  },
  {
    id: "rev-3",
    author: "Pooja Shakya",
    location: "Lalitpur, Nepal",
    rating: 5,
    comment: "Authentic, heavy, and resonant singing bowl. Lalitpur Brass & Copper preserves the real ancient metalworking art. Highly recommend supporting them!",
    date: "2026-06-02"
  }
];

