"use client";

import Header from "@/components/layout/Header";
import Cart from "@/components/pos/Cart";
import ProductCard from "@/components/pos/ProductCard";
import Receipt from "@/components/pos/Receipt";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { z } from "zod";
import { customerFormSchema } from "../utils/schema";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export default function POSPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  // const [checkoutId, setCheckoutId] = useState("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errorCustomerForm, setErrorCustomerForm] = useState<{
    [key: string]: string;
  }>({});
  const [receiptData, setReceiptData] = useState<{
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    date: Date;
    receiptNumber: string;
  } | null>(null);

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const products = data?.data;

  const receiptRef = useRef<HTMLDivElement>(null);

  // Filter products based on search term
  const filteredProducts = products?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (productId: string) => {
    const product = products?.find((p: Product) => p.id === productId);
    if (!product) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map((item) =>
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
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleBeforeCheckout = () => {
    setShowCustomerModal(true);
  };

  const handleCloseCustomerModal = () => {
    setShowCustomerModal(false);
  };

  const handleCustomerFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCheckout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      customerFormSchema.parse(customerForm);

      setIsCheckingOut(true);

      // Calculate totals
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax;

      // Generate receipt number
      const receiptNumber = `INV-${Date.now().toString().slice(-6)}`;

      handleCloseCustomerModal();

      // Simulate checkout process
      setTimeout(async () => {
        // Prepare receipt data
        setReceiptData({
          items: [...cartItems],
          subtotal,
          tax,
          total,
          date: new Date(),
          receiptNumber,
        });

        const addToCart = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: customerForm.name,
              email: customerForm.email,
              phone: customerForm.phone,
              items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              })),
              subtotal,
              tax,
              total,
              receiptNumber,
            }),
          }
        );

        if (!addToCart.ok) {
          throw new Error("Failed to add to cart");
        }

        const responseAddToCart = await addToCart.json();
        const checkout = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout/${responseAddToCart.data.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!checkout.ok) {
          throw new Error("Failed to checkout");
        }

        // const responseCheckout = await checkout.json();
        // setCheckoutId(responseCheckout.data.id);

        // Show receipt modal
        setShowReceipt(true);

        // Clear cart
        setCartItems([]);
        setIsCheckingOut(false);
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errObj: { [key: string]: string } = {};

        error.errors.forEach((err) => {
          errObj[err.path[0]] = err.message;
        });
        setErrorCustomerForm(errObj);
      }
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceiptData(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
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
            {filteredProducts?.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                onAddToCart={handleAddToCart}
              />
            ))}

            {filteredProducts?.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
                No products found matching &quot;{searchTerm}&quot;
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
            onCheckout={handleBeforeCheckout}
            isCheckingOut={isCheckingOut}
          />
        </div>
      </main>

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-bold">Customer Form</h2>
                <button
                  onClick={handleCloseCustomerModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4" ref={receiptRef}>
              <form className="space-y-4" onSubmit={handleCheckout}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 ps-2 py-3 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={customerForm.name}
                    onChange={handleCustomerFormChange}
                  />
                  {errorCustomerForm.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorCustomerForm.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="mt-1 ps-2 py-3 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={customerForm.email}
                    onChange={handleCustomerFormChange}
                  />
                  {errorCustomerForm.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorCustomerForm.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 ps-2 py-3 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={customerForm.phone}
                    onChange={handleCustomerFormChange}
                  />
                  {errorCustomerForm.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorCustomerForm.phone}
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseCustomerModal}
                    className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
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
                customerForm={customerForm}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
