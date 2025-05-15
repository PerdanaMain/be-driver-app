"use client";

import InventoryList from "@/components/admin/InventoryList";
import Cookies from "js-cookie";
import useSWR from "swr";

export interface Inventory {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const Page = () => {
  const token = Cookies.get("token");
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, isLoading:isLoadingInventory } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/inventory`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const inventory = data?.data as Inventory[];

  return (
    <main className="py-6 px-6 sm:px-2 lg:px-5">
      {/* attendance */}
      <div className="bg-white rounded-2xl w-full px-6 py-4 text-gray-800">
        <h1 className="text-lg font-semibold">Inventory</h1>
      </div>

      <div className="bg-white rounded-2xl w-full text-gray-800 mt-4">
        <InventoryList inventory={inventory || []} isLoading={isLoadingInventory} />
      </div>
    </main>
  );
};

export default Page;
