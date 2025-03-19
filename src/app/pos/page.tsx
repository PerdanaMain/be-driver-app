'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/pos/ProductCard';
import Cart from '@/components/pos/Cart';

// Mock data for products
const mockProducts = [
  { id: '1', name: 'Product 1', price: 50000 },
  { id: '2', name: 'Product 2', price: 75000 },
  { id: '3', name: 'Product 3', price: 100000 },
  { id: '4', name: 'Product 4', price: 125000 },
  { id: '5', name: 'Product 5', price: 150000 },
  { id: '6', name: 'Product 6', price: 175000 },
  { id: '7', name: 'Product 7', price: 200000 },
  { id: '8', name: 'Product 8', price: 225000 },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function POSPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      
      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout successful!');
      setCartItems([]);
      setIsCheckingOut(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Dagangin POS" />
      
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Product Grid - Takes 2/3 on desktop, full width on mobile */}
        <div className="w-full md:w-2/3 p-4 overflow-auto">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
        
        {/* Cart - Takes 1/3 on desktop, full width on mobile */}
        <div className="w-full md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 overflow-auto">
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            isCheckingOut={isCheckingOut}
          />
        </div>
      </main>
    </div>
  );
}