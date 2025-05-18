"use client";

import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { useEffect, useState } from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to detect mobile screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial value
    checkScreenSize();
    
    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    
    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-screen-2xl mx-auto border-x-2 border-gray-100 min-h-screen">
      {/* Sidebar - hidden on mobile by default, can be toggled */}
      <div className={`
        ${sidebarOpen ? 'block' : 'hidden'} 
        ${isMobile ? 'fixed z-50 w-64 h-screen shadow-lg' : 'w-1/5'}
        lg:block bg-white
      `}>
        <Sidebar closeSidebar={() => isMobile && setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col bg-gray-100 transition-all ${sidebarOpen && !isMobile ? 'lg:w-4/5' : 'w-full'}`}>
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        {/* Main Section */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
