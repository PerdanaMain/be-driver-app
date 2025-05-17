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

export interface Order {
  id: string;
  cartId: string;
  status: string;
  total_amount: number;
  cart: Cart;
  isExpired: boolean;
  expiredAt: string;
  created_at: string;
  updated_at: string;
  products: Product[];
}

export interface Cart {
  id: string;
  name: string;
  email: string;
  phone: string;
  cart_items: CartItem[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  sub_total: number;
  product: Product;
}
