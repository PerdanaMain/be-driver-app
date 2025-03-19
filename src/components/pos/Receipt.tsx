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
      <div className="flex items-center justify-center mb-4">
        <img src="/logo.svg" alt="DH" className="w-12 h-12" />
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-1">Dree Payment</h1>
        <p className="text-sm text-gray-600">Sidoarjo • +6281666394</p>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-1">RECEIPT#{receiptNumber}</p>
        <p className="text-sm text-gray-600">
          {date.toLocaleDateString('id-ID')} {date.toLocaleTimeString('id-ID')}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-2">{items.length} items (Qty.: {items.reduce((sum, item) => sum + item.quantity, 0)})</p>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm">{item.quantity}x {item.name}</p>
                <p className="text-xs text-gray-600">{formatCurrency(item.price)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Cash:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="text-center mt-6 text-sm">
        <p className="font-medium mb-1">SIMPAN STRUK INI SEBAGAI</p>
        <p className="font-medium mb-3">BUKTI PEMBAYARAN YANG SAH</p>
        <p>• Terima Kasih •</p>
        <p>Jangan Bosan untuk Kembali</p>
      </div>
    </div>
  );
});

Receipt.displayName = 'Receipt';

export default Receipt;