
import { Artwork } from './types';

export const WHATSAPP_NUMBER = "919432260747"; 
export const ARTIST_NAME = "Kumkum";
export const BRAND_NAME = "Kumkum’s Canvas";
export const ADMIN_PASSWORD = "12345"; // Default admin password

/**
 * LOGO CONFIGURATION:
 * 1. BROWSER LOCAL STORAGE: localStorage.setItem('kumkum_custom_logo', 'url')
 * 2. PROJECT DIRECTORY: Set LOGO_URL to "./Logo.png"
 */
export const LOGO_URL: string = "/Logo.png"; 

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/kumkumscanvas",
  facebook: "https://facebook.com/KumkumCanvas",
  email: "knandy2312@gmail.com"
};

// Initial data seed
export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Far Horizon',
    price: 120000,
    printPrices: [
      { size: '12" x 16"', price: 4500 },
      { size: '18" x 24"', price: 8500 },
      { size: '24" x 36"', price: 12500 }
    ],
    category: 'Nature',
    description: 'A vibrant capture of golden hour warmth.',
    story: 'This piece was painted during a period of transition, capturing the exact moment the world feels at peace.',
    inspiration: 'The first ray of sunlight hitting the calm ocean waves at dawn.',
    fitsIn: 'Contemporary living room centerpiece.',
    decorInspiration: 'Pairs exquisitely with warm wood finishes like Walnut or Teak.',
    size: '24" x 36"',
    medium: 'Oil on Canvas',
    imageUrl: './Far_Horizon.png',
    isFeatured: true,
    available: true
  },
  {
    id: '2',
    title: 'Hidden Haven',
    price: 95000,
    printPrices: [
      { size: '12" x 12"', price: 3500 },
      { size: '20" x 20"', price: 6500 },
      { size: '30" x 30"', price: 9500 }
    ],
    category: 'Nature',
    description: 'Deep teals and sky blues dancing in harmony.',
    story: 'Azure Whispers is a meditation on the movement of water.',
    inspiration: 'The rhythmic motion of Mediterranean tides.',
    fitsIn: 'Ideally suited for a master bedroom or a private study.',
    decorInspiration: 'Style against a crisp white or soft sand-colored wall.',
    size: '30" x 30"',
    medium: 'Oil on Canvas',
    imageUrl: './Hidden_Haven.png',
    isFeatured: true,
    available: true
  }
];

// Helper to handle persistent data
export const getPersistentArtworks = (): Artwork[] => {
  try {
    const saved = localStorage.getItem('kumkum_artworks');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to load artworks from storage", e);
  }
  return INITIAL_ARTWORKS;
};

export const savePersistentArtworks = (artworks: Artwork[]) => {
  localStorage.setItem('kumkum_artworks', JSON.stringify(artworks));
};

// Exporting dynamic artworks for the rest of the app to consume
export const ARTWORKS = getPersistentArtworks();
