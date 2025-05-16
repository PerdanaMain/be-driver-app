export interface Inventory {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string;
  inventory: Inventory;
  inventoryId: string;
  created_at: string;
  updated_at: string;
}