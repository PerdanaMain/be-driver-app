"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="col-span-1 h-screen px-7 py-8 bg-white border-r border-r-gray-100">
      <div className="font-bold text-lg pl-6 flex items-center space-x-3">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 fill-indigo-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        </span>
        <span className="text-black">Admin CMS</span>
      </div>
      {/* Items */}
      <div className="mt-12">
        <ul className="flex flex-col space-y-3 text-gray-500 text-sm sidebar-menu">
          <li>
            <Link
              href="/admin"
              className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${
                pathName === "/admin" ? "bg-indigo-50 text-indigo-600" : ""
              }`}
            >
              <span>
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
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/inventory"
              className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${
                pathName === "/admin/inventory"
                  ? "bg-indigo-50 text-indigo-600"
                  : ""
              }`}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </span>
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products"
              className={`flex space-x-3 items-center px-6 py-3 rounded-lg ${
                pathName === "/admin/products"
                  ? "bg-indigo-50 text-indigo-600"
                  : ""
              }`}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </span>
              <span>Products</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
