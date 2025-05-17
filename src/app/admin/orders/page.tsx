"use client";
import React from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { Order } from "@/utils/interfaces";
import OrderList from "@/components/admin/orders/OrderList";


const Page = () => {
  const token = Cookies.get("token");
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const {
    data,
    isLoading: isLoadingOrder,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const orders = data?.data.invoices as Order[];
  return (
    <main className="py-6 px-6 sm:px-2 lg:px-5">
      {/* attendance */}
      <div className="bg-white rounded-2xl w-full px-6 py-4 text-gray-800">
        <h1 className="text-lg font-semibold">Order History</h1>
      </div>

      <div className="bg-white rounded-2xl w-full text-gray-800 mt-4">
        <OrderList
          orders={orders || []}
          isLoading={isLoadingOrder}
        />
      </div>
    </main>
  );
};

export default Page;
