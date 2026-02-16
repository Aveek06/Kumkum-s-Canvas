
export type Category = 'Nature';

export interface PrintOption {
  size: string;
  price: number;
}

export interface Artwork {
  id: string;
  title: string;
  price: number;
  printPrices: PrintOption[]; // Array of size-price combinations
  category: Category;
  description: string;
  story: string;
  inspiration: string;
  fitsIn: string;
  decorInspiration: string;
  size: string;
  medium: string;
  imageUrl: string;
  isFeatured?: boolean;
  available: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}
