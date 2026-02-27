// Modèle Product (Prisma)
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  specs: string[];
  categories: string[];
  tags: string[];
  colorPalette: string[];
  variants: Array<{ size: string; color: string; stock: number; price: number }>;
  images: string[];
  crossSell: string[];
}
