
import { Artwork } from './types';

export const WHATSAPP_NUMBER = "919432260747"; 
export const ARTIST_NAME = "Kumkum";
export const BRAND_NAME = "Kumkum’s Canvas";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/kumkumscanvas",
  facebook: "https://facebook.com/kumkumscanvas",
  email: "knandy2312@gmail.com"
};

/**
 * GUIDE FOR ADDING YOUR OWN IMAGES:
 * 1. Place your image files (.png or .jpg) in the SAME FOLDER as your index.html file.
 * 2. Rename your files to match the 'imageUrl' exactly as written below.
 */
export const ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Far Horizon',
    price: 120000,
    category: 'Nature',
    description: 'A vibrant capture of golden hour warmth.',
    story: 'This piece was painted during a period of transition, capturing the exact moment the world feels at peace. The layers of gold represent the abundance of hope that comes with every new beginning.',
    inspiration: 'The first ray of sunlight hitting the calm ocean waves at dawn, breaking through the cool mist of the night.',
    fitsIn: 'Perfect as a centerpiece in a contemporary living room or a high-ceilinged foyer to welcome guests with warmth.',
    decorInspiration: 'Pairs exquisitely with warm wood finishes like Walnut or Teak. Consider spotlighting with a warm LED to make the gold tones glow in the evening.',
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
    category: 'Nature',
    description: 'Deep teals and sky blues dancing in harmony.',
    story: 'Azure Whispers is a meditation on the movement of water. I used fluid strokes to mimic the gentle pull of the tide, creating a sense of infinite flow and calm.',
    inspiration: 'The rhythmic motion of Mediterranean tides against rocky shores during a quiet summer evening.',
    fitsIn: 'Ideally suited for a master bedroom or a private study where a sense of tranquility and focus is desired.',
    decorInspiration: 'Style against a crisp white or soft sand-colored wall. Surround with organic textures like linen curtains and glass vases to amplify the coastal aesthetic.',
    size: '30" x 30"',
    medium: 'Oil on Canvas',
    imageUrl: './Hidden_Haven.png',
    isFeatured: true,
    available: true
  },
  {
    id: '3',
    title: 'Eternal Bloom',
    price: 150000,
    category: 'Nature',
    description: 'A golden field of wild flora under a setting sun.',
    story: 'This piece captures the resilient beauty of nature. Every petal was painted with a focus on the transient nature of life, celebrated through the warmth of gold leaf.',
    inspiration: 'A hidden meadow discovered during a sunset hike in the foothills of the Himalayas.',
    fitsIn: 'A powerful addition to a meditation room, a yoga studio, or an elegant dining area seeking a touch of luxury and organic spirit.',
    decorInspiration: 'Complements minimalist Japandi or Boho-Luxury interiors. Use a slim black float frame to give it a modern, grounded edge.',
    size: '40" x 40"',
    medium: 'Oil on Canvas',
    imageUrl: './eternal-bloom.webp',
    isFeatured: true,
    available: true
  },
  {
    id: '4',
    title: 'Morning Breeze',
    price: 80000,
    category: 'Nature',
    description: 'Soft pastel gradients reflecting early light.',
    story: 'I wanted to capture the weightlessness of the air before the heat of the day sets in. The colors are deliberately soft to invite the viewer to breathe deeper.',
    inspiration: 'The freshness of a dew-covered garden at 6 AM, when the world is still waking up.',
    fitsIn: 'Best placed in a bright breakfast nook or a sunroom to complement the natural morning light.',
    decorInspiration: 'Works best in rooms with plenty of natural light. Place it opposite a window to allow the colors to shift subtly throughout the day.',
    size: '18" x 24"',
    medium: 'Oil on Canvas',
    imageUrl: './morning-breeze.jpg',
    available: true
  },
  {
    id: '5',
    title: 'Forest Guardian',
    price: 110000,
    category: 'Nature',
    description: 'The ancient soul of the woods represented in emerald and earth tones.',
    story: 'This piece explores the quiet intelligence of the forest. I used deep greens and textured browns to convey the feeling of being protected by old-growth trees.',
    inspiration: 'The silence and filtered light of the Silent Valley during monsoon.',
    fitsIn: 'Commanding presence for an executive office or a library, serving as a reminder of grounded strength and endurance.',
    decorInspiration: 'Best displayed in a room with dark wood paneling or deep charcoal accents. It creates a "cave-like" sanctuary feel that promotes deep thinking.',
    size: '24" x 30"',
    medium: 'Oil on Canvas',
    imageUrl: './forest-guardian.jpg',
    available: false
  },
  {
    id: '6',
    title: 'Oceanic Rhythm',
    price: 135000,
    category: 'Nature',
    description: 'Layered textures mimicking the depth of the sea.',
    story: 'The heavy textures in this painting were achieved by layering sand and gel, creating a surface that begs to be touched and explored under different lighting.',
    inspiration: 'The complex layers of marine life and the powerful sub-surface currents that move the oceans.',
    fitsIn: 'Dramatic impact in a modern apartment hallway or a corporate boardroom to represent depth and movement.',
    decorInspiration: 'Due to the heavy texture, side-lighting is essential. Avoid flat frontal lighting to ensure the depth and "waves" on the canvas are visible.',
    size: '36" x 48"',
    medium: 'Oil on Canvas',
    imageUrl: './oceanic-rhythm.jpg',
    available: true
  }
];
