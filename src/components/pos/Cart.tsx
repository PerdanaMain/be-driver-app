import React from 'react';
import CartItem from './CartItem';
import Button from '../ui/Button';
import { CardHeader, CardContent, CardFooter } from '../ui/Card';

interface CartProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}

export default function Cart({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  isCheckingOut = false 
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-blue-50 dark:bg-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{items.length} item(s)</p>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto">
        {items.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Your cart is empty</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-700">
        <div className="w-full space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(tax)}
              </span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="font-medium text-gray-900 dark:text-white">Total</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}
              </span>
            </div>
          </div>
          
          <Button
            variant="success"
            fullWidth
            size="lg"
            onClick={onCheckout}
            disabled={items.length === 0}
            isLoading={isCheckingOut}
          >
            Checkout
          </Button>
        </div>
      </CardFooter>
    </div>
  );
}