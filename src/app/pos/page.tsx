'use client';

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/pos/ProductCard';
import Cart from '@/components/pos/Cart';
import Receipt from '@/components/pos/Receipt';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    date: Date;
    receiptNumber: string;
  } | null>(null);
  
  const receiptRef = useRef<HTMLDivElement>(null);
  
  // Filter products based on search term
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
    
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    // Generate receipt number
    const receiptNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    // Simulate checkout process
    setTimeout(() => {
      // Prepare receipt data
      setReceiptData({
        items: [...cartItems],
        subtotal,
        tax,
        total,
        date: new Date(),
        receiptNumber
      });
      
      // Show receipt modal
      setShowReceipt(true);
      
      // Clear cart
      setCartItems([]);
      setIsCheckingOut(false);
    }, 1500);
  };
  
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: 'Dagangin Receipt',
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
    onBeforePrint: () => {
      document.body.classList.add('print-mode');
    },
    onAfterPrint: () => {
      document.body.classList.remove('print-mode');
      setShowReceipt(false);
    },
    removeAfterPrint: false,
    pageStyle: `
      @page {
        size: 80mm 297mm;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .print-mode * {
          visibility: hidden;
        }
        .print-mode .receipt-content {
          visibility: visible;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    `
  });
  
  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceiptData(null);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Dagangin POS" />
      
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Product Grid - Takes 2/3 on desktop, full width on mobile */}
        <div className="w-full md:w-2/3 p-4 overflow-auto">
          <div className="mb-4 space-y-3">            
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                onAddToCart={handleAddToCart}
              />
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
                No products found matching "{searchTerm}"
              </div>
            )}
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
      
      {/* Receipt Modal */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Receipt</h2>
                <button 
                  onClick={handleCloseReceipt}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4" ref={receiptRef}>
              <Receipt
                items={receiptData.items}
                subtotal={receiptData.subtotal}
                tax={receiptData.tax}
                total={receiptData.total}
                date={receiptData.date}
                receiptNumber={receiptData.receiptNumber}
              />
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}