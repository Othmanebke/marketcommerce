// Modèle User (Prisma)
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  addresses: string[];
  wishlist: string[];
  orders: string[];
  notifications: { email: boolean; sms: boolean };
}
