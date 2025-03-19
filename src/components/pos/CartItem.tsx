import React from 'react';
import Button from '../ui/Button';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ id, name, price, quantity, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleIncrement = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      onRemove(id);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)} x {quantity}
        </p>
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleDecrement}
          >
            -
          </button>
          <span className="px-2 py-1 text-center w-8">{quantity}</span>
          <button
            className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        
        <Button
          variant="danger"
          size="sm"
          onClick={handleRemove}
          aria-label="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </div>
  );
}