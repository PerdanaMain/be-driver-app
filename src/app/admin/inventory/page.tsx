"use client";

import InventoryList from "@/components/admin/InventoryList";

const Page = () => {
  return (
    <main className="px-8 py-6">
      {/* attendance */}
      <div className="bg-white rounded-2xl w-full px-6 py-4 flex items-center text-gray-800 justify-between ">
        <div className="flex items-center ">
          <h1 className="text-lg font-semibold">Inventory</h1>
        </div>
      </div>
      <div className="bg-white rounded-2xl w-full px-6 py-4 flex items-center text-gray-800 justify-between mt-4">
        <InventoryList />
      </div>
    </main>
  );
};

export default Page;
