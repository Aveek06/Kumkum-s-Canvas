
import { Artwork } from './types';

export const WHATSAPP_NUMBER = "919432260747"; 
export const ARTIST_NAME = "Kumkum";
export const BRAND_NAME = "Kumkum’s Canvas";
export const ADMIN_PASSWORD = "12345"; // Default admin password

/**
 * LOGO CONFIGURATION
 */
export const LOGO_URL: string = "/Logo.webp"; 

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
    medium: 'Acrylic on Canvas',
    imageUrl: '/Far_Horizon.webp',
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
    medium: 'Acrylic on Canvas',
    imageUrl: '/Hidden_Haven.webp',
    isFeatured: true,
    available: true
  },
  {
    id: '3',
    title: 'Rustic Elegance',
    price: 110000,
    printPrices: [
      { size: '16" x 20"', price: 5500 },
      { size: '24" x 30"', price: 9500 },
      { size: '32" x 40"', price: 14500 }
    ],
    category: 'Nature',
    description: 'Earthy textures and raw organic beauty.',
    story: 'Rustic Elegance explores the intersection of decay and rebirth in the natural world.',
    inspiration: 'The complex patterns found on ancient canyon walls.',
    fitsIn: 'Industrial loft or modern farmhouse entry.',
    decorInspiration: 'Complements exposed brick and raw concrete surfaces beautifully.',
    size: '32" x 40"',
    medium: 'Acrylic on Canvas',
    imageUrl: '/Rustic_Elegance.webp',
    isFeatured: true,
    available: true
  },
  {
    id: '4',
    title: 'Serene Serenity',
    price: 85000,
    printPrices: [
      { size: '12" x 12"', price: 3200 },
      { size: '24" x 24"', price: 7200 },
      { size: '36" x 36"', price: 11200 }
    ],
    category: 'Nature',
    description: 'A minimalist exploration of peace and quiet.',
    story: 'This work was created in total silence, aiming to translate that stillness onto the canvas.',
    inspiration: 'A mist-covered mountain peak at the break of dawn.',
    fitsIn: 'Meditation room or a quiet reading nook.',
    decorInspiration: 'Best displayed in a room with plenty of natural negative space.',
    size: '36" x 36"',
    medium: 'Acrylic on Canvas',
    imageUrl: '/Serene_Serenity.webp',
    isFeatured: false,
    available: true
  }
];

// Database Versioning - v10 for Public folder migration
const STORAGE_KEY = 'kumkum_database_v10';

export const getPersistentArtworks = (): Artwork[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    
    // Auto-seed if first time or version changed
    savePersistentArtworks(INITIAL_ARTWORKS);
  } catch (e) {
    console.error("Critical: Storage retrieval failed", e);
  }
  return INITIAL_ARTWORKS;
};

export const savePersistentArtworks = (artworks: Artwork[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
};

export const ARTWORKS = getPersistentArtworks();
