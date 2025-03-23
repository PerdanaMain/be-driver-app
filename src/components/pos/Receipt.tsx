import React, { forwardRef } from "react";
import Image from "next/image";

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
  customerForm: {
    name: string;
    phone: string;
    email: string;
  };
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ items, subtotal, tax, total, date, receiptNumber, customerForm }, ref) => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    };

    return (
      <div
        ref={ref}
        className="bg-white p-6 max-w-md mx-auto print:max-w-full receipt-content print-style"
        style={{
          fontFamily: "monospace",
          fontSize: "13px",
        }}
      >
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/logo.svg"
            alt="DH"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-1 text-gray-800">
            Dagangin Hardware
          </h1>
          <p className="text-sm text-gray-500">Jl. Taman, Sidoarjo</p>
        </div>

        <div className="mb-4 border-b border-gray-200 pb-3">
          <p className="text-sm mb-1 text-gray-500">RECEIPT#{receiptNumber}</p>
          <p className="text-sm text-gray-500">
            {date.toLocaleDateString("id-ID")}{" "}
            {date.toLocaleTimeString("id-ID")}
          </p>
        </div>

        <div className="mb-4 border-b border-gray-200 pb-3">
          <p className="text-sm mb-1 text-gray-500">Customer Details:</p>
          <p className="text-sm text-gray-500">Name: {customerForm.name}</p>
          <p className="text-sm text-gray-500">Phone: {customerForm.phone}</p>
          <p className="text-sm text-gray-500">Email: {customerForm.email}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm mb-3 text-gray-600 border-b border-gray-200 pb-2">
            {items.length} items (Total Qty:{" "}
            {items.reduce((sum, item) => sum + item.quantity, 0)})
          </p>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">
                    {item.quantity}x {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{formatCurrency(item.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-800">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (10%):</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200 text-gray-800">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="text-center mt-8 text-sm border-t border-gray-200 pt-6">
          <p className="font-medium mb-1 text-gray-700">
            SIMPAN STRUK INI SEBAGAI
          </p>
          <p className="font-medium mb-4 text-gray-700">
            BUKTI PEMBAYARAN YANG SAH
          </p>
          <p className="text-gray-600">• Terima Kasih •</p>
          <p className="text-gray-600 mt-1">Jangan Bosan untuk Kembali</p>
        </div>
      </div>
    );
  }
);

Receipt.displayName = "Receipt";

export default Receipt;
