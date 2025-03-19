import React, { forwardRef } from 'react';

interface ReceiptProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  date: Date;
  receiptNumber: string;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>((
  { items, subtotal, tax, total, date, receiptNumber }, 
  ref
) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR' 
    }).format(amount);
  };

  return (
    <div 
      ref={ref} 
      className="bg-white p-6 max-w-md mx-auto" 
      style={{ fontFamily: 'monospace', fontSize: '12px' }}
    >
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Dagangin Store</h1>
        <p>Jl. Contoh No. 123, Jakarta</p>
        <p>Tel: (021) 123-4567</p>
        <p className="text-sm mt-2">Receipt #{receiptNumber}</p>
        <p className="text-sm">
          {date.toLocaleDateString('id-ID')} {date.toLocaleTimeString('id-ID')}
        </p>
      </div>

      <div className="border-t border-b border-gray-300 py-2 my-2">
        <div className="grid grid-cols-12 font-bold">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">Total</div>
        </div>
      </div>

      <div className="border-b border-gray-300 py-2">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 py-1">
            <div className="col-span-6">{item.name}</div>
            <div className="col-span-2 text-right">{item.quantity}</div>
            <div className="col-span-2 text-right">{formatCurrency(item.price)}</div>
            <div className="col-span-2 text-right">{formatCurrency(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <div className="flex justify-between py-1">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Tax (10%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between py-1 font-bold">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p>Thank you for shopping with us!</p>
        <p className="text-sm">www.dagangin.com</p>
      </div>
    </div>
  );
});

Receipt.displayName = 'Receipt';

export default Receipt;