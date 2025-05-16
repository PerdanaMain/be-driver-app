"use client";
import React from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { Product } from "@/interfaces";
import ProductList from "@/components/admin/ProductList";

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
    isLoading: isLoadingProduct,
    mutate: mutateProduct,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/products`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const products = data?.data as Product[];

  return (
    <main className="py-6 px-6 sm:px-2 lg:px-5">
      {/* attendance */}
      <div className="bg-white rounded-2xl w-full px-6 py-4 text-gray-800">
        <h1 className="text-lg font-semibold">Products</h1>
      </div>

      <div className="bg-white rounded-2xl w-full text-gray-800 mt-4">
        <ProductList
          products={products || []}
          isLoading={isLoadingProduct}
          mutate={mutateProduct}
        />
      </div>
    </main>
  );
};

export default Page;
