// Modèle Order (Prisma)
export interface Order {
  id: string;
  userId: string;
  products: Array<{ productId: string; variant: string; quantity: number }>;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
