// Modèle Article (Prisma)
export interface Article {
  id: string;
  slug: string;
  title: string;
  chapo: string;
  author: string;
  date: Date;
  sections: Array<{ title: string; content: string }>;
  pullQuotes: string[];
  images: string[];
  relatedProducts: string[];
}
