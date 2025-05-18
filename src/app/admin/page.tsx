"use client";
import { Order, Product, Statistic } from "@/utils/interfaces";
import Cookies from "js-cookie";
import { DollarSign, PackageCheck, ShoppingCart } from "lucide-react";
import React from "react";
import Image from "next/image";
import useSWR from "swr";

const Page = () => {
  const token = Cookies.get("token");

  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data: dataInvoices } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/invoices`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: dataProducts } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: dataStatistic } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics?startDate=2025-01-01T15:36:10.191Z&endDate=2025-12-31T15:36:10.191Z`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const orders = dataInvoices?.data.invoices as Order[];
  const product = dataProducts?.data as Product[];
  const statistic = dataStatistic?.data.statistics as Statistic;

  const severalProducts = React.useMemo(() => {
    const severalProducts = product?.slice(0, 5);

    return severalProducts?.map((product) => ({
      ...product,
    }));
  }, [product]);

  const recentOrders = React.useMemo(() => {
    const recentOrders = orders?.slice(0, 5);

    return recentOrders?.map((order) => ({
      ...order,
    }));
  }, [orders]);

  const stats = React.useMemo(() => {
    const struct = [
      {
        uid: "total_orders",
        title: "Total Orders",
        icon: <ShoppingCart className="text-blue-500" />,
      },
      {
        uid: "products_in_stock",
        title: "Products in Stock",
        value: 86,
        icon: <PackageCheck className="text-yellow-500" />,
      },
      {
        uid: "total_revenue",
        title: "Total Revenue",
        icon: <DollarSign className="text-purple-500" />,
      },
    ];

    const totalOrders = orders?.length || 0;
    const productsInStock = product?.reduce(
      (acc: number, curr: Product) => acc + curr.stock,
      0
    );

    const totalRevenue = statistic?.total_amount || 0;

    return struct.map((stat) => {
      switch (stat.uid) {
        case "total_orders":
          return { ...stat, value: totalOrders };
        case "products_in_stock":
          return { ...stat, value: productsInStock };
        case "total_revenue":
          return { ...stat, value: `Rp ${totalRevenue.toLocaleString()}` };
        default:
          return stat;
      }
    });
  }, [orders?.length, product, statistic?.total_amount]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="bg-gray-100 rounded-full p-3">{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {stat.title}
              </h2>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="col-span-2">
        <div className="grid grid-cols-5 gap-x-4">
          <div className="col-span-3 text-gray-800">
            <div className="font-semibold text-xs ">Several Products</div>
            <div className="relative mt-4 bg-white w-full rounded-2xl">
              <div className="px-6 pt-10 pb-6 h-72">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {severalProducts?.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl p-4 flex items-center gap-4"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-full"
                        width={64}
                        height={64}
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {product.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* /activities */}
          {/* meetings */}
          <div className="col-span-2 text-gray-800">
            <div className="font-semibold text-xs">Recent Orders</div>
            <div className="mt-4 flex flex-col space-y-4 overflow-hidden h-72 overflow-y-auto no-scrollbar">
              {recentOrders?.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4"
                >
                  {/* status */}
                  <span
                    className={`w-2 h-2 rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Customer: {order.cart.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Total Transactions: Rp.{" "}
                      {order.total_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* /meetings */}
        </div>
      </section>
    </main>
  );
};

export default Page;
