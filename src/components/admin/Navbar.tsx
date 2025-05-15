"use client";

import React from "react";
import { Menu } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="px-4 sm:px-8 py-4 sm:py-6 bg-white flex flex-wrap items-center justify-between shadow-sm">
      <div className="flex items-center">
        {/* Menu toggle button for mobile */}
        <button 
          onClick={toggleSidebar} 
          className="mr-4 lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        
        <div>
          <span className="text-gray-600 text-sm sm:text-base">Hi</span>
          <span className="text-gray-800 font-bold ml-1 text-sm sm:text-base">Mazyar</span>
          <div className="text-indigo-500 text-xs mt-1 font-semibold">Team</div>
        </div>
      </div>
      
      <div className="flex items-center text-gray-500 space-x-4 sm:space-x-8 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
        <div className="relative items-center content-center flex w-full sm:w-auto">
          <input
            type="text"
            className="text-xs bg-gray-100 pl-4 pr-10 py-2 sm:py-3 rounded-md w-full sm:w-64 outline-none focus:ring-1"
            placeholder="Search for anything ..."
          />
          <span className="text-gray-400 absolute right-4 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4 sm:space-x-8">
          <a href="#" className="text-gray-500 hover:text-gray-700">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </a>
          <a href="#" className="relative h-5 w-5">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-2 w-2 fill-red-600 top-0.5 right-0.5 absolute stroke stroke-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;